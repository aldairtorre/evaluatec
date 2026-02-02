<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Gender;
use App\Models\ImageUser;
use App\Models\Profile;
use App\Models\User;
use App\Services\UploadFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function userAuthenticate()
    {
        $userAuthenticate = Auth::guard('admin')->user();
        $userAuthenticate->load('profile', 'gender', 'imageUser');
        return response()->json([
            'user' => $userAuthenticate,
        ]);
    }

    public function indexContent(Request $request)
    {
        $page = (int)$request->get('page', 0);
        $size = (int)$request->get('size', 10);
        $skip = $page * $size;

        $filterName = $request->get('filterName', null);
        $filterStatus = $request->get('filterStatus', null);

        $query = User::with(['gender', 'profile', 'imageUser'])
            ->orderBy('id', 'desc');

        if ($filterName !== null && $filterName !== '') {
            $query->whereRaw("CONCAT(name,' ',first_last_name,' ',second_last_name) like '%" . $filterName . "%'");
        }

        if ($filterStatus !== null) {
            $query->where('active', '=', $filterStatus);
        }

        $count = $query->count();
        $data = $query->skip($skip)
            ->take($size)
            ->get();


        return response()->json([
            'data' => $data,
            'genders' => Gender::all(),
            'profiles' => Profile::all(),
            'total_rows' => $count,
        ]);
    }

    public function upsert(Request $request, $userId)
    {
        try {
            DB::beginTransaction();

            $userRequest = json_decode($request->get('user'), true);
            $imageProfileRequest = $request->file('profile_image');

            $isUpdate = false;

            if ($userId !== 'FAKE_ID') {
                $isUpdate = true;
            }

            if ($userRequest !== null) {
                $user = User::findOrNew($userId);
                $user->fill($userRequest);
                $user->saveOrFail();
            }

            if ($imageProfileRequest !== null) {
                $imageUser = $user->imageUser ?? new ImageUser();
                if (!empty($imageUser->url_image)) {
                    UploadFiles::deleteFile($imageUser->url_image);
                }
                $newUrlImage = UploadFiles::storeFile($imageProfileRequest, 'users/images');
                $imageUser->url_image = $newUrlImage;
                $imageUser->user_id = $user->id;
                $imageUser->saveOrFail();
            }

            DB::commit();
            return response()->json([
                'success' => true,
                'title' => '¡Usuario' . ($isUpdate ? ' modificado' : ' agregado') . '!',
                'message' => 'El usuario ha sido ' . ($isUpdate ? ' modificado' : ' agregado')  . ' con exito',
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

    public function changeStatusUser($userId)
    {
        $user = User::find($userId);
        if (isset($user)) {
            $user->active = !$user->active;
            $user->save();
            return response()->json([
                'success' => true,
                'title' => '¡Usuario' . ($user->active  ? ' activado' : ' desactivado') . '!',
                'message' => 'El usuario ha sido' . ($user->active  ? ' activado' : ' desactivado') . ' con exito',
            ]);
        }
    }

    public function changePassword(Request $request)
    {
        $userId = (Auth::guard('admin')->user())->id;
        DB::beginTransaction();
        try {
            $user = User::find($userId);

            $currenPassword = $request->get('current_password');

            if (!Hash::check($currenPassword, $user->password)) {
                return response()->json([
                    'success' => false,
                    'title' => 'Error',
                    'message' => 'Las credenciales no coinciden',
                ]);
            } else {
                $user->password = $request->get('password');
                $user->save();
                DB::commit();
                return response()->json([
                    'success' => true,
                    'title' => 'Exito',
                    'message' => '¡Contraseña actualizada correctamente!',
                ]);
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
                'line' => $th->getLine(),
                'file' => $th->getFile()
            ]);
        }
    }
}
