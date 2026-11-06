<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validasi input dari React
        $request->validate([
            'nisn' => 'required',
            'password' => 'required'
        ]);

        // Cek login menggunakan NISN
        if (Auth::attempt(['nisn' => $request->nisn, 'password' => $request->password])) {
            $user = Auth::user();
            
            // Buat token Sanctum
            $token = $user->createToken('auth_token')->plainTextToken;

            // Kembalikan response JSON ke React (termasuk role-nya)
            return response()->json([
                'success' => true,
                'message' => 'Login berhasil',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'name' => $user->name,
                    'nisn' => $user->nisn,
                    'role' => $user->role, // Penting untuk routing React (admin/siswa)
                ]
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'NISN atau password salah'
        ], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout berhasil']);
    }
}