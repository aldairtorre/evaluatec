<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Section;
use Illuminate\Database\Seeder;

class QuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $section1Id = Section::where('label', '=', 'Motivaciones para estudiar un posgrado')->value('id');
        $section2Id = Section::where('label', '=', 'Antecedentes académicos')->value('id');
        $section3Id = Section::where('label', '=', 'Antecedentes laborales')->value('id');
        $section4Id = Section::where('label', '=', 'Competencias personales académicas')->value('id');
        $section5Id = Section::where('label', '=', 'Propuesta de investigación')->value('id');
        $section6Id = Section::where('label', '=', 'Aspiraciones laborales y de vida')->value('id');
        $section7Id = Section::where('label', '=', 'Económico')->value('id');

        Question::upsert(
            [
                [
                    'id' => 1,
                    'number_question' => 1,
                    'question' => '¿Por qué quieres estudiar esta Maestría?',
                    'section_id' => $section1Id,
                ],
                [
                    'id' => 2,
                    'number_question' => 2,
                    'question' => '¿Qué crees que te hace un candidato ideal para integrarse a esta Maestría?',
                    'section_id' => $section1Id,
                ],
                [
                    'id' => 3,
                    'number_question' => 3,
                    'question' => 'Desde tu punto de vista, ¿Cuál es el mayor problema en el área que enfrenta nuestro entorno?',
                    'section_id' => $section1Id,
                ],
                [
                    'id' => 4,
                    'number_question' => 4,
                    'question' => '¿Cómo crees que estudiar esta Maestría pudiese ayudar a afrontar ese problema?',
                    'section_id' => $section1Id,
                ],
                [
                    'id' => 5,
                    'number_question' => 5,
                    'question' => '¿Qué competencias o habilidades traes contigo que puedan integrarse a este programa?, es decir, ¿Cómo puedes contribuir a la Maestría?',
                    'section_id' => $section2Id,
                ],
                [
                    'id' => 6,
                    'number_question' => 6,
                    'question' => 'Actualmente, ¿trabajas?',
                    'section_id' => $section3Id,
                ],
                [
                    'id' => 7,
                    'number_question' => 7,
                    'question' => ' ¿Qué habilidades que hayas adquirido en tu trabajo te pueden ayudar en este contexto educativo?',
                    'section_id' => $section3Id,
                ],
                [
                    'id' => 8,
                    'number_question' => 8,
                    'question' => '¿Qué tal trabajas bajo presión? ¿Me podrías dar un ejemplo?',
                    'section_id' => $section4Id,
                ],
                [
                    'id' => 9,
                    'number_question' => 9,
                    'question' => '¿Qué problemas prevés en el futuro -en los próximos dos años- que puedan interferir para que completes la Maestría?',
                    'section_id' => $section4Id,
                ],
                [
                    'id' => 10,
                    'number_question' => 10,
                    'question' => '¿Cuál, es la propuesta de anteproyecto que planteas o propones para resolver una problemática, regional o nacional?, alineada a los ODS establecidos en la AGENDA 2023 y los PRONACES del CONAHCYT',
                    'section_id' => $section5Id,
                ],
                [
                    'id' => 11,
                    'number_question' => 11,
                    'question' => '¿Nos podrías platicar sobre tu proyecto de vida?',
                    'section_id' => $section6Id,
                ],
                [
                    'id' => 12,
                    'number_question' => 12,
                    'question' => '¿Cuál ha sido tu principal logro hasta ahora y por qué?',
                    'section_id' => $section6Id,
                ],
                [
                    'id' => 13,
                    'number_question' => 13,
                    'question' => '¿Qué haces en tus ratos libres?',
                    'section_id' => $section6Id,
                ],
                [
                    'id' => 14,
                    'number_question' => 14,
                    'question' => '¿Cómo has resuelto problemas fuertes en tu vida?',
                    'section_id' => $section6Id,
                ],
                [
                    'id' => 15,
                    'number_question' => 15,
                    'question' => '¿Cuáles son tus fortalezas y tus debilidades, en lo general? ¿Cómo te describirías a ti mismo?',
                    'section_id' => $section6Id,
                ],
                [
                    'id' => 16,
                    'number_question' => 16,
                    'question' => 'Si surgiera la oportunidad de hacer una estancia en el extranjero por un tiempo considerable, meses quizás, ¿la harías? ¿Qué limitaciones te pudiesen surgir?',
                    'section_id' => $section6Id,
                ],
                [
                    'id' => 17,
                    'number_question' => 17,
                    'question' => 'Comentarios o preguntas adicionales',
                    'section_id' => $section6Id,
                ],
                [
                    'id' => 18,
                    'number_question' => 18,
                    'question' => 'En caso de no recibir apoyo económico por parte de CONAHCYT, habría alguna limitante para continuar con el posgrado',
                    'section_id' => $section7Id,
                ],
                [
                    'id' => 19,
                    'number_question' => 19,
                    'question' => 'Si su proyecto requiere financiamiento, ¿cómo lo obtendría?',
                    'section_id' => $section7Id,
                ],
                [
                    'id' => 20,
                    'number_question' => 20,
                    'question' => 'Mencione dependientes económicos y cuál es su principal fuente de ingresos',
                    'section_id' => $section7Id,
                ],
                [
                    'id' => 21,
                    'number_question' => 21,
                    'question' => 'Tiene comentarios o preguntas adicionales',
                    'section_id' => $section7Id,
                ],
            ],
            ['id'],
            ['number_question', 'question', 'section_id']
        );
    }
}
