<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Comanda;
use App\Models\Mesa;
use App\Models\EstadoComanda;
use App\Models\ComandaItem;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ComandaTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function puede_calcular_el_total_correctamente()
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
    }

    /** @test */
    public function puede_obtener_el_estado_correctamente()
    {
        $estado = EstadoComanda::factory()->create(['nombre' => 'Pagado']);
        $comanda = Comanda::factory()->create(['estado_comanda_id' => $estado->id]);

        $this->assertEquals('Pagado', $comanda->estado);
    }

    /** @test */
    public function puede_relacionarse_con_una_mesa()
    {
        $mesa = Mesa::factory()->create();
        $comanda = Comanda::factory()->create(['mesa_id' => $mesa->id]);

        $this->assertEquals($mesa->id, $comanda->mesa->id);
    }
}