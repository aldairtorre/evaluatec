<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::upsert(
            [
                [
                    'id' => 1,
                    'name' => 'Juan José',
                    'first_last_name' => 'Bedolla',
                    'second_last_name' => 'Solano',
                    'email' => 'juan.bs@acapulco.tecnm.mx',
                    'password' => Hash::make('4dm1nEv4luAt3c'),
                    'phone' => '',
                    'gender_id' => 1,
                    'profile_id' => 1,
                ],
            ],
            ['id'],
            [
                'name',
                'first_last_name',
                'second_last_name',
                'email',
                'password',
                'phone',
                'gender_id',
                'profile_id',
            ]
        );
    }
}
