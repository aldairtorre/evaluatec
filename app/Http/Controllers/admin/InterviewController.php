<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\Interview;
use App\Models\Question;
use App\Models\QuestionAnswerInterview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InterviewController extends Controller
{
    public function indexContent(Request $request)
    {

        $query = Interview::with(['user', 'aspirant', 'questionAnswers.question', 'questionAnswers.answer'])->get();

        return response()->json([
            'data' => $query,
            'questions' => Question::all(),
        ]);
    }

    public function upsert(Request $request, $aspirantId)
    {
        try {
            DB::beginTransaction();

            $interviewRequest = json_decode($request->get('interview'), true);

            $userRequest = json_decode($request->get('user'), true);

            $interviewExist = Interview::where('aspirant_id', '=', $aspirantId)->first();
            if (isset($interviewExist)) {

                $aspirantInterviews = QuestionAnswerInterview::where('interview_id', '=', $interviewExist['id'])
                    ->get();

                foreach ($aspirantInterviews as $key => $aspirantInterview) {
                   $answer = Answer::find($aspirantInterview['asnswer_id']);
                   $answer->answer = $interviewRequest[$key]['answer'];
                   $answer->save();
                }

                DB::commit();

                return response()->json([
                    'success' => true,
                    'message' => 'Entrevista actualizada con exito'
                ]);
            }
            
            if ($interviewRequest !== null && $userRequest !== null) {
                $newInterview = Interview::create([
                    'user_id' => $userRequest['id'],
                    'aspirant_id' => $aspirantId,
                ]);

                foreach ($interviewRequest as $key => $interview) {
                    $answer = Answer::create([
                        'answer' => $interview['answer']
                    ]);

                    QuestionAnswerInterview::create([
                        'question_id' => $interview['number_question'],
                        'asnswer_id' => $answer->id,
                        'interview_id' => $newInterview->id,
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Entrevista guardada con exito'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error al guardar datos',
                'errorMessage' => $th->getMessage(),
            ]);;
        }
    }


}
