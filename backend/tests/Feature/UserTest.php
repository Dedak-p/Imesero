<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class UserTest extends TestCase {
    use RefreshDatabase;

    protected function setUp(): void {
        parent::setUp();

        // Aquí sembramos los datos necesarios
        $this->seed();
    }

    /**
     * Prueba que un usuario puede registrarse correctamente.
     */
    public function test_usuario_puede_registrarse() {
        // Datos de ejemplo para el registro
        $data = [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        // Realizar la solicitud POST al endpoint de registro
        $response = $this->postJson('/api/register', $data);

        // Comprobar que la respuesta tiene un código de estado 201 (creado)
        $response->assertStatus(201);

        // Comprobar que la respuesta contiene los datos esperados
        $response->assertJsonStructure([
            'message',
            'user' => [
                'id',
                'name',
                'email',
                'created_at',
                'updated_at',
            ],
            'token',
        ]);

        $response->assertJson([
            'message' => 'User registered successfully',
        ]);

        // Comprobar que el usuario se ha guardado en la base de datos
        $this->assertDatabaseHas('users', [
            'email' => 'johndoe@example.com',
        ]);
    }

    /**
     * Prueba que un usuario no puede registrarse introducioendo un password 
     * diferente al password de confirmación.
     */
    public function test_usuario_no_puede_registrarse_con_password_incorrecto() {
        // Datos de ejemplo para el registro
        $data = [
            'name' => 'John Dere',
            'email' => 'johndere@example.com',
            'password' => 'password123',
            'password_confirmation' => 'incorrecto123',
        ];

        // Realizar la solicitud POST al endpoint de registro
        $response = $this->postJson('/api/register', $data);

        // Comprobar que la respuesta tiene un código de estado 201 (creado)
        $response->assertStatus(422);

        // Comprobar que la respuesta contiene los datos esperados
        $response->assertJsonStructure([
            'message',
            'errors' => [
                'password'
            ]
        ]);

        $response->assertJson([
            'message' => 'The password field confirmation does not match.',
        ]);
    }

    /**
     * Prueba que un usuario puede iniciar sesión correctamente.
     */
    public function test_usuario_admin_puede_iniciar_sesion() {
        // Datos de inicio de sesión
        $data = [
            'email' => 'admin@example.com',
            'password' => 'admin1234',
        ];

        // Realizar la solicitud POST al endpoint de login
        $response = $this->postJson('/api/login', $data);

        // Comprobar que la respuesta tiene un código de estado 200 (éxito)
        $response->assertStatus(200);

        // Comprobar que la respuesta contiene la estructura esperada
        $response->assertJsonStructure([
            'message',
            'user' => [
                'id',
                'name',
                'email',
                'created_at',
                'updated_at',
            ],
            'token',
        ]);

        // Comprobar que el mensaje es correcto
        $response->assertJson([
            'message' => 'User logged in successfully',
        ]);
    }

    public function test_usuario_admin_no_puede_iniciar_sesion_con_password_incorrecto() {
        // Datos de inicio de sesión
        $data = [
            'email' => 'admin@example.com',
            'password' => 'incorrecto12345',
        ];

        // Realizar la solicitud POST al endpoint de login
        $response = $this->postJson('/api/login', $data);

        // Comprobar que la respuesta tiene un código de estado 200 (éxito)
        $response->assertStatus(401);

        // Comprobar que el mensaje es correcto
        $response->assertJson([
            'message' => 'Invalid credentials',
        ]);
    }

    /**
     * Prueba que el usuario admin autenticado puede cerrar sesión correctamente y que se borra su token.
     */
    public function test_usuario_admin_puede_logout_y_borrar_token() {
        // Datos de inicio de sesión
        $data = [
            'email' => 'admin@example.com',
            'password' => 'admin1234',
        ];

        // Realizar la solicitud POST al endpoint de login
        $response = $this->postJson('/api/login', $data);

        $token = $response->json('token');

        // Realizar la solicitud POST al endpoint de logout
        $response = $this->postJson('/api/logout',[], [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ]);

        // Comprobar que la respuesta tiene un código de estado 200 (éxito)
        $response->assertStatus(200);

        // Comprobar que el mensaje de la respuesta es correcto
        $response->assertJson([
            'message' => 'User logged out successfully',
        ]);

        // Obtener el usuario desde la base de datos
        $user = User::where('email', $data['email'])->first();

        // Comprobar que los tokens del usuario han sido eliminados
        $this->assertCount(0, $user->tokens);
    }
}
