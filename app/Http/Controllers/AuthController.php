<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate(['email' => 'required', 'password' => 'required|string']);

        $user = User::where('email', $request->email)->first();

        if (!$user || !password_verify($request->password, $user->password)) {
            return response(['message' => 'Bad credentials'], 401);
        }

        $token = $user->createToken('token')->plainTextToken;

        return response(['user' => $user, 'token' => $token], 201);
    }

    public function register(Request $request){
        $request->validate(['name' => 'required','email' => 'required', 'phone' => 'required','password' => 'required']);

        User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'password'=>Hash::make($request->password),
        ]);

        return response(['success' => 'user register successfully'], 200);
    }


    public function logout()
    {
      
        Auth::user()->currentAccessToken()->delete();

        return response(['message' => 'logout successfully']);
    }
}
