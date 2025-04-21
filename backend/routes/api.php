<?php

use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Middleware\EnsureUserIsAdmin;

// Controladores
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MesaController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ComandaController;
use App\Http\Controllers\ComandaItemController;
use App\Http\Controllers\EstadoPedidoItemController;
use App\Http\Controllers\MetodoPagoController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\EstadoComandaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Bienvenida
Route::get('/', fn() => 'Bienvenido a la API de iMesero');

// Autenticación
Route::post('/register', [AuthController::class,'register']);
Route::post('/login',    [AuthController::class,'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class,'logout']);
Route::middleware('auth:sanctum')->get('/user', fn(Request $r) => $r->user());

// Rutas públicas: lectura de recursos
Route::get('mesas',                    [MesaController::class,'index']);
Route::get('mesas/{mesa}',             [MesaController::class,'show']);

Route::get('categorias',               [CategoriaController::class,'index']);
Route::get('categorias/{categoria}',   [CategoriaController::class,'show']);

Route::get('productos',                [ProductoController::class,'index']);
Route::get('productos/{producto}',     [ProductoController::class,'show']);

Route::get('comandas',                 [ComandaController::class,'index']);
Route::get('comandas/{comanda}',       [ComandaController::class,'show']);
Route::get('comandas/{comanda}/items', [ComandaItemController::class,'index']);
Route::middleware('auth:sanctum')->get('comandas-usuario', [ComandaController::class, 'comandasUsuario']);

Route::get('estados-items',            [EstadoPedidoItemController::class,'index']);
Route::get('estados-items/{estadoPedidoItem}', [EstadoPedidoItemController::class,'show']);

Route::get('estado-comandas',          [EstadoComandaController::class,'index']);
Route::get('estado-comandas/{id}',     [EstadoComandaController::class,'show']);

// Flujo Cliente: añadir primer ítem (crea/recupera comanda y ocupa mesa)
Route::post('mesas/{mesa}/items', [ComandaItemController::class,'store']);
//Autenticado
Route::middleware('auth:sanctum')->post('/mesas/{mesa}/itemsAuth', [ComandaItemController::class, 'storeAuth']);


// Cliente confirma SU ítem (por confirmar → confirmado) y dispara comanda borrador → pedido
Route::patch('mesas/{mesa}/confirm', [ComandaItemController::class,'confirm']);


// Cliente puede ver sus ítems (opcional, si los necesita fuera de comanda)
Route::get('comanda-items/{comandaId}', [ComandaItemController::class,'show']);

// Rutas protegidas solo para admin
Route::middleware(['auth:sanctum',EnsureUserIsAdmin::class])->group(function(){
    // CRUD completo de mesas, categorías, productos, comandas y estados-items
    Route::apiResource('mesas',         MesaController::class)->only(['store','update','destroy']);
    Route::apiResource('categorias',    CategoriaController::class)->only(['store','update','destroy']);
    Route::apiResource('productos',     ProductoController::class)->only(['store','update','destroy']);
    //Route::apiResource('comandas',      ComandaController::class)->only(['index','store','update','destroy']);
    Route::apiResource('estados-items', EstadoPedidoItemController::class)->only(['store','update','destroy']);

    // Gestión de comanda-items: avanzar estados (cocina, camino, entregado…) y eliminar
    Route::put('comanda-items/{comandaItem}',    [ComandaItemController::class,'update']);
    Route::delete('comanda-items/{comandaItem}', [ComandaItemController::class,'destroy']);

    // Gestión de usuarios
    Route::delete('/delete-user', [AuthController::class,'deleteUser']);
    Route::get('/usersAll',       [AuthController::class,'getAllUsers']);

    // Métodos de pago y pagos
    Route::apiResource('metodos-pago', MetodoPagoController::class);
    Route::apiResource('pagos',        PagoController::class);
});
