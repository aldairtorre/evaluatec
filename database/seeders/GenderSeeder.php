<?php

namespace Database\Seeders;

use App\Models\Gender;
use Illuminate\Database\Seeder;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Gender::upsert(
            [
                [
                    'id' => 1,
                    'name' => 'Masculino',
                ],
                [
                    'id' => 2,
                    'name' => 'Femenino',
                ],
            ],
            ['id'],
            ['name']
        );
    }
}
