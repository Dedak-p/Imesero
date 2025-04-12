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

    public function deleteUser(Request $request){
        $request->validate([
            'email' => 'required|string|email|max:255|exists:users,email',
        ]);

        //Buscar el usuario y eliminarlo
        $user = User::where('email',$request->email)->first();

        if($user){
            $user->delete();
            return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
        }
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    public function getAllUsers()
    {
        // Obtener todos los usuarios de la base de datos
        $users = User::all();

        // Devolver los usuarios en formato JSON
        return response()->json([
            'message' => 'Usuarios obtenidos correctamente',
            'users' => $users
        ], 200);  // 200 es el código de éxito
    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'User logged out successfully'], 200);
    }
}
