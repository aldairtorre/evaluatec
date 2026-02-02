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
            $result = DB::transaction(function () use ($request, $aspirantId) {

                $interviewRequest = $request->input('interview');
                if (is_string($interviewRequest)) {
                    $interviewRequest = json_decode($interviewRequest, true);
                }

                $userRequest = $request->input('user');
                if (is_string($userRequest)) {
                    $userRequest = json_decode($userRequest, true);
                }

                if (!is_array($interviewRequest) || empty($interviewRequest)) {
                    return [
                        'status' => 422,
                        'body' => [
                            'success' => false,
                            'message' => 'El campo interview es requerido y debe ser un arreglo.',
                        ],
                    ];
                }

                if (!is_array($userRequest) || empty($userRequest['id'])) {
                    return [
                        'status' => 422,
                        'body' => [
                            'success' => false,
                            'message' => 'El campo user es requerido y debe incluir id.',
                        ],
                    ];
                }

                $interviewExist = Interview::where('aspirant_id', $aspirantId)->first();

                if ($interviewExist) {

                    $qaList = QuestionAnswerInterview::where('interview_id', $interviewExist->id)->get();

                    $byQuestionId = [];
                    foreach ($qaList as $qa) {
                        $byQuestionId[(int)$qa->question_id] = $qa;
                    }

                    foreach ($interviewRequest as $item) {
                        $questionId = (int)($item['number_question'] ?? 0);
                        $newAnswer  = $item['answer'] ?? null;

                        if ($questionId <= 0) continue;         
                        if (!is_string($newAnswer)) $newAnswer = (string)($newAnswer ?? '');

                        $qa = $byQuestionId[$questionId] ?? null;
                        if (!$qa) {
                            $answer = Answer::create(['answer' => $newAnswer]);

                            QuestionAnswerInterview::create([
                                'question_id'  => $questionId,
                                'asnswer_id'   => $answer->id,       
                                'interview_id' => $interviewExist->id,
                            ]);

                            continue;
                        }

                        $answer = Answer::find($qa->asnswer_id); 
                        if ($answer) {
                            $answer->answer = $newAnswer;
                            $answer->save();
                        } else {
                            $answer = Answer::create(['answer' => $newAnswer]);
                            $qa->asnswer_id = $answer->id;
                            $qa->save();
                        }
                    }

                    return [
                        'status' => 200,
                        'body' => [
                            'success' => true,
                            'message' => 'Entrevista actualizada con éxito',
                        ],
                    ];
                }

                $newInterview = Interview::create([
                    'user_id'     => (int)$userRequest['id'],
                    'aspirant_id' => $aspirantId,
                ]);

                foreach ($interviewRequest as $item) {
                    $questionId = (int)($item['number_question'] ?? 0);
                    $answerText = $item['answer'] ?? '';

                    if ($questionId <= 0) continue;
                    if (!is_string($answerText)) $answerText = (string)$answerText;

                    $answer = Answer::create([
                        'answer' => $answerText,
                    ]);

                    QuestionAnswerInterview::create([
                        'question_id'  => $questionId,
                        'asnswer_id'   => $answer->id, 
                        'interview_id' => $newInterview->id,
                    ]);
                }

                return [
                    'status' => 200,
                    'body' => [
                        'success' => true,
                        'message' => 'Entrevista guardada con éxito',
                    ],
                ];
            });

            return response()->json($result['body'], $result['status']);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error al guardar datos',
                'errorMessage' => $th->getMessage(),
            ], 500);
        }
    }

}
