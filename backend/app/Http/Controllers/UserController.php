<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserController extends Controller
{

    // In UserController.php
        public function index()
        {
            try {
                $users = User::all(); // Make sure to import User model at the top
                return response()->json($users);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Failed to fetch users',
                    'message' => $e->getMessage()
                ], 500);
            }
        }
        public function store(Request $request)
        {
            try {
                $user = \App\Models\User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'age' => $request->age
                ]);
                return response()->json($user, 201);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }
        public function update_user(Request $request, $id)
        {
            try {
                $user = User::findOrFail($id);
                $user->update( [
                    'name' => $request->name,
                    'email' => $request->email,
                    'age' => $request->age
                ]);
                return response()->json($user, 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'User not found or update failed', 'message' => $e->getMessage()], 404);
            }
        }

    
}