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
            $comanda = Comanda::findOrFail($validatedData['comanda_id']);
            $producto = Producto::findOrFail($validatedData['producto_id']);
    
            // Revisar si ya existe el producto en la comanda
            $existing = $comanda->productos()->where('producto_id', $producto->id)->first();
    
            if ($existing) {
                // Ya existe → actualizar la cantidad en la tabla pivote
                $currentCantidad = $existing->pivot->cantidad;
                $newCantidad = $currentCantidad + $validatedData['cantidad'];
    
                $comanda->productos()->updateExistingPivot($producto->id, [
                    'cantidad' => $newCantidad,
                    'updated_at' => now(),
                ]);
            } else {
                // No existe → crear nuevo registro
                $comanda->productos()->attach($producto->id, [
                    'cantidad' => $validatedData['cantidad'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
    
            // Actualizar el total de la comanda
            $comanda->total += $producto->precio * $validatedData['cantidad'];
            $comanda->save();
    
            return response()->json(['message' => 'Producto agregado/actualizado en la comanda exitosamente.'], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'No se pudo agregar el producto a la comanda',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get products of a specific comanda.
     */
    public function getProductosComanda(Comanda $comanda) {
        try {
            // Obtener los productos de la comanda
            $productos = $comanda->productos()->withPivot('cantidad')->get();

            return response()->json($productos, 200);
        } catch (\Exception $e) {
            // Manejar errores y retornar un mensaje de error
            return response()->json([
                'error' => 'No se pudieron obtener los productos de la comanda',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}