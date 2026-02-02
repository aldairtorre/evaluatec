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

        if ($filterName !== null && trim($filterName) !== '') {
            $term = trim($filterName);

            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', "%{$term}%")
                ->orWhere('first_last_name', 'like', "%{$term}%")
                ->orWhere('second_last_name', 'like', "%{$term}%");
            });
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
            $result = DB::transaction(function () use ($request, $userId) {

                $userRequest = $request->input('user');
                if (is_string($userRequest)) {
                    $userRequest = json_decode($userRequest, true);
                }

                $imageProfileRequest = $request->file('profile_image');

                if (!is_array($userRequest) || empty($userRequest)) {
                    return [
                        'status' => 422,
                        'body' => [
                            'success' => false,
                            'message' => 'El campo user es requerido y debe ser un objeto válido.',
                        ],
                    ];
                }

                $isUpdate = $userId !== 'FAKE_ID';

                if ($isUpdate) {
                    $user = User::find($userId) ?? new User();
                } else {
                    $user = new User();
                }

                $user->fill($userRequest);
                $user->saveOrFail();

                if ($imageProfileRequest) {
                    $user->loadMissing('imageUser');

                    $imageUser = $user->imageUser ?? new ImageUser();

                    $newUrlImage = UploadFiles::storeFile($imageProfileRequest, 'users/images');

                    if (!empty($imageUser->url_image)) {
                        UploadFiles::deleteFile($imageUser->url_image);
                    }

                    $imageUser->url_image = $newUrlImage;
                    $imageUser->user_id = $user->id;
                    $imageUser->saveOrFail();
                }

                return [
                    'status' => 200,
                    'body' => [
                        'success' => true,
                        'title' => '¡Usuario' . ($isUpdate ? ' modificado' : ' agregado') . '!',
                        'message' => 'El usuario ha sido ' . ($isUpdate ? ' modificado' : ' agregado') . ' con éxito',
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
        $userId = Auth::guard('admin')->id();

        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed', 
        ]);

        try {
            $result = DB::transaction(function () use ($request, $userId) {

                $user = User::find($userId);

                if (!$user) {
                    return [
                        'status' => 404,
                        'body' => [
                            'success' => false,
                            'title' => 'Error',
                            'message' => 'Usuario no encontrado',
                        ],
                    ];
                }

                $currentPassword = $request->input('current_password');

                if (!Hash::check($currentPassword, $user->password)) {
                    return [
                        'status' => 422,
                        'body' => [
                            'success' => false,
                            'title' => 'Error',
                            'message' => 'Las credenciales no coinciden',
                        ],
                    ];
                }

                $user->password = Hash::make($request->input('password'));
                $user->save();

                return [
                    'status' => 200,
                    'body' => [
                        'success' => true,
                        'title' => 'Éxito',
                        'message' => '¡Contraseña actualizada correctamente!',
                    ],
                ];
            });

            return response()->json($result['body'], $result['status']);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar contraseña',
                'errorMessage' => $th->getMessage(),
            ], 500);
        }
    }

}
