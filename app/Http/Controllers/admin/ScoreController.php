<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Aspirant;
use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScoreController extends Controller
{
    public function indexContent(Request $request)
    {
        $page = (int) $request->get('page', 0);
        $size = (int) $request->get('size', 10);
        $skip = $page * $size;
        $filterName = $request->get('filterName', null);

        $query = Aspirant::with(['result']);

        if ($filterName !== null && $filterName !== '') {

            $term = trim($filterName);

            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', "%{$term}%")
                    ->orWhere('first_last_name', 'like', "%{$term}%")
                    ->orWhere('second_last_name', 'like', "%{$term}%");
        });        
        }

        $count = $query->count();
        $data = $query->skip($skip)
            ->take($size)
            ->get();

        return response()->json([
            'data' => $data,
            'total_rows' => $count,
        ]);
    }

    public function upsert(Request $request, $aspirantId)
    {
        try {
            $result = DB::transaction(function () use ($request, $aspirantId) {

                $scoreRequest = $request->input('score');
                if (is_string($scoreRequest)) {
                    $scoreRequest = json_decode($scoreRequest, true);
                }

                if (!is_array($scoreRequest) || empty($scoreRequest)) {
                    return [
                        'status' => 422,
                        'body' => [
                            'success' => false,
                            'message' => 'El campo score es requerido y debe ser un objeto válido.',
                        ],
                    ];
                }

                $courseScore      = $scoreRequest['course_score'] ?? null;
                $correctReagents  = $scoreRequest['correct_reagents'] ?? null;
                $interviewScore   = $scoreRequest['interview_score'] ?? null;

                if (!is_numeric($courseScore) || !is_numeric($correctReagents) || !is_numeric($interviewScore)) {
                    return [
                        'status' => 422,
                        'body' => [
                            'success' => false,
                            'message' => 'course_score, correct_reagents e interview_score deben ser numéricos.',
                        ],
                    ];
                }

                $courseScore = (float)$courseScore;
                $correctReagents = (float)$correctReagents;
                $interviewScore = (float)$interviewScore;

                $aspirant = Aspirant::with(['interview', 'result'])->find($aspirantId);

                if (!$aspirant) {
                    return [
                        'status' => 404,
                        'body' => [
                            'success' => false,
                            'message' => 'Aspirante no encontrado.',
                        ],
                    ];
                }

                if (!$aspirant->interview) {
                    return [
                        'status' => 409,
                        'body' => [
                            'success' => false,
                            'message' => 'El aspirante aún no ha sido entrevistado.',
                        ],
                    ];
                }

                $courseScorepercentage = round($courseScore * 0.25, 2);

                $totalReagents = 160;
                $correctReagentsPercentage = round(($correctReagents / $totalReagents) * 100, 2);

                $weighing = round($correctReagentsPercentage * 0.25, 2);
                $interviewScorePercentage = round($interviewScore * 0.50, 2);

                $finalScore = round($courseScorepercentage + $weighing + $interviewScorePercentage, 2);

                $isUpdate = (bool) $aspirant->result;

                $score = $aspirant->result ?? new Result();
                $score->course_score = $courseScore;
                $score->course_score_percentage = $courseScorepercentage . '%';

                $score->correct_reagents = (int)$correctReagents;
                $score->correct_reagents_percentage = $correctReagentsPercentage . '%';

                $score->weighing = $weighing . '%';

                $score->interview_score = $interviewScore;
                $score->interview_score_percentage = $interviewScorePercentage . '%';

                $score->final_score = $finalScore;
                $score->aspirant_id = $aspirantId;

                $score->saveOrFail();

                return [
                    'status' => 200,
                    'body' => [
                        'success' => true,
                        'title' => '¡Puntaje' . ($isUpdate ? ' modificado' : ' agregado') . '!',
                        'message' => 'El puntaje ha sido ' . ($isUpdate ? ' modificado' : ' agregado') . ' con éxito',
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


   public function deleteScore($aspirantId)
    {
        try {
            $result = DB::transaction(function () use ($aspirantId) {

                $score = Result::where('aspirant_id', $aspirantId)->first();

                if (!$score) {
                    return [
                        'status' => 404,
                        'body' => [
                            'success' => false,
                            'message' => 'Puntaje no encontrado para este aspirante.',
                        ],
                    ];
                }

                $score->delete();

                return [
                    'status' => 200,
                    'body' => [
                        'success' => true,
                        'title'   => 'Puntaje Eliminado',
                        'message' => 'El puntaje ha sido eliminado con éxito',
                    ],
                ];
            });

            return response()->json($result['body'], $result['status']);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar datos',
                'errorMessage' => $th->getMessage(),
            ], 500);
        }
    }

}
