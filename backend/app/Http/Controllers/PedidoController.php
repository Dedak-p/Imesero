<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Producto;
use App\Models\Comanda;
use Illuminate\Http\Request;

class PedidoController extends Controller
{



    public function store(Request $request)
    {

        $request->validate([

            'producto_id' => 'required|exists:productos,id',  //Validamos que el id del producto deba exsitir 
            'mesa_id' => 'required|integer' //Validamos que la mesa debe ser un entero

        ]);

        try {
            //Obtenemos el primer registro de la tabla comanda que coincida con el identificador del pedido pasado en la request donde el estado de esa comanda este activa
            $comanda = Comanda::where('mesa_id', $request->mesa_id)->where('estado', true)->first();

            //Si no existe la comanda asociada al pedido la careamos
            if (!$comanda) {
                $comanda = Comanda::create([
                    'mesa_id' => $request->mesa_id, //Associamos el id de la mesa pasado en la request a la columna mesa_id de la tabla comanda
                    //'estado' => true,  //Abrimos la comanda
                    'user_id' => auth()->id() //

                ]);

            }
            $pedido = new Pedido();
            $pedido->user_id = auth()->id(); //Añadimos en el campo de user_id la id del usuario
            $pedido->producto_id = $request->producto_id; //Añadimos en el campo de producto_id el id del producto
            $pedido->comanda_id = $comanda->id; //Añadimos en el campo de comanda_id la id de la comanda 
            $pedido->mesa_id = $request->mesa_id; //Añadimos la mesa asociada al pedido
            $pedido->save(); //Guardamos el pedido

            return response()->json([

                'mensaje' => 'Pedido creado correctamente',
                'pedido' => $pedido
            ], 201); //Created

        } catch (\Exception $e) {

            return response()->json([
                'mensaje' => 'Error al crear el pedido',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function show(){

        $pedidos = Pedido::all();

        return response()->json($pedidos);
    }

    public function delete(Pedido $pedido)
    {

        $pedido->delete();
        return response()->json(['message '=> 'Pedido eliminado con exito'], 200);
    }
}