<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $Role = Role::pluck('id')->toArray();

        if(empty($Role)) {
            $this->command->warn('Table role masih kosong, jalankan RoleSeeder dahulu!');
            return;
        }

        User::factory(10)->create();
    }
}
