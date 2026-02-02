<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;

class ProfilesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Profile::upsert([
            [
                'id' => '1',
                'name' => 'Administrador',
            ],
            [
                'id' => '2',
                'name' => 'Asesor',
            ],
        ], ['id'], ['name']);
    }
}
