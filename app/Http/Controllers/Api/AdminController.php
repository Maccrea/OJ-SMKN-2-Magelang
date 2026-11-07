<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Module;
use App\Models\Submission;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // 1. Fungsi untuk halaman Kelola User
    public function getUsers()
    {
        $users = User::with('track')->get();
        
        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    // 2. Fungsi untuk halaman Beranda (Modul Praktikum)
    public function getModules()
    {
        // Mengambil modul beserta tugas-tugas di dalamnya
        $modules = Module::with('tasks')->orderBy('week_number', 'asc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $modules
        ]);
    }

    // 3. Fungsi untuk halaman Review Jawaban Siswa
    public function getSubmissions()
    {
        // Mengambil data jawaban siswa beserta relasi user (dan track-nya) serta task (dan module-nya)
        $submissions = Submission::with(['user.track', 'task.module'])->get();
        
        return response()->json([
            'success' => true,
            'data' => $submissions
        ]);
    }

    // Fungsi untuk menyimpan modul baru dari form React
    public function storeModule(Request $request)
    {
        // Validasi input dari React
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'week_number' => 'required|integer',
            'track_id' => 'required|integer',
            'description' => 'nullable|string'
        ]);

        // Simpan ke database (tabel modules)
        $module = Module::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Modul berhasil dibuat!',
            'data' => $module
        ]);
    }
}