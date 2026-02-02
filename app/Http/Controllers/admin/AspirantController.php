<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Aspirant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AspirantController extends Controller
{
    public function indexContent(Request $request)
    {
        $page = (int) $request->get('page', 0);
        $size = (int) $request->get('size', 10);
        $skip = $page * $size;
        $filterName = $request->get('filterName', null);

        $query = Aspirant::with('interview');

        if ($filterName !== null && trim($filterName) !== '') {
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
            'success' => true,
            'data' => $data,
            'total_rows' => $count,
        ]);
    }

    public function upsert(Request $request, $aspirantId)
    {
        $data = json_decode($request->get('aspirant'), true);

        try {
            $result = DB::transaction(function () use ($data, $aspirantId) {

                $isUpdate = $aspirantId !== 'FAKE_ID';

                $aspirant = Aspirant::firstOrNew([
                    'email' => $data['email'],
                ]);

                $aspirant->fill($data);
                $aspirant->saveOrFail();

                return $isUpdate;
            });

            return response()->json([
                'success' => true,
                'title'   => '¡Aspirante' . ($result ? ' modificado!' : ' creado!'),
                'message' => 'El aspirante ha sido' . ($result ? ' modificado' : ' creado') . ' con éxito',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error al guardar datos',
                'errorMessage' => $th->getMessage(),
            ], 500);
        }
    }

}
