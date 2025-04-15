<?php

namespace App\Http\Controllers;

use App\Models\Comanda;
use Illuminate\Http\Request;
use App\Models\Producto;

class ComandaController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        // Validar los datos entrantes
        $validatedData = $request->validate([
            'user_id' => 'nullable|integer|exists:users,id', // user_id es opcional
            'mesa' => 'required|integer',
            'estado' => 'required|string',
            'forma_pago' => 'required|string',
        ]);

        try {
            // Crear una nueva comanda
            $comanda = new Comanda();
            $comanda->user_id = $validatedData['user_id'];
            $comanda->mesa = $validatedData['mesa'];
            $comanda->estado = $validatedData['estado'];
            $comanda->fecha = now();
            $comanda->total = 0; // Inicialmente 0, se actualizará después
            $comanda->forma_pago = $validatedData['forma_pago'];
            $comanda->save();

            // Retornar la comanda creada con un código de estado 201
            return response()->json($comanda, 201);
        } catch (\Exception $e) {
            // Manejar errores y retornar un mensaje de error
            return response()->json([
                'error' => 'No se pudo crear la comanda',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Comanda $comanda) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comanda $comanda) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comanda $comanda) {
        //
    }


    /**
     * Add products to the comanda.
     */
    public function addProducto(Request $request) {
        // Validar los datos entrantes
        $validatedData = $request->validate([
            'comanda_id' => 'required|integer|exists:comandas,id',
            'producto_id' => 'required|integer|exists:productos,id',
            'cantidad' => 'required|integer|min:1',
        ]);

        try {
            // Obtener la comanda
            $comanda = Comanda::findOrFail($validatedData['comanda_id']);

            // Agregar el producto a la tabla intermedia usando attach
            $comanda->productos()->attach($validatedData['producto_id'], [
                'cantidad' => $validatedData['cantidad'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Actualizar el total de la comanda
            $producto = Producto::findOrFail($validatedData['producto_id']);
            $comanda->total += $producto->precio * $validatedData['cantidad'];
            $comanda->save();

            return response()->json(['message' => 'Producto agregado a la comanda exitosamente.'], 201);
        } catch (\Exception $e) {
            // Manejar errores y retornar un mensaje de error
            return response()->json([
                'error' => 'No se pudo agregar el producto a la comanda',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
