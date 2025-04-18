<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function index()
    {
        return response()->json(Categoria::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|unique:categorias,nombre',
        ]);

        $categoria = Categoria::create($data);
        return response()->json($categoria, 201);
    }

    public function show(Categoria $categoria)
    {
        return response()->json($categoria->load('productos'));
    }

    public function update(Request $request, Categoria $categoria)
    {
        $data = $request->validate([
            'nombre' => 'sometimes|string|unique:categorias,nombre,'.$categoria->id,
        ]);

        $categoria->update($data);
        return response()->json($categoria);
    }

    public function destroy(Categoria $categoria)
    {
        $categoria->delete();
        return response()->json(null, 204);
    }
}
