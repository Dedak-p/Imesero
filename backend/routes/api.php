<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controladores
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MesaController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ComandaController;
use App\Http\Controllers\ComandaItemController;
use App\Http\Controllers\EstadoPedidoItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí definimos las rutas de la API de iMesero.
|
*/

// Ruta raíz (bienvenida)
Route::get('/', function () {
    return 'Bienvenido a la API de iMesero';
});

// Obtener usuario autenticado
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// --- Autenticación ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// --- Rutas públicas (index, show) ---
Route::get('mesas',               [MesaController::class, 'index']);
Route::get('mesas/{mesa}',        [MesaController::class, 'show']);

Route::get('categorias',          [CategoriaController::class, 'index']);
Route::get('categorias/{categoria}', [CategoriaController::class, 'show']);

Route::get('productos',           [ProductoController::class, 'index']);
Route::get('productos/{producto}',[ProductoController::class, 'show']);

Route::get('comandas',                [ComandaController::class, 'index']);
Route::get('comandas/{comanda}',      [ComandaController::class, 'show']);

Route::get('comandas/{comanda}/items', [ComandaItemController::class, 'index']);
Route::get('comanda-items/{comandaItem}', [ComandaItemController::class, 'show']);

Route::get('estados-items',            [EstadoPedidoItemController::class, 'index']);
Route::get('estados-items/{estadoPedidoItem}', [EstadoPedidoItemController::class, 'show']);

// --- Rutas protegidas sólo para admins ---
Route::middleware(['auth:sanctum','admin'])->group(function () {
    // Mesas
    Route::apiResource('mesas', MesaController::class)
         ->only(['store','update','destroy']);

    // Categorías
    Route::apiResource('categorias', CategoriaController::class)
         ->only(['store','update','destroy']);

    // Productos
    Route::apiResource('productos', ProductoController::class)
         ->only(['store','update','destroy']);

    // Comandas
    Route::apiResource('comandas', ComandaController::class)
         ->only(['store','update','destroy']);

    // Items de comanda (anidados y shallow)
    Route::apiResource('comandas.items', ComandaItemController::class)
         ->shallow()
         ->only(['store','update','destroy']);

    // Estados de items
    Route::apiResource('estados-items', EstadoPedidoItemController::class)
         ->only(['store','update','destroy']);

    // Gestión de usuarios (solo admin)
    Route::delete('/delete-user', [AuthController::class, 'deleteUser']);
    Route::get('/usersAll',       [AuthController::class, 'getAllUsers']);
});
