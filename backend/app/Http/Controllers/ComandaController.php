<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comanda;
use App\Models\Mesa;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ComandaController extends Controller
{
    public function index()
    {
        return response()->json(
            Comanda::with(['mesa','items.producto','items.estado'])->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'mesa_id' => [
                'required','exists:mesas,id',
                function($attr, $value, $fail) {
                    if (Mesa::find($value)->ocupada) {
                        $fail('La mesa está ocupada.');
                    }
                }
            ],
            'user_id' => 'nullable|exists:users,id',
            'anonimo' => 'sometimes|boolean',
            'estado'  => ['sometimes', Rule::in(['borrador','abierta','cerrada','pagada'])],
        ]);

        // Marcar mesa como ocupada
        Mesa::where('id', $data['mesa_id'])->update(['ocupada' => true]);

        $comanda = Comanda::create($data);
        return response()->json($comanda->load('mesa'), 201);
    }

    public function show(Comanda $comanda)
    {
        return response()->json(
            $comanda->load(['mesa','items.producto','items.estado'])
        );
    }

    public function update(Request $request, Comanda $comanda)
    {
        $data = $request->validate([
            'estado' => ['sometimes', Rule::in(['borrador','abierta','cerrada','pagada'])],
        ]);

        $old = $comanda->estado;
        $comanda->update($data);

        // Si se cierra o paga, liberar mesa
        if (
            in_array($data['estado'], ['cerrada','pagada']) &&
            ! in_array($old, ['cerrada','pagada'])
        ) {
            $comanda->mesa()->update(['ocupada' => false]);
        }

        return response()->json($comanda);
    }

    public function destroy(Comanda $comanda)
    {
        // Liberar mesa
        $comanda->mesa()->update(['ocupada' => false]);
        $comanda->delete();
        return response()->json(null, 204);
    }
}