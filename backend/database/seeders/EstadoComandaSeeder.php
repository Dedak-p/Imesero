<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\EstadoComanda;

class EstadoComandaSeeder extends Seeder
{
    public function run(): void
    {
        // 1) Trunca la tabla y reinicia la secuencia de IDs
        DB::statement('TRUNCATE TABLE estado_comandas RESTART IDENTITY CASCADE');

        // 2) Define los estados en orden
        $estados = [
            ['nombre' => 'borrador',   'orden' => 1],
            ['nombre' => 'pedido',     'orden' => 2],
            ['nombre' => 'confirmada', 'orden' => 3],
            ['nombre' => 'pagada',     'orden' => 4],
            ['nombre' => 'preparando', 'orden' => 5],
            ['nombre' => 'encamino',   'orden' => 6],
            ['nombre' => 'servido',    'orden' => 7],
        ];

        // 3) Inserta cada estado; como la tabla está vacía, no provoca duplicados
        foreach ($estados as $e) {
            EstadoComanda::create([
                'nombre' => $e['nombre'],
                'orden'  => $e['orden'],
            ]);
        }
    }
}
