<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    // Obtener todos los productos
    $productos = Producto::all();

    // Devolver los productos como respuesta JSON
    return response()->json($productos);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'categoria_id' => 'required|exists:categorias,id',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'ingredientes' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'disponible'   => 'sometimes|boolean',
            'recomendada'   => 'sometimes|boolean', 
        ]);

        return Producto::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        return $producto;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        $validated = $request->validate([
            'categoria_id' => 'sometimes|exists:categorias,id',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'nombre' => 'sometimes|required|string|max:255',
            'descripcion' => 'sometimes|required|string',
            'ingredientes' => 'sometimes|required|string',
            'precio' => 'sometimes|required|numeric|min:0',
            'disponible'   => 'sometimes|boolean',
            'recomendada'   => 'sometimes|boolean', 
        ]);
        
        $producto->update($validated);

        return $producto;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        $producto->delete();
        return response()->json(['message' => 'Producto eliminado con éxito.'], 200);
    }
}
