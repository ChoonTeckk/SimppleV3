<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    
    //   Get all users
     
    public function index()
    {
        try {
            $users = User::all();
            // dd($users);
            return response()->json($users);
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch users',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Add a new user.
     */
    public function store(Request $request)
    {
        try {
            // Validate incoming request
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'age' => 'required|integer|min:0'
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'age' => $request->age
            ]);

            return response()->json($user, 201);

        } catch (\Illuminate\Validation\ValidationException $ve) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $ve->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to add user',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
