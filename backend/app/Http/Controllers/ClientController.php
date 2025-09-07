<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    
    //   Get all users
     
    public function index()
    {
        try {
            $Clients = Client::all();
            // dd($users);  
            return response()->json($Clients);
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch clients',
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
                'phone' => 'required|integer|min:0',
                'role_name' => 'required|string|max:255',
                'role_id' => 'required|integer|min:0',
                'city' => 'required|string|max:255',
                'state' => 'required|string|max:255',
                'postal_code' => 'required|int|min:0',
                'country' => 'required|string|max:255'
            ]);

            $client = Client::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'role_name' => $request->role_name,
                'role_id' => $request->role_id,
                'city' => $request->city,
                'state' => $request->state,
                'postal_code' => $request->postal_code,
                'country' => $request->country
            ]);

            return response()->json($client, 201);

        } catch (\Illuminate\Validation\ValidationException $ve) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $ve->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to add client',
                'message' => $e->getMessage()
            ], 500); 
        }
    }
}
