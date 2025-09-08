<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Models\User;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\TaskController;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });



Route::get('/users', [UserController::class, 'index']);        
Route::post('/users', [UserController::class, 'store']);      
Route::get('/clients', [ClientController::class, 'index']);      
Route::post('/clients', [ClientController::class, 'store']);     
Route::get('/tasks', [TaskController::class, 'index']);     
Route::post('/tasks', [TaskController::class, 'store']);     
// Route::get('/users/{id}', [UserController::class, 'show']);   // Get a single user
// Route::put('/users/{id}', [UserController::class, 'update']); // Update a user
// Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete a user