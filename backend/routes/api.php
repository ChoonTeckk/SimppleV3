<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Models\User;
use App\Http\Controllers\UserController;



// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });



Route::get('/users', [UserController::class, 'index']);        // Get all users
Route::post('/users', [UserController::class, 'store']);      // Create a new user
// Route::get('/users/{id}', [UserController::class, 'show']);   // Get a single user
// Route::put('/users/{id}', [UserController::class, 'update']); // Update a user
// Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete a user