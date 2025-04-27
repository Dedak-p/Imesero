<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Mesa;
use App\Models\EstadoComanda;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EstadoComandaFactory>
 */
class EstadoComandaFactory extends Factory
{

    /**
     * El nombre del modelo que se va a crear.
     *
     * @var string
     */
    protected $model = EstadoComanda::class;

    /**
     * Define el estado por defecto del modelo.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->word(),   // Genera una palabra aleatoria para el nombre
            'orden'  => $this->faker->numberBetween(1, 7),  // Genera un número aleatorio para el orden
        ];
    }
}
