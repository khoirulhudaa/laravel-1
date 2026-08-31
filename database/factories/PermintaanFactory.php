<?php

namespace Database\Factories;

use App\Models\Permintaan;
use Illuminate\Database\Eloquent\Factories\Factory;

class PermintaanFactory extends Factory
{
    protected $model = Permintaan::class;

    public function definition(): array
    {
        return [
            'kodeseri' => 'K' . $this->faker->unique()->numerify('######'),
            'namaProduk' => $this->faker->word(),
            'applicant' => $this->faker->name(),
            'price' => $this->faker->randomFloat(2, 10000, 1000000),
            'category' => $this->faker->randomElement(['Elektronik', 'Kendaraan', 'Perlengkapan']),
            'condition' => $this->faker->randomElement(['baru', 'bekas']),
            'description' => $this->faker->sentence(),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
        ];
    }
}