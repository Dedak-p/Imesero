<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Mesa;

class MesaTest extends TestCase {
    use RefreshDatabase;

    protected function setUp(): void {
        parent::setUp();

        // Aquí sembramos los datos necesarios
        $this->seed();
    }

    public function test_index_devuelve_todas_las_mesas() {
        //Mesa::factory()->count(3)->create();

        $response = $this->getJson('/api/mesas');

        $response->assertStatus(200)
                 ->assertJsonCount(5); // Inicialmente hay 5 mesas en la base de datos
    }

    public function test_puede_crear_una_mesa_si_es_admin() {

        // Datos de inicio de sesión
        $dataLogin = [
            'email' => 'admin@example.com',
            'password' => 'admin1234',
        ];

        // Realizar la solicitud POST al endpoint de login
        $responseLogin = $this->postJson('/api/login', $dataLogin);

        $token = $responseLogin->json('token');

        $dataMesa = [
            'codigo'    => 'M-06',
            'capacidad' => 4,
            'ocupada'   => false,
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/mesas', $dataMesa);

         

        $response->assertStatus(201)
                 ->assertJsonFragment($dataMesa);

        $this->assertDatabaseHas('mesas', $dataMesa);
    }

    public function test_no_puede_crear_una_mesa_si_no_es_admin() {

        // Datos de inicio de sesión
        $dataLogin = [
            'email' => 'user@example.com',
            'password' => 'secret123',
        ];

        // Realizar la solicitud POST al endpoint de login
        $responseLogin = $this->postJson('/api/login', $dataLogin);

        $token = $responseLogin->json('token');

        $dataMesa = [
            'codigo'    => 'M-07',
            'capacidad' => 4,
            'ocupada'   => false,
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/mesas', $dataMesa);

        // 403 (Forbidden): Si el usuario está autenticado pero no tiene permisos para realizar la operación.
        $response->assertStatus(403);

        $response->assertJson([
            'message' => 'Forbidden. Se requiere rol admin.', // Mensaje típico de Laravel
        ]);

    }

    public function test_show_devuelve_mesa_data() {
        $mesa = Mesa::factory()->create(['ocupada' => false]);

        $response = $this->getJson("/api/mesas/{$mesa->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment(['codigo' => $mesa->codigo]);
    }

    public function test_puede_hacer_update_a_mesa_si_es_admin() {
        // Datos de inicio de sesión
        $dataLogin = [
            'email' => 'admin@example.com',
            'password' => 'admin1234',
        ];

        // Realizar la solicitud POST al endpoint de login
        $responseLogin = $this->postJson('/api/login', $dataLogin);

        $token = $responseLogin->json('token');

        $mesa = Mesa::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->putJson("/api/mesas/{$mesa->id}", [
            'capacidad' => 6,
        ]);

        $response->assertStatus(200)
                 ->assertJsonFragment(['capacidad' => 6]);

        $this->assertDatabaseHas('mesas', ['id' => $mesa->id, 'capacidad' => 6]);
    }

    public function test_no_puede_hacer_update_a_mesa_si_no_es_admin() {
        // Datos de inicio de sesión
        $dataLogin = [
            'email' => 'user@example.com',
            'password' => 'secret123',
        ];

        // Realizar la solicitud POST al endpoint de login
        $responseLogin = $this->postJson('/api/login', $dataLogin);

        $token = $responseLogin->json('token');

        $mesa = Mesa::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->putJson("/api/mesas/{$mesa->id}", [
            'capacidad' => 6,
        ]);

        // 403 (Forbidden): Si el usuario está autenticado pero no tiene permisos para realizar la operación.
        $response->assertStatus(403);

        $response->assertJson([
            'message' => 'Forbidden. Se requiere rol admin.', // Mensaje típico de Laravel
        ]);
    }

    public function test_puede_hacer_delete_en_una_mesa_si_es_admin() {
        // Datos de inicio de sesión
        $dataLogin = [
            'email' => 'admin@example.com',
            'password' => 'admin1234',
        ];

        // Realizar la solicitud POST al endpoint de login
        $responseLogin = $this->postJson('/api/login', $dataLogin);

        $token = $responseLogin->json('token');

        $mesa = Mesa::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->deleteJson("/api/mesas/{$mesa->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('mesas', ['id' => $mesa->id]);
    }

    public function test_no_puede_hacer_delete_en_una_mesa_si_no_es_admin() {
        // Datos de inicio de sesión
        $dataLogin = [
            'email' => 'user@example.com',
            'password' => 'secret123',
        ];

        // Realizar la solicitud POST al endpoint de login
        $responseLogin = $this->postJson('/api/login', $dataLogin);

        $token = $responseLogin->json('token');

        $mesa = Mesa::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->deleteJson("/api/mesas/{$mesa->id}");

        // 403 (Forbidden): Si el usuario está autenticado pero no tiene permisos para realizar la operación.
        $response->assertStatus(403);

        $response->assertJson([
            'message' => 'Forbidden. Se requiere rol admin.', 
        ]);
    }
}
