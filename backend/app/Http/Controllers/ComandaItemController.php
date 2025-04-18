<?php

namespace App\Http\Controllers;

use App\Models\Comanda;
use App\Models\ComandaItem;
use App\Models\EstadoComanda;
use App\Models\EstadoPedidoItem;
use App\Models\Producto;
use App\Models\Mesa;
use Illuminate\Http\Request;

class ComandaItemController extends Controller
{
    /**
     * 1) Listar todos los ítems de una comanda.
     */
    public function index(Comanda $comanda)
    {
        return response()->json(
            $comanda
                ->items()
                ->with(['producto','estado'])
                ->get()
        );
    }

    /**
     * 2) Ver detalle de un único ítem.
     */
    public function show(ComandaItem $item)
    {
        return response()->json(
            $item->load(['producto','estado','comanda'])
        );
    }

    /**
     * 3) Añade o actualiza un ítem en la comanda “borrador” de la mesa.
     */
    public function store(Request $request, Mesa $mesa)
    {
        $data = $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'cantidad'    => 'nullable|integer|in:1,-1',
        ]);
    
        $data['cantidad'] = $data['cantidad'] ?? 1;

        $estadoItemBorrador = EstadoPedidoItem::where('nombre', 'por confirmar')->value('id');
        // ID estado 'borrador'
        $borradorId = EstadoComanda::where('nombre','borrador')->value('id');
    
        // Recuperar o crear la comanda en borrador
        $comanda = Comanda::firstOrCreate([
            'mesa_id' => $mesa->id,
            'user_id' => auth()->id(),
            'anonimo' => auth()->guest(),
        ], [
            'estado_comanda_id' => $borradorId,
        ]);
    
        if ($comanda->wasRecentlyCreated) {
            $mesa->update(['ocupada' => true]);
        }
    
        $producto = Producto::findOrFail($data['producto_id']);
    
        // Sumar la cantidad si ya existe
        $existingItem = $comanda
            ->items()
            ->where('producto_id', $producto->id)
            ->first();
    
        if ($existingItem) {
            $existingItem->increment('cantidad', $data['cantidad']);
            
            // Eliminar el ítem si la cantidad es 0 o negativa
            if ($existingItem->cantidad <= 0) {
                $existingItem->delete();
                return response()->json(null, 204);
            }

            return response()->json($existingItem->fresh()->load('producto'), 200);
        }
        
        // Si no existe, lo creo incluyendo el estado inicial
        $item = $comanda->items()->create([
            'producto_id'     => $producto->id,
            'cantidad'        => $data['cantidad'],
            'precio_unitario' => $producto->precio,
            'estado_item_id'  => $estadoItemBorrador,  // ← aquí
        ]);
        
        // Eliminar el ítem si la cantidad es 0 o negativa
        if ($item->cantidad <= 0) {
            $item->delete();
            return response()->json(null, 204);
        }
        
        return response()->json($item->load('producto'), 201);
    }

    /**
     * 4) Cliente confirma SU ítem:
     *    por confirmar → confirmado
     */
    public function confirm(ComandaItem $item)
    {
        $inicialId   = EstadoPedidoItem::orderBy('orden')->value('id');
        $confirmId   = EstadoPedidoItem::where('nombre','confirmado')->value('id');
        $borradorCom = EstadoComanda::where('nombre','borrador')->value('id');
        $pedidoCom   = EstadoComanda::where('nombre','pedido')->value('id');

        // Solo si está en el estado inicial
        if ($item->estado_item_id !== $inicialId) {
            return response()->json([
                'message' => 'Este ítem no puede confirmarse.'
            ], 422);
        }

        // Actualizo ítem
        $item->update(['estado_item_id' => $confirmId]);

        // Si la comanda sigue en borrador, la paso a pedido
        if ($item->comanda->estado_comanda_id === $borradorCom) {
            $item->comanda->update(['estado_comanda_id' => $pedidoCom]);
        }

        return response()->json(
            $item->load('producto','estado')
        );
    }

    /**
     * 5) Admin avanza el estado de un ítem:
     *    cocina → camino → entregado…
     */
    public function update(Request $request, ComandaItem $comandaItem)
    {
        $data = $request->validate([
            'estado_item_id' => 'required|exists:estado_pedido_items,id',
        ]);

        $comandaItem->update($data);

        $item = $comandaItem->fresh(['producto', 'estado']);

        return response()->json($comandaItem);
    }

    /**
     * 6) Admin elimina un ítem de la comanda.
     */
    public function destroy(ComandaItem $item)
    {
        $item->delete();
        return response()->json(null, 204);
    }
}
