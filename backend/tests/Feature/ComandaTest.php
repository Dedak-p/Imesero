<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Comanda;
use App\Models\Mesa;
use App\Models\EstadoComanda;
use App\Models\ComandaItem;
use App\Models\User;
use App\Models\Producto;
use Illuminate\Foundation\Testing\RefreshDatabase;

use PHPUnit\Framework\Attributes\Test;

class ComandaTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Aquí sembramos los datos necesarios
        $this->seed();
    }

    
    /*public function puede_calcular_el_total_correctamente()
    {
        $comanda = Comanda::factory()->create();
        ComandaItem::factory()->create([
            'comanda_id' => $comanda->id,
            'cantidad' => 2,
            'precio_unitario' => 10.50,
        ]);
        ComandaItem::factory()->create([
            'comanda_id' => $comanda->id,
            'cantidad' => 1,
            'precio_unitario' => 5.00,
        ]);

        $this->assertEquals(26.00, $comanda->total);
    }*/

    
    /*public function puede_obtener_el_estado_correctamente()
    {
        $estado = EstadoComanda::factory()->create(['nombre' => 'Pagado']);
        $comanda = Comanda::factory()->create(['estado_comanda_id' => $estado->id]);

        $this->assertEquals('Pagado', $comanda->estado);
    }*/

    
    /*public function test_puede_relacionarse_con_una_mesa()
    {
        $mesa = Mesa::factory()->create();
        $comanda = Comanda::factory()->create(['mesa_id' => $mesa->id]);

        $this->assertEquals($mesa->id, $comanda->mesa->id);
    }*/

    public function test_puede_crear_una_comanda_y_ocupar_la_mesa()
    {
        // 1. Crear el estado "borrador"
        /*$estadoBorrador = EstadoComanda::factory()->create([
            'nombre' => 'borrador',
        ]);*/

        // 1. Obtener el estado "borrador" desde la base de datos (ya sembrado por el Seeder)
        $estadoBorrador = EstadoComanda::where('nombre', 'borrador')->first();

        // 2. Crear una mesa libre
        $mesa = Mesa::factory()->libre()->create();

        // 3. Crear un producto (suponiendo que ya tienes productos en la base de datos)
        $producto = Producto::where('id', 5)->first();
        $cantidad = 1;

        // 4. Realizar la solicitud POST para agregar un ítem a la comanda
        $response = $this->postJson(route('mesas.items.store', ['mesa' => $mesa->id]), [
            'producto_id' => $producto->id,
            'cantidad' => $cantidad, // Ejemplo de cantidad (Se le puede pasar 1 o -1 solamente)
        ]);

        // 4. Comprobaciones

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
        $this->assertEquals($cantidad, $item->cantidad); // La cantidad debe ser 2                  
    }
}