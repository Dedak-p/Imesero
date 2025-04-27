<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Mesa;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Mesa>
 */
class MesaFactory extends Factory
{
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'codigo' => strtoupper($this->faker->bothify('MESA-##')),
            'ocupada' => $this->faker->boolean(),
            'capacidad' => $this->faker->numberBetween(2, 10)
        ];
    }

    public function ocupada()
    {
        return $this->state([
            'ocupada' => true,
        ]);
    }

    public function libre()
    {
        return $this->state([
            'ocupada' => false,
        ]);
    }


}
