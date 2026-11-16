<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\AdminController;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', function (\Illuminate\Http\Request $request) {
        return response()->json([
            'success' => true,
            'data' => $request->user()
        ]);
    });
    Route::get('/admin/users', [AdminController::class, 'getUsers']);
    Route::get('/admin/modules', [AdminController::class, 'getModules']);
    Route::post('/admin/modules', [AdminController::class, 'storeModule']);
    Route::post('/admin/modules/{id}/tasks', [AdminController::class, 'storeTask']);
    Route::put('/admin/modules/{id}', [AdminController::class, 'updateModule']);
    Route::delete('/admin/modules/{id}', [AdminController::class, 'destroyModule']);
    Route::put('/admin/tasks/{id}', [AdminController::class, 'updateTask']);
    Route::delete('/admin/tasks/{id}', [AdminController::class, 'destroyTask']);
    Route::put('/admin/users/{id}/role', [AdminController::class, 'updateUserRole']);
    Route::put('/admin/submissions/{id}/evaluate', [AdminController::class, 'submitReview']);
    Route::get('/student/dashboard', [AdminController::class, 'getStudentDashboard']);
    Route::get('/student/tasks/{id}', [AdminController::class, 'getTaskDetail']);
    Route::post('/student/tasks/{id}/submit', [AdminController::class, 'submitTask']);
    Route::get('/admin/submissions', [AdminController::class, 'getSubmissions']);
    Route::get('/student/mentorship', [AdminController::class, 'getMentorshipData']);
    Route::post('/student/mentorship', [AdminController::class, 'storeMentorshipSession']);
    
});
Route::get('/gas-import', function () {
    \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
    \Illuminate\Support\Facades\Schema::dropAllTables();
    \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

    $sql = file_get_contents(database_path('lab_bos.txt'));
    $sql = preg_replace('/\/\*!.*?\*\/;|START TRANSACTION;|COMMIT;|SET .*?;/s', '', $sql);
    \Illuminate\Support\Facades\DB::unprepared($sql);

    return response()->json(['status' => 'MANTAP, DATABASE MASUK SEMUA!']);
});