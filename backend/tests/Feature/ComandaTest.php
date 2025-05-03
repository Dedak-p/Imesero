<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Comanda;
use App\Models\Mesa;
use App\Models\EstadoComanda;
use App\Models\ComandaItem;
use App\Models\User;
use App\Models\Producto;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use PHPUnit\Framework\Attributes\Test;

class ComandaTest extends TestCase {
    use RefreshDatabase;

    protected function setUp(): void {
        parent::setUp();

        // Aquí sembramos los datos necesarios
        $this->seed();
    }


    public function test_puede_crear_una_comanda_y_ocupar_la_mesa() {
        // 1. Obtener el estado "borrador" desde la base de datos (ya sembrado por el Seeder)
        $estadoBorrador = EstadoComanda::where('nombre', 'borrador')->first();

        // 2. Crear una mesa libre
        $mesa = Mesa::factory()->libre()->create();

        // 3. Crear un producto (suponiendo que ya tienes productos en la base de datos)
        $producto = Producto::where('nombre_es', 'Agua')->first();
        $cantidad = 1;

        // 4. Realizar la solicitud POST para agregar un ítem a la comanda
        $response = $this->postJson(route('mesas.items.store', ['mesa' => $mesa->id]), [
            'producto_id' => $producto->id,
            'cantidad' => $cantidad, // Ejemplo de cantidad (Se le puede pasar 1 o -1 solamente)
        ]);

        // 5. Comprobaciones

        // Código de respuesta 201
        $response->assertStatus(201);

        // Comprobar que la mesa ahora está ocupada
        $this->assertTrue(
            Mesa::find($mesa->id)->ocupada
        );

        // Comprobar que la comanda se ha creado y tiene el estado "borrador"
        $comanda = Comanda::where('mesa_id', $mesa->id)->where('estado_comanda_id', $estadoBorrador->id)->first();
        $this->assertNotNull($comanda);

        // Comprobar que el ítem se ha añadido correctamente
        $item = $comanda->items()->where('producto_id', $producto->id)->first();
        $this->assertNotNull($item);
        $this->assertEquals($cantidad, $item->cantidad); // La cantidad debe ser 1
    }

    public function test_no_puede_crear_una_comanda_con_un_item_con_cantidad_dos() {
        // Sembramos la base de datos con datos de prueba
        Artisan::call('db:seed');

        // Crear una mesa libre
        $mesa = Mesa::factory()->libre()->create();

        // Crear un producto (suponiendo que ya tienes productos en la base de datos)
        $producto = Producto::where('nombre_es', 'Agua')->first();
        $cantidad = 2;

        // Realizar la solicitud POST para agregar un ítem a la comanda
        $response = $this->postJson(route('mesas.items.store', ['mesa' => $mesa->id]), [
            'producto_id' => $producto->id,
            'cantidad' => $cantidad, // Intentar agregar un ítem con cantidad 2
        ]);

        // Comprobar que la respuesta es un error 422 (Unprocessable Entity)
        $response->assertStatus(422);
    }

    public function test_usuario_autenticado_puede_crear_una_comanda_y_ocupar_la_mesa() {
        // Sembramos la base de datos con datos de prueba
        Artisan::call('db:seed');
        
        // Datos de inicio de sesión
        $data = [
            'email' => 'admin@example.com',
            'password' => 'admin1234',
        ];

        // Realizar la solicitud POST al endpoint de login
        $response = $this->postJson('/api/login', $data);

        $token = $response->json('token');

        // Obtener el estado "borrador" desde la base de datos
        $estadoBorrador = EstadoComanda::where('nombre', 'borrador')->first();

        // Crear una mesa libre
        $mesa = Mesa::factory()->libre()->create();

        // Crear un producto (suponiendo que ya tienes productos en la base de datos)
        $producto = Producto::where('nombre_es', 'Agua')->first();
        $cantidad = 1;

        // Realizar la solicitud POST para agregar un ítem a la comanda con autenticación
        $response = $this->postJson(route('mesas.items.storeAuth', ['mesa' => $mesa->id]), [
            'producto_id' => $producto->id,
            'cantidad' => $cantidad,
        ], [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ]);

        // Comprobaciones

        // Código de respuesta 201
        $response->assertStatus(201);

        // Comprobar que la mesa ahora está ocupada
        $this->assertTrue(
            Mesa::find($mesa->id)->ocupada
        );

        // Comprobar que la comanda se ha creado y tiene el estado "borrador"
        $comanda = Comanda::where('mesa_id', $mesa->id)
            ->where('estado_comanda_id', $estadoBorrador->id)
            ->first();
        $this->assertNotNull($comanda);

        // Comprobar que el ítem se ha añadido correctamente
        $item = $comanda->items()->where('producto_id', $producto->id)->first();
        $this->assertNotNull($item);
        $this->assertEquals($cantidad, $item->cantidad); // La cantidad debe ser 1
    }
}
