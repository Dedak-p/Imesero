<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ComandaItem;
use App\Models\Pago;
use \Illuminate\Support\Str;
use App\Models\Comanda;
use App\Models\Mesa;
use Illuminate\Http\Request;

class PagoController extends Controller
{
    public function index()
    {
        return response()->json(
            Pago::with(['metodo','comanda'])->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'metodo_pago_id'  => 'required|exists:metodos_pago,id',
            // Método 1: Pago completo de la comanda
            'mesa_id'         => 'sometimes|required_if:metodo_pago_id,1|exists:mesas,id',
            // Método 2: Pago parcial de un ComandaItem
            'comandaItem_id'  => 'sometimes|required_if:metodo_pago_id,2|exists:comanda_items,id',
            'cantidad'        => 'sometimes|required_if:metodo_pago_id,2|numeric|min:1',
        ]);
    
        // Pago completo de toda la comanda (método 1)
        if ($data['metodo_pago_id'] == 1) {
            // Buscar comanda en estado 3 para la mesa indicada
            $comanda = Comanda::where('mesa_id', $data['mesa_id'])
                ->where('estado_comanda_id', 3)
                ->first();
    
            if (!$comanda) {
                return response()->json(['error' => 'No hay comanda abierta en esa mesa'], 422);
            }
    
            // Ítems pendientes de pago
            $items = $comanda->items()
                ->where('pagada', false)
                ->whereIn('estado_pedido_item', [2,3,4])
                ->get();
            if ($items->isEmpty()) {
                return response()->json(['error' => 'Todos los ítems ya han sido pagados'], 422);
            }
    
            // Total de la comanda
            $total = $items->sum(fn($i) => $i->cantidad * $i->precio_unitario);
    
            // Generar referencia única
            do {
                $ref = Str::random(10);
            } while (Pago::where('referencia', $ref)->exists());
    
            \DB::beginTransaction();
            try {
                // Marcar todos los ítems como pagados
                foreach ($items as $item) {
                    $item->pagada = true;
                    $item->save();
                }
    
                // Crear pago por el total
                $pago = Pago::create([
                    'metodo_pago_id' => $data['metodo_pago_id'],
                    'comanda_id'     => $comanda->id,
                    'monto'          => $total,
                    'referencia'     => $ref,
                ]);
    
                // Si no quedan ítems pendientes, cerrar la comanda
                if ($comanda->items()->where('pagada', false)->count() === 0) {
                    $comanda->estado_comanda_id = 4; // estado "cerrado" o el que uses
                    $comanda->save();
                }
    
                \DB::commit();
                return response()->json($pago->load(['metodo','comanda']), 201);
    
            } catch (\Exception $e) {
                \DB::rollBack();
                return response()->json([
                    'error'   => 'Error al procesar el pago completo',
                    'message' => $e->getMessage()
                ], 500);
            }
        }
    
        // Pago parcial de un ComandaItem concreto (otros métodos)
        $item = ComandaItem::findOrFail($data['comandaItem_id']);
    
        if ($item->pagada) {
            return response()->json(['error' => 'Este ComandaItem ya ha sido pagado'], 422);
        }
        if (!$item->comanda || $item->comanda->estado_comanda_id !== 3) {
            return response()->json(['error' => 'La comanda no está en estado 3'], 422);
        }
        if ($item->estado < 2) {
            return response()->json(['error' => 'El ComandaItem no está en estado válido para pago'], 422);
        }
        if ($data['cantidad'] > $item->cantidad) {
            return response()->json(['error' => 'La cantidad solicitada excede la disponible'], 422);
        }
    
        $monto = $item->precio_unitario * $data['cantidad'];
    
        // Generar referencia única
        do {
            $ref = Str::random(10);
        } while (Pago::where('referencia', $ref)->exists());
    
        \DB::beginTransaction();
        try {
            // Unir con ítem ya pagado del mismo producto, si existe
            $existingPaid = ComandaItem::where('comanda_id', $item->comanda_id)
                ->where('producto_id', $item->producto_id)
                ->where('pagada', true)
                ->first();
    
            if ($existingPaid) {
                // Sumamos cantidad al ítem ya pagado
                $existingPaid->cantidad += $data['cantidad'];
                $existingPaid->save();
                // Restamos del ítem original
                $item->cantidad -= $data['cantidad'];
                $item->save();
                if ($item->cantidad <= 0) {
                    $item->delete();
                }
            } else {
                // Si pagas todo el ítem
                if ($item->cantidad == $data['cantidad']) {
                    $item->pagada = true;
                    $item->save();
                } else {
                    // Pagas parte del ítem
                    $item->cantidad -= $data['cantidad'];
                    $item->save();
                    $paidItem = $item->replicate();
                    $paidItem->cantidad = $data['cantidad'];
                    $paidItem->pagada   = true;
                    $paidItem->save();
                }
            }
    
            // Crear el pago parcial
            $pago = Pago::create([
                'metodo_pago_id' => $data['metodo_pago_id'],
                'comanda_id'     => $item->comanda_id,
                'monto'          => $monto,
                'referencia'     => $ref,
            ]);
    
            \DB::commit();
            return response()->json($pago->load(['metodo','comanda']), 201);
    
        } catch (\Exception $e) {
            \DB::rollBack();
            return response()->json([
                'error'   => 'Error al procesar el pago parcial',
                'message' => $e->getMessage()
            ], 500);
        }
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
