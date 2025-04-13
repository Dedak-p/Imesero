<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Producto;
use App\Models\Comanda;
use Illuminate\Http\Request;

class PedidoController extends Controller
{


    public function storeWithAuth(Request $request)
    {
        $request->validate([

            'producto_id' => 'required|exists:productos,id',  //Validamos que el id del producto deba exsitir 
            'mesa_id' => 'required|integer' //Validamos que la mesa debe ser un entero

        ]);

        try { 


            //Verificamos que exista un pedido con el mismo id de mesa que tenga una comanda con estado true
            $pedidoExistente = Pedido::where('mesa_id', $request->mesa_id)
            ->whereHas('comanda', function($query) {
                $query->where('estado', true);
            })
            ->first();           
            
            //Si el pedido existe associamos la comanda existente a pedidos.comanda_id
            if($pedidoExistente){
                $comanda = $pedidoExistente->comanda;
            }else{
                //Si no existe creamos una nueva comanda , con el estado true por defecto y con su identificador serial
                $comanda = Comanda::create();
            }
            //Creamos el nuevo Pedido a añadir
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
    public function store(Request $request)
    {

        $request->validate([

            'producto_id' => 'required|exists:productos,id',  //Validamos que el id del producto deba exsitir 
            'mesa_id' => 'required|integer' //Validamos que la mesa debe ser un entero

        ]);

        try {
            $pedidoExistente = Pedido::where('mesa_id', $request->mesa_id)
            ->whereHas('comanda', function($query) {
                $query->where('estado', true);
            })
            ->first();           

            if($pedidoExistente){

                $comanda = $pedidoExistente->comanda;
            }else{
                $comanda = Comanda::create();
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


    public function show()
    {

        $pedidos = Pedido::all();

        return response()->json($pedidos);
    }

    public function showPedido(Pedido $pedido){
        return $pedido;
    }

    public function delete(Pedido $pedido)
    {

        $pedido->delete();
        return response()->json(['message ' => 'Pedido eliminado con exito'], 200);
    }
}