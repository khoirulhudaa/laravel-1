<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Type>
 */
class TypeModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $types = ['Lg', 'Samsung', 'Panasonic', 'Vivo', 'Oppo', 'Motorola'];
        $countries = ['Korea', 'China', 'Jepang', 'Swedia', 'Rusia', 'Indonesia'];
        $initials = ['LG', 'SM', 'PS', 'VV', 'OP', 'MR'];

        return [
            'name' => $this->faker->randomElement($types),
            'country' => $this->faker->randomElement($countries),
            'initial' => $this->faker->randomElement($initials)
        ];
    }
}
