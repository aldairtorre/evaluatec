<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

class SectionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Section::insert([
            [
                'id' => 1,
                'label' => 'Motivaciones para estudiar un posgrado'
            ],
            [
                'id' => 2,
                'label' => 'Antecedentes académicos'
            ],
            [
                'id' => 3,
                'label' => 'Antecedentes laborales'
            ],
            [
                'id' => 4,
                'label' => 'Competencias personales académicas'
            ],
            [
                'id' => 5,
                'label' => 'Propuesta de investigación'
            ],
            [
                'id' => 6,
                'label' => 'Aspiraciones laborales y de vida'
            ],
            [
                'id' => 7,
                'label' => 'Económico'
            ],
        ]);
    }
}
