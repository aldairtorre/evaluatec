<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuestionController extends Controller
{
    public function indexContent(Request $request)
    {
        $page = (int)$request->get('page',0);
        $size = (int)$request->get('size',10);
        $skip = $page * $size;

        $filterContent = $request->get('filter-content', null);
        $filterNumber = $request->get('filter-number', null);

        $query = Question::with(['section'])
            ->orderBy('number_question', 'asc');

        if ($filterContent !== null && $filterContent !== '') {
            $query->where('question','like','%'.$filterContent.'%');
        }

        if ($filterNumber !== null) {
            $query->where('number_question', '=' , $filterNumber);
        }

        $count = $query->count();
        $data = $query->skip($skip)
            ->take($size)
            ->get();

        return response()->json([
            'data' => $data,
            'questions' => Question::all(),
            'total_rows' => $count,
        ]);
    }

    public function upsert(Request $request, $questionId)
    {
        try {

            DB::beginTransaction();

            $questionRequest = json_decode($request->get('question'), true);

            $questionExist = Question::find($questionId);

            if ($questionRequest !== null) {
                $question = (isset($questionExist)) ? $questionExist : new Question();
                $question->fill($questionRequest);
                $question->saveOrFail();
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'title' => 'Pregunta '. ($questionExist ? 'Modificada' : 'Agregada'),
                'message' => 'La pregunta ha sido ' . ($questionExist ? 'modificada' : 'agregada') . ' con exito',
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

    public function deleteQuestion($questionId) {
        try {

            DB::beginTransaction();

            $question = Question::find($questionId);
            $question->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'title' => 'Pregunta Eliminada',
                'message' => 'La pregunta ha sido elinada con exito',
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
