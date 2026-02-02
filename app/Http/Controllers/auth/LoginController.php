<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        try {
            $credentials = [
                'email' => $request->get('email'),
                'password' => $request->get('password'),
                'active' => true,
            ];

            if (Auth::guard('admin')->attempt($credentials)) {
                $request->session()->regenerate();
                $user = Auth::guard('admin')->user();

                if (! $user->active) {
                    Auth::logout();
                    $request->session()->invalidate();
                    $request->session()->regenerateToken();

                    return response()->json([
                        'success' => false,
                        'title' => '¡Acceso denegado!',
                        'message' => 'Usuario deshabilitado',
                    ]);
                }

                $user->load('gender', 'imageUser', 'profile');

                return response()->json([
                    'success' => true,
                    'title' => '¡Acceso concedido!',
                    'message' => 'Bienvenido al sistema',
                    'user' => $user,
                ]);
            } else {
                return response()
                    ->json([
                        'success' => false,
                        'title' => '¡Acceso denegado!',
                        'message' => 'Error en correo o contraseña',
                    ]);
            }
        } catch (\Throwable $th) {
            return response()
                ->json([
                    'success' => false,
                    'title' => '¡Error!',
                    'message' => 'Error de sistema',
                ]);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->flush();
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'title' => '¡Sesión cerrada!',
            'message' => 'Sesión cerrada exitosamente',
        ]);
    }
}
