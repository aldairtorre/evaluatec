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
        $page = (int)$request->get('page',0);
        $size = (int)$request->get('size',10);
        $skip = $page * $size;
        $filterName = $request->get('filterName', null);

        $query = Aspirant::with('interview');

        if ($filterName !== null && $filterName !== '') {
            $query->whereRaw("CONCAT(name,' ',first_last_name,' ',second_last_name) like '%".$filterName."%'");
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
        try {
            DB::beginTransaction();

            $aspirantRequest = json_decode($request->get('aspirant'), true);
            $isUpdate = null;

            if ($aspirantId === 'FAKE_ID') {
                $isUpdate = true;
            }else{
                $isUpdate = false;
            }

            if ($aspirantRequest !== null) {
                $aspirant = Aspirant::where('email', '=', $aspirantRequest['email'])->first() ?? new Aspirant();
                $aspirant->fill($aspirantRequest);
                $aspirant->saveOrFail();
            }

            DB::commit();
            return response()->json([
                'success' => true,
                'title' => '¡Aspirante'. $isUpdate === true ? ' modificado!' : ' creado!',
                'message' => 'El aspirante ha sido'. $isUpdate === true ? ' modificado' : ' creado'  .' con exito',
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
