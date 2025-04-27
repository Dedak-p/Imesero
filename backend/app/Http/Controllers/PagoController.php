<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pago;
use App\Models\MetodoPago;
use App\Models\Comanda;
use Illuminate\Http\Request;

class PagoController extends Controller
{
    public function index()
    {
        return response()->json(
            Pago::with(['metodo','comanda'])->get()
        );
    }

    public function store(  $request)
    {
        $data = $request->validate([
            'metodo_pago_id' => 'required|exists:metodos_pago,id',
            'comanda_id'     => 'required|exists:comandas,id',
            'monto'          => 'required|numeric|min:0',
            'referencia'     => 'nullable|string',
        ]);

        // Opcional: podrías chequear que el monto no exceda el total de la comanda
        $pago = Pago::create($data);
        return response()->json($pago->load(['metodo','comanda']), 201);
    }

    public function show(Pago $pago)
    {
        return response()->json($pago->load(['metodo','comanda']));
    }

    public function update(Request $request, Pago $pago)
    {
        $data = $request->validate([
            'metodo_pago_id' => 'sometimes|exists:metodos_pago,id',
            'comanda_id'     => 'sometimes|exists:comandas,id',
            'monto'          => 'sometimes|numeric|min:0',
            'referencia'     => 'nullable|string',
        ]);

        $pago->update($data);
        return response()->json($pago->load(['metodo','comanda']));
    }

    public function destroy(Pago $pago)
    {
        $pago->delete();
        return response()->json(null, 204);
    }
}
