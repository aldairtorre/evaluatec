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
            DB::beginTransaction();

            $scoreRequest = json_decode($request->get('score'), true);

            $aspirant = Aspirant::with(['interview'])->find($aspirantId);

            if (! isset($aspirant->interview)) {
                return response()->json([
                    'success' => false,
                    'message' => 'El aspirante aun no ha sido entrevistado.',
                ]);
            }

            $courseScore = $scoreRequest['course_score'];
            $correctReagents = $scoreRequest['correct_reagents'];
            $interviewScore = $scoreRequest['interview_score'];

            $courseScorepercentage = round($courseScore * 0.25, 2);
            $correctReagentsPercentage = round(($correctReagents / 160) * 100, 2);
            $weighing = round($correctReagentsPercentage * 0.25, 2);
            $interviewScorePercentage = round($interviewScore * 0.50, 2);
            $finalScore = round($courseScorepercentage + $weighing + $interviewScorePercentage, 2);

            if (isset($aspirant->result)) {
                $isUpdate = true;
            } else {
                $isUpdate = false;
            }

            if ($scoreRequest !== null) {
                $score = $aspirant->result ?? new Result;
                $score->course_score = $scoreRequest['course_score'];
                $score->course_score_percentage = strval($courseScorepercentage).'%';
                $score->correct_reagents = $scoreRequest['correct_reagents'];
                $score->correct_reagents_percentage = strval($correctReagentsPercentage).'%';
                $score->weighing = strval($weighing).'%';
                $score->interview_score = $scoreRequest['interview_score'];
                $score->interview_score_percentage = strval($interviewScorePercentage).'%';
                $score->final_score = $finalScore;
                $score->aspirant_id = $aspirantId;
                $score->saveOrFail();
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'title' => '¡Puntaje'.($isUpdate ? ' modificado' : ' agregado').'!',
                'message' => 'El puntaje ha sido '.($isUpdate ? ' modificado' : ' agregado').' con exito',
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al guardar datos',
                'errorMessage' => $th->getMessage(),
            ]);
        }
    }

    public function deleteScore($scoreId)
    {
        try {

            DB::beginTransaction();

            $score = Result::where('aspirant_id', '=', $scoreId)
                ->first();

            $score->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'title' => 'Puntaje Eliminado',
                'message' => 'El puntaje ha sido eliminado con exito',
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al guardar datos',
                'errorMessage' => $th->getMessage(),
            ]);
        }
    }
}
