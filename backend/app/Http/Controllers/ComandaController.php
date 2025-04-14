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



    public function getPedidosPorMesa($mesa_id)
    {
        try {
            $comanda = Comanda::whereHas('pedidos', function ($query) use ($mesa_id) {
                $query->where('mesa_id', $mesa_id);
            })->first();

            if (!$comanda) {
                return response()->json(['message' => 'No se encontró la comanda para esta mesa.'], 404);
            }

            // Obtenemos los pedidos de la comanda
            $pedidos = $comanda->pedidos;

            return response()->json($pedidos);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener los pedidos.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    public function cantidadProductoMesa($mesa_id, $producto_id)
    {
        try {

            $comanda = Comanda::whereHas('pedidos', function ($query) use ($mesa_id) {
                $query->where('mesa_id', $mesa_id);
            })->first();

            if (!$comanda) {
                return response()->json(['message' => 'No se ha encontrado comanda asociada a la mesa'], 400);
            }

            $cantidad = $comanda->pedidos()->where('producto_id', $producto_id)->count();

            return response()->json(['cantidada', $cantidad]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener la canitdad de productos',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}