<?php
// app/Http/Controllers/EstadoComandaController.php

namespace App\Http\Controllers;

use App\Models\EstadoComanda;
use Illuminate\Http\Request;

class EstadoComandaController extends Controller
{
    /**
     * GET /estado-comandas
     * Devuelve todos los estados disponibles.
     */
    public function index()
    {
        return response()->json(EstadoComanda::orderBy('orden')->get());
    }

    /**
     * GET /estado-comandas/{estadoComanda}
     * Devuelve un estado concreto.
     */
    public function show(EstadoComanda $estadoComanda)
    {
        return response()->json($estadoComanda);
    }
}
