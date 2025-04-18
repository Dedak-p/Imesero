<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MetodoPago;
use Illuminate\Http\Request;

class MetodoPagoController extends Controller
{
    public function index()
    {
        return response()->json(MetodoPago::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|unique:metodos_pago,nombre',
        ]);

        $metodo = MetodoPago::create($data);
        return response()->json($metodo, 201);
    }

    public function show(MetodoPago $metodoPago)
    {
        return response()->json($metodoPago);
    }

    public function update(Request $request, MetodoPago $metodoPago)
    {
        $data = $request->validate([
            'nombre' => 'required|string|unique:metodos_pago,nombre,' . $metodoPago->id,
        ]);

        $metodoPago->update($data);
        return response()->json($metodoPago);
    }

    public function destroy(MetodoPago $metodoPago)
    {
        // Evitar borrado si tiene pagos asociados
        if ($metodoPago->pagos()->exists()) {
            return response()->json(['error' => 'No se puede eliminar, tiene pagos asociados.'], 400);
        }
        $metodoPago->delete();
        return response()->json(null, 204);
    }
}
