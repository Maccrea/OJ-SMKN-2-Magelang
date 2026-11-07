<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\AdminController;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user-profile', function (Request $request) {
        return $request->user();
    });
    Route::get('/admin/users', [AdminController::class, 'getUsers']);
    Route::get('/admin/modules', [AdminController::class, 'getModules']);
    Route::post('/admin/modules', [AdminController::class, 'storeModule']);
});