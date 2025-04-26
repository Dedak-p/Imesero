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
                ->with(['producto', 'estadoPedidoItem'])
                ->get()
        );
    }

    /**
     * 2) Ver detalle de un único ítem.
     */
    public function show(ComandaItem $item)
    {
        return response()->json(
            $item->load(['producto', 'estadoPedidoItem', 'comanda'])
        );
    }

    /**
     * 3) Añade o actualiza un ítem en la comanda “borrador” de la mesa sin autenticar.
     */
    public function store(Request $request, Mesa $mesa)
    {
        $data = $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'cantidad' => 'nullable|integer|in:1,-1',
        ]);

        // Asignar cantidad por defecto si no se envía
        $data['cantidad'] = $data['cantidad'] ?? 1;

        // Buscar una comanda activa para la misma mesa, usuario y anonimato.
        // Si ya existe una comanda en borrador o pedida, se la reutiliza.
        $comanda = Comanda::where('mesa_id', $mesa->id)
            ->where('user_id', auth()->id())
            ->where('anonimo', auth()->guest())
            ->whereIn('estado_comanda_id', [1, 2, 3])
            ->latest()
            ->first();

        // Si no se encuentra ninguna, se crea una nueva comanda en estado borrador
        if (!$comanda) {
            $comanda = Comanda::create([
                'mesa_id' => $mesa->id,
                'user_id' => auth()->id(),
                'anonimo' => auth()->guest(),
                'estado_comanda_id' => 1,
            ]);
            $mesa->update(['ocupada' => true]);
        }

        $producto = Producto::findOrFail($data['producto_id']);

        // Buscar un item existente con el mismo producto y que esté en estado borrador
        $existingDraftItem = $comanda->items()
            ->where('producto_id', $producto->id)
            ->where('estado_item_id', 1)
            ->first();

        if ($existingDraftItem) {
            // Incrementar la cantidad en el item borrador existente
            $existingDraftItem->increment('cantidad', $data['cantidad']);

            // Si la cantidad llega a 0 o es negativa, se elimina el ítem
            if ($existingDraftItem->cantidad <= 0) {
                $existingDraftItem->delete();
                return response()->json(null, 204);
            }

            return response()->json($existingDraftItem->fresh()->load('producto'), 200);
        }

        // Si no existe, se crea un nuevo ítem con estado borrador
        $item = $comanda->items()->create([
            'producto_id' => $producto->id,
            'cantidad' => $data['cantidad'],
            'precio_unitario' => $producto->precio,
            'estado_item_id' => 1,
        ]);

        if ($item->cantidad <= 0) {
            $item->delete();
            return response()->json(null, 204);
        }

        return response()->json($item->load('producto'), 201);
    }

    public function storeAuth(Request $request, Mesa $mesa)
    {
        $data = $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'cantidad' => 'nullable|integer|in:1,-1',
        ]);

        // Asignar cantidad por defecto si no se envía
        $data['cantidad'] = $data['cantidad'] ?? 1;

        // Buscar una comanda activa para la misma mesa, usuario y anonimato.
        // Si ya existe una comanda en borrador o pedida, se la reutiliza.
        $comanda = Comanda::where('mesa_id', $mesa->id)
            ->where('user_id', auth()->id())
            ->where('anonimo', auth()->guest())
            ->whereIn('estado_comanda_id', [1, 2, 3])
            ->latest()
            ->first();

        // Si no se encuentra ninguna, se crea una nueva comanda en estado borrador
        if (!$comanda) {
            $comanda = Comanda::create([
                'mesa_id' => $mesa->id,
                'user_id' => auth()->id(),
                'anonimo' => auth()->guest(),
                'estado_comanda_id' => 1,
            ]);
            $mesa->update(['ocupada' => true]);
        }

        $producto = Producto::findOrFail($data['producto_id']);

        // Buscar un item existente con el mismo producto y que esté en estado borrador
        $existingDraftItem = $comanda->items()
            ->where('producto_id', $producto->id)
            ->where('estado_item_id', 1)
            ->first();

        if ($existingDraftItem) {
            // Incrementar la cantidad en el item borrador existente
            $existingDraftItem->increment('cantidad', $data['cantidad']);

            // Si la cantidad llega a 0 o es negativa, se elimina el ítem
            if ($existingDraftItem->cantidad <= 0) {
                $existingDraftItem->delete();
                return response()->json(null, 204);
            }

            return response()->json($existingDraftItem->fresh()->load('producto'), 200);
        }

        // Si no existe, se crea un nuevo ítem con estado borrador
        $item = $comanda->items()->create([
            'producto_id' => $producto->id,
            'cantidad' => $data['cantidad'],
            'precio_unitario' => $producto->precio,
            'estado_item_id' => 1,
        ]);

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
    public function confirm(Mesa $mesa)
    {
        $comanda = Comanda::where('mesa_id', $mesa->id)->latest()->first();

        if (!$comanda) {
            return response()->json([
                'message' => 'No hay comanda en esa mesa por confirmar.'
            ], 422);
        }

        // Filtrar los ítems que están en el estado inicial
        $itemsToConfirm = $comanda->items()->where('estado_item_id', 1)->get();

        if ($itemsToConfirm->isEmpty()) {
            return response()->json([
                'message' => 'No hay ítems para confirmar.'
            ], 422);
        }

        // Actualizar el estado de los ítems a "confirmado"
        foreach ($itemsToConfirm as $item) {
            $item->update(['estado_item_id' => 2]);
        }

        // Si la comanda sigue en borrador, la paso a pedido
        if ($comanda->estado_comanda_id === 1) {
            $comanda->update(['estado_comanda_id' => 2]);
        }

        // Obtener todos los items actualizados
        $items = $comanda->items()->with(['producto', 'estadoPedidoItem'])->get();

        // Agrupar ítems con el mismo producto
        $groupedItems = $items->groupBy('producto_id');

        foreach ($groupedItems as $productoId => $groupItems) {
            // Seleccionar el primer registro del grupo como el principal
            $mainItem = $groupItems->first();
            ;
            $totalCantidad = $groupItems->sum('cantidad');

            // Actualiza el registro principal con la cantidad total
            if ($mainItem->cantidad != $totalCantidad) {
                $mainItem->update(['cantidad' => $totalCantidad]);
            }

            // Elimina los registros duplicados (los demás en el grupo)
            $duplicates = $groupItems->slice(1);
            foreach ($duplicates as $duplicateItem) {
                $duplicateItem->delete();
            }
        }

        // Obtener los ítems actualizados tras la fusión
        $updatedItems = $comanda->items()->with(['producto', 'estadoPedidoItem'])->get();

        return response()->json($updatedItems);
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

        return response()->json($item);
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
