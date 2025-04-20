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

        $estadoItemBorrador = EstadoPedidoItem::where('nombre', 'por confirmar')->value('id') ?? 1;
        // ID estado 'borrador'
        $borradorId = EstadoComanda::where('nombre','borrador')->value('id') ?? 1;
    
        // Recuperar o crear la comanda en borrador
        $comanda = Comanda::firstOrCreate([
            'mesa_id' => $mesa->id,
            'user_id' => auth()->id(),
            'anonimo' => auth()->guest(),
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
    public function confirm(Comanda $comandaId)
    {
        $inicialId = EstadoPedidoItem::where('nombre', 'por confirmar')->value('id') ?? 1; // Estado inicial
        $confirmId = EstadoPedidoItem::where('nombre', 'confirmado')->value('id') ?? 2; // Estado confirmado
        $borradorCom = EstadoComanda::where('nombre', 'borrador')->value('id') ?? 1; // Estado borrador
        $pedidoCom = EstadoComanda::where('nombre', 'pedido')->value('id') ?? 2;
        $comanda = Comanda::findOrFail($comandaId->id);

        // Filtrar los ítems que están en el estado inicial
        $itemsToConfirm = $comanda->items()->where('estado_item_id', 1)->get();

        if ($itemsToConfirm->isEmpty()) {
            return response()->json([
                'message' => 'No hay ítems para confirmar.'
            ], 422);
        }

        // Actualizar el estado de los ítems
        foreach ($itemsToConfirm as $item) {
            $item->update(['estado_item_id' => $confirmId]);
        }

        // Si la comanda sigue en borrador, la paso a pedido
        if ($comanda->estado_comanda_id === $borradorCom) {
            $comanda->update(['estado_comanda_id' => $pedidoCom]);
        }

        return response()->json(
            $comanda->items()->with(['producto', 'estado'])->get()
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
