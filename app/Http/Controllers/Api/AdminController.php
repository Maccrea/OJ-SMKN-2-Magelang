<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getUsers()
    {
        // Mengambil semua user beserta data track (spesialisasi) mereka
        $users = User::with('track')->get();
        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }
}