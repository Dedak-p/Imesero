<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {
    public function register(Request $request) {
        $request->validate([
           'name' => 'required|string|max:255',
           'email' => 'required|string|email|max:255|unique:users',
           'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
           'name' => $request->name,
           'email' => $request->email,
           'password' => bcrypt($request->password),
        ]);

        // Optionally, you can create a token for the user
        $token = $user->createToken($request->name)->plainTextToken;


        return response()->json([
                 'message' => 'User registered successfully',
                 'user' => $user,
                 'token' => $token,
        ], 201);
    }

    public function login(Request $request) {
        $request->validate([
           'email' => 'required|email|exists:users',
           'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Optionally, you can create a token for the user
        $token = $user->createToken($user->name)->plainTextToken;

        return response()->json([
                 'message' => 'User logged in successfully',
                 'user' => $user,
                 'token' => $token,
        ], 200);
    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'User logged out successfully'], 200);
    }
}
