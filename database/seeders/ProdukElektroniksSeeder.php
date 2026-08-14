<?php

namespace Database\Seeders;

use App\Models\ProdukElektroniks;
use Illuminate\Database\Seeder;

class ProdukElektroniksSeeder extends Seeder
{
    public function run(): void
    {
        ProdukElektroniks::factory()->count(50)->create();
    }
}