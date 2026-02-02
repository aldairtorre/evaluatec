<?php

use App\Http\Controllers\admin\AspirantController;
use App\Http\Controllers\admin\InterviewController;
use App\Http\Controllers\admin\PdfController;
use App\Http\Controllers\admin\QuestionController;
use App\Http\Controllers\admin\ScoreController;
use App\Http\Controllers\admin\SectionController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\auth\LoginController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('admin/home');
});

Route::get('user-authenticate', [UserController::class, 'userAuthenticate'])
    ->name('user_authenticate');

Route::prefix('users')
    ->name('users.')
    ->group(
        function () {
            Route::get('index', [UserController::class, 'indexContent'])
                ->name('index');
            Route::post('upsert/{userId}', [UserController::class, 'upsert'])
                ->name('upsert');
            Route::post('change-status/{userId}', [UserController::class, 'changeStatusUser'])
                ->name('change_status');
            Route::post('change-password', [UserController::class, 'changePassword'])
                ->name('change_password');
        }
    );

Route::prefix('questions')
    ->name('questions.')
    ->group(
        function () {
            Route::get('index', [QuestionController::class, 'indexContent'])
                ->name('index');
            Route::post('upsert/{questionId}', [QuestionController::class, 'upsert'])
                ->name('upsert');
            Route::delete('delete-question/{questionId}', [QuestionController::class, 'deleteQuestion'])
                ->name('delete_question');
        }
    );

Route::prefix('aspirants')
    ->name('aspirants.')
    ->group(
        function () {
            Route::get('index', [AspirantController::class, 'indexContent'])
                ->name('index');
            Route::post('upsert/{aspirantId}', [AspirantController::class, 'upsert'])
                ->name('upsert');
        }
    );

Route::prefix('interviews')
    ->name('interviews.')
    ->group(
        function () {
            Route::get('index', [InterviewController::class, 'indexContent'])
                ->name('index');
            Route::post('upsert/{aspirantId}', [InterviewController::class, 'upsert'])
                ->name('upsert');
            Route::get('generate-pdf/{aspirantId}', [PdfController::class, 'downloadPdf'])
                ->name('generate_pdf');
        }
    );

Route::prefix('results')
    ->name('results.')
    ->group(
        function () {
            Route::get('index', [ScoreController::class, 'indexContent'])
                ->name('index');
            Route::post('upsert/{aspirantId}', [ScoreController::class, 'upsert'])
                ->name('upsert');
            Route::delete('delete-score/{scoreId}', [ScoreController::class, 'deleteScore'])
                ->name('delete_score');
        }
    );

Route::prefix('sections')
    ->name('sections.')
    ->group(
        function () {
            Route::get('index', [SectionController::class, 'indexContent'])
                ->name('index');
        }
    );

Route::post('logout', [LoginController::class, 'logout'])
    ->name('logout');

Route::get('{any}', function () {
    return view('admin.main');
})
    ->where('any', '.*')
    ->name('react_routes');
