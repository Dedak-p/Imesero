<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Mesa;

class MesaSeeder extends Seeder
{
    public function run()
    {
        $mesas = [
            ['codigo' => 'M-01', 'capacidad' => 4],
            ['codigo' => 'M-02', 'capacidad' => 4],
            ['codigo' => 'M-03', 'capacidad' => 2],
            ['codigo' => 'M-04', 'capacidad' => 6],
            ['codigo' => 'M-05', 'capacidad' => 4],
        ];

        foreach ($mesas as $data) {
            Mesa::updateOrCreate(
                ['codigo' => $data['codigo']],
                $data
            );
        }
    }
}
