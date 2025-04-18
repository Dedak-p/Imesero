<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Mesa;
use Illuminate\Http\Request;

class MesaController extends Controller
{
    public function index()
    {
        return response()->json(Mesa::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'codigo'    => 'required|string|unique:mesas,codigo',
            'capacidad' => 'required|integer|min:1',
            'ocupada'   => 'sometimes|boolean',
        ]);

        $mesa = Mesa::create($data);
        return response()->json($mesa, 201);
    }

    public function show(Mesa $mesa)
    {
        return response()->json($mesa->load('comandas'));
    }

    public function update(Request $request, Mesa $mesa)
    {
        $data = $request->validate([
            'codigo'    => 'sometimes|string|unique:mesas,codigo,'.$mesa->id,
            'capacidad' => 'sometimes|integer|min:1',
            'ocupada'   => 'sometimes|boolean',
        ]);

        $mesa->update($data);
        return response()->json($mesa);
    }

    public function destroy(Mesa $mesa)
    {
        $mesa->delete();
        return response()->json(null, 204);
    }
}
