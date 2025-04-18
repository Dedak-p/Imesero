<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ComandaItem;
use Illuminate\Http\Request;

class ComandaItemController extends Controller
{
    public function index()
    {
        return response()->json(
            ComandaItem::with(['comanda','producto','estado'])->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'comanda_id'     => 'required|exists:comandas,id',
            'producto_id'    => 'required|exists:productos,id',
            'cantidad'       => 'required|integer|min:1',
            'precio_unitario'=> 'required|numeric|min:0',
            'estado_item_id' => 'required|exists:estado_pedido_items,id',
        ]);

        $item = ComandaItem::create($data);
        return response()->json($item->load(['producto','estado']), 201);
    }

    public function show(ComandaItem $comandaItem)
    {
        return response()->json($comandaItem->load(['producto','estado']));
    }

    public function update(Request $request, ComandaItem $comandaItem)
    {
        $data = $request->validate([
            'cantidad'       => 'sometimes|integer|min:1',
            'precio_unitario'=> 'sometimes|numeric|min:0',
            'estado_item_id' => 'sometimes|exists:estado_pedido_items,id',
        ]);

        $comandaItem->update($data);
        return response()->json($comandaItem->load(['producto','estado']));
    }

    public function destroy(ComandaItem $comandaItem)
    {
        $comandaItem->delete();
        return response()->json(null, 204);
    }
}
