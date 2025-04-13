<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Producto;
use App\Models\Comanda;
use Illuminate\Http\Request;

class ComandaController extends Controller
{
    public function index()
    {
        $comandas = Comanda::all();
        return response()->json($comandas);
    }

    public function cerrar($id)
    {
        try {
            $comanda = Comanda::findOrFail($id);

            $pedidosEntregados = $comanda->pedidos()->where('estado', '!=', 'entregado')->count() === 0;

            if (!$pedidosEntregados) {
                return response()->json([
                    'message' => 'No se ha podido cerrar la comanda porque aún quedan pedidos por entregar'
                ], 400);
            }

            $comanda->estado = false;
            $comanda->save();

            return response()->json([
                'message' => 'Comanda cerrada correctamente'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al cerrar la comanda',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Comanda $comanda)
    {
        $comanda->delete();

        return response()->json([
            'message' => 'Comanda eliminada con éxito'
        ], 200);
    }
}
