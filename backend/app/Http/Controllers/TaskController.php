<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    
     
    public function index()
    {
        try {
            $users = Task::all();
            return response()->json($users);
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch tasks',
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
                'priority' => 'required|string|max:255',
                'status' => 'required|string|max:255',
                'due_date' => 'required|date',

            ]);

            $user = Task::create([
                'name' => $request->name,
                'priority' => $request->priority,
                'status' => $request->status,
                'due_date' => $request->due_date,
                

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
