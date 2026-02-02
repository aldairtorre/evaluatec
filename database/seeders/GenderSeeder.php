<?php

namespace Database\Seeders;

use App\Models\Gender;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Gender::insert([
            [
                'id' => '1',
                'name' => 'Masculino',
            ],
            [
                'id' => '2',
                'name' => 'Femenino',
            ],
        ]);
    }
}
