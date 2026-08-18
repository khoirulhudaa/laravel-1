<?php

namespace Database\Seeders;

use App\Models\TypeModel;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TypeModel::factory()->count(56)->create();
    }
}
