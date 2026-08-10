<?php

namespace Database\Factories;

use App\Models\ProdukElektroniks;
use Illuminate\Database\Eloquent\Factories\Factory;
/**
 * @extends Factory<ProdukElektroniks>
 */
class ProdukElektroniksFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $categories = ['Laptop0', 'Smartphone', 'Monitor', 'Printer', 'Keyboard'];
        $suppliers = ['PT Sinar Jaya', 'PT TMSC Taiwan'];
        $buyers = ['Huda', 'Nabila'];
        $types = ['LG', 'Panasonic'];
        $conditions = ['New', 'Second'];
        
        return [
            'nameProduk' => $this->faker->randomElement($categories) . '' . $this->faker->word(),
            'category' => $this->faker->randomElement($categories),
            'supplier' => $this->faker->randomElement($suppliers),
            'buyer' => $this->faker->randomElement($buyers),
            'catalog' => 'CAT-' . $this->faker->unique()->numberBetween(1000, 9999),
            'type' => $this->faker->randomElement($types),
            'condition' => $this->faker->randomElement($conditions),
            'description' => $this->faker->sentence(8),
            'price' => $this->faker->unique()->numberBetween(1111, 9999),
            'kodeseri' => $this->faker->unique()->bothify('SN-####-????')
        ];
    }
}
