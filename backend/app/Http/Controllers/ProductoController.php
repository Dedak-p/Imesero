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
            'imagen' => 'nullable|string',
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
 * Sube un archivo de imagen al directorio storage/app/public/Imagenes/Menu
 * y devuelve la ruta pública.
 */
public function uploadImagen(Request $request)
{
    // Validación de la imagen con captura de posibles errores
    try {
        $request->validate([
            'imagen' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'error' => 'Validación fallida',
            'detalles' => $e->errors()
        ], 422);
    }

    // Verifica si la imagen está presente
    if (!$request->hasFile('imagen')) {
        return response()->json([
            'error' => 'No se ha detectado ningún archivo de imagen en la solicitud'
        ], 400);
    }

    // Verifica si el archivo es válido
    if (!$request->file('imagen')->isValid()) {
        return response()->json([
            'error' => 'El archivo de imagen subido no es válido o está corrupto'
        ], 400);
    }

    try {
        // Intenta guardar la imagen en la ruta especificada
        $ruta = $request->file('imagen')->store('Imagenes/Menu', 'public');

        // Comprueba si la ruta se ha generado correctamente
        if (!$ruta) {
            return response()->json([
                'error' => 'Error desconocido al almacenar la imagen'
            ], 500);
        }

        // Éxito: devolver la ruta
        return response()->json([
            'mensaje' => 'Imagen subida correctamente',
            'ruta' => $ruta
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Excepción al guardar la imagen',
            'mensajeExcepcion' => $e->getMessage()
        ], 500);
    }
}

}
