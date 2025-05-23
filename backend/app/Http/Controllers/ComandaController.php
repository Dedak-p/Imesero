<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comanda;
use App\Models\EstadoComanda;
use App\Models\Mesa;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class ComandaController extends Controller
{
    /**
     * Listar todas las comandas (con relaciones y total).
     */
    public function index()
    {
        $comandas = Comanda::with([
            'mesa',
            'items.producto',
            'items.estado',
            'estadoComanda'
        ])->get();

        return response()->json($comandas);
    }


    //Función que obtiene las comandas de un usuario 
    public function comandasUsuario(Request $request)
{
    $user = $request->user(); // Usuario autenticado

    $comandas = Comanda::with([
        'mesa',
        'items.producto',
        'items.estado',
        'estadoComanda'
    ])->where('user_id', $user->id)->get();

    return response()->json($comandas);
}

    /**
     * Crear una nueva comanda en estado “borrador” y ocupar la mesa.
     */
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
        ]);

        // 1) Marcar mesa como ocupada
        Mesa::where('id', $data['mesa_id'])->update(['ocupada' => true]);

        // 2) Asignar estado “borrador”
        $borrador = EstadoComanda::where('nombre', 'borrador')->value('id');
        $data['estado_comanda_id'] = $borrador;

        // 3) Crear la comanda
        $comanda = Comanda::create($data);

        // 4) Devolver con todas las relaciones cargadas
        return response()->json(
            $comanda->load(['mesa','items.producto','items.estado','estadoComanda']),
            201
        );
    }

    /**
     * Mostrar una comanda específica (con relaciones y total).
     */
    public function show(Comanda $comanda)
    {
        return response()->json(
            $comanda->load(['mesa','items.producto','items.estado','estadoComanda'])
        );
    }

    /**
     * Admin: confirma la comanda.
     * Pasa de estado “pedido” → “confirmada”.
     */
    public function confirm(Comanda $comanda)
    {
        // Sólo desde “pedido” se puede confirmar
        if ($comanda->estado_comanda_id !== 2) {
            return response()->json([
                'message' => 'Sólo se puede confirmar una comanda en estado “pedido”.'
            ], 422);
        }

        $comanda->update(['estado_comanda_id' => 3]);

        return response()->json($comanda->load(['mesa','items.producto','estadoComanda']));
    }

    public function cerrar(Comanda $comanda)
    {
        // Sólo si está “lista” (3) se puede cerrar
        if ($comanda->estado_comanda_id !== 4) {
            return response()->json([
                'message' => 'Sólo se puede cerrar una comanda en estado “lista para entregar”.'
            ], 422);
        }

        DB::transaction(function() use ($comanda) {
            $comanda->update(['cerrada' => true]);
            $comanda->mesa->update(['ocupada' => false]);
        });

        return response()->json($comanda->load(['mesa','estadoComanda']));
    }

    /**
     * Admin: actualizar manualmente cualquier estado de comanda
     * (por ejemplo, a “pagada”), y liberar mesa si corresponde.
     */
    public function update(Request $request, Comanda $comanda)
    {
        $data = $request->validate([
            'estado_comanda_id' => [
                'sometimes','integer',
                Rule::exists('estado_comandas','id')
            ],
        ]);

        $comanda->update($data);

        return response()->json(
            $comanda->load(['mesa','items.producto','estadoComanda'])
        );
    }

    /**
     * Admin: eliminar una comanda y liberar la mesa.
     */
    public function destroy(Comanda $comanda)
    {
        $comanda->mesa()->update(['ocupada' => false]);
        $comanda->delete();

        return response()->json(null, 204);
    }
}
