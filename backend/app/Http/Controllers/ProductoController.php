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
            'imagen' => 'nullable|string',
            'nombre_es' => 'required|string|max:255',
            'nombre_ca' => 'required|string|max:255',
            'nombre_en' => 'required|string|max:255',
            'descripcion_es' => 'required|string',
            'descripcion_ca' => 'required|string',
            'descripcion_en' => 'required|string',
            'ingredientes_es' => 'nullable|string',
            'ingredientes_ca' => 'nullable|string',
            'ingredientes_en' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'disponible'   => 'sometimes|boolean',
            'recomendada'  => 'sometimes|boolean', 
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
            'nombre_es' => 'sometimes|required|string|max:255',
            'nombre_ca' => 'sometimes|required|string|max:255',
            'nombre_en' => 'sometimes|required|string|max:255',
            'descripcion_es' => 'sometimes|required|string',
            'descripcion_ca' => 'sometimes|required|string',
            'descripcion_en' => 'sometimes|required|string',
            'ingredientes_es' => 'nullable|string',
            'ingredientes_ca' => 'nullable|string',
            'ingredientes_en' => 'nullable|string',
            'precio' => 'sometimes|required|numeric|min:0',
            'disponible'   => 'sometimes|boolean',
            'recomendada'  => 'sometimes|boolean', 
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
/**
 * Sube un archivo de imagen al directorio storage/app/public/Imagenes/menu
 * y devuelve la ruta pública.
 */
public function uploadImagen(Request $request)
{
    // Validar que venga un archivo de imagen
    $request->validate([
        'imagen' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Guardar la imagen en storage/app/public/Imagenes/menu
    $path = $request->file('imagen')
                    ->store('Imagenes/menu', 'public');

    // Construir la ruta pública accesible vía /storage/...
    $publicPath = "/storage/{$path}";

    return response()->json([
        'ruta' => $publicPath
    ], 201);
}

}
