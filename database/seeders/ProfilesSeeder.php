<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

class ProfilesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Profile::insert([
            [
                'id' => '1',
                'name' => 'Administrador'
            ],
            [
                'id' => '2',
                'name' => 'Asesor'
            ]
        ]);
    }
}
