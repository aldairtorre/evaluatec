<?php

use App\Http\Controllers\auth\LoginController;
use App\Http\Controllers\prueba\PaymentController;
use App\Http\Controllers\prueba\ProductController;
use App\Http\Controllers\prueba\PruebaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['guest'])->group(function () {
   
    Route::get('/', function () {
        return redirect()->route('auth.login');
    });

    Route::get('auth/login', function () {
        return view('auth.main');
    })->name('auth.login');

});

Route::prefix('auth/')
    ->name('auth.')
    ->group(function () {
        Route::middleware('guest')->group(function () {

            Route::post('authenticate', [LoginController::class, 'authenticate'])
                ->name('authenticate');
                        
        });
    }

);

Route::get('web/{any}', function () {
    return view('admin.main');
})
    ->where('any', '.*')
    ->name('react_routes');
