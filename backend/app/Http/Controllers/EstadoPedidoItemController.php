<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EstadoPedidoItem;
use Illuminate\Http\Request;

class EstadoPedidoItemController extends Controller
{
    public function index()
    {
        return response()->json(EstadoPedidoItem::orderBy('orden')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|unique:estado_pedido_items,nombre',
            'orden'  => 'required|integer|min:0',
        ]);

        $estado = EstadoPedidoItem::create($data);
        return response()->json($estado, 201);
    }

    public function show(EstadoPedidoItem $estadoPedidoItem)
    {
        return response()->json($estadoPedidoItem);
    }

    public function update(Request $request, EstadoPedidoItem $estadoPedidoItem)
    {
        $data = $request->validate([
            'nombre' => 'sometimes|string|unique:estado_pedido_items,nombre,'.$estadoPedidoItem->id,
            'orden'  => 'sometimes|integer|min:0',
        ]);

        $estadoPedidoItem->update($data);
        return response()->json($estadoPedidoItem);
    }

    public function destroy(EstadoPedidoItem $estadoPedidoItem)
    {
        if ($estadoPedidoItem->comandaItems()->exists()) {
            return response()->json(['error' => 'Estado en uso'], 400);
        }
        $estadoPedidoItem->delete();
        return response()->json(null, 204);
    }
}
