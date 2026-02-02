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
        $page = (int) $request->get('page', 0);
        $size = (int) $request->get('size', 10);
        $skip = $page * $size;

        $filterContent = $request->get('filter-content', null);
        $filterNumber = $request->get('filter-number', null);

        $query = Question::with(['section'])
            ->orderBy('number_question', 'asc');

        if ($filterContent !== null && $filterContent !== '') {
            $query->where('question', 'like', '%'.$filterContent.'%');
        }

        if ($filterNumber !== null) {
            $query->where('number_question', '=', $filterNumber);
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
            $result = DB::transaction(function () use ($request, $questionId) {

                $questionRequest = $request->input('question');
                if (is_string($questionRequest)) {
                    $questionRequest = json_decode($questionRequest, true);
                }

                if (!is_array($questionRequest) || empty($questionRequest)) {
                    return [
                        'status' => 422,
                        'body' => [
                            'success' => false,
                            'message' => 'El campo question es requerido y debe ser un objeto válido.',
                        ],
                    ];
                }

                $questionExist = Question::find($questionId);
                $isUpdate = (bool) $questionExist;

                $question = $questionExist ?? new Question();
                $question->fill($questionRequest);
                $question->saveOrFail();

                return [
                    'status' => 200,
                    'body' => [
                        'success' => true,
                        'title'   => 'Pregunta ' . ($isUpdate ? 'Modificada' : 'Agregada'),
                        'message' => 'La pregunta ha sido ' . ($isUpdate ? 'modificada' : 'agregada') . ' con éxito',
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


   public function deleteQuestion($questionId)
    {
        try {
            $result = DB::transaction(function () use ($questionId) {

                $question = Question::find($questionId);

                if (!$question) {
                    return [
                        'status' => 404,
                        'body' => [
                            'success' => false,
                            'message' => 'Pregunta no encontrada',
                        ],
                    ];
                }

                $question->delete();

                return [
                    'status' => 200,
                    'body' => [
                        'success' => true,
                        'title'   => 'Pregunta Eliminada',
                        'message' => 'La pregunta ha sido eliminada con éxito',
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
