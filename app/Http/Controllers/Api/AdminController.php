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

    public function storeTask(Request $request, $id)
    {
        // Validasi input dari React
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'study_case_html' => 'required|string',
        ]);

        // Karena di UI React kita belum bikin input kalender untuk deadline,
        // kita set default deadline otomatis 7 hari dari waktu tugas dibuat.
        $validated['module_id'] = $id;
        $validated['deadline'] = now()->addDays(7); 

        // Simpan ke database
        $task = \App\Models\Task::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Tugas berhasil ditambahkan ke modul!',
            'data' => $task
        ]);
    }

    // --- FITUR UPDATE & DELETE MODUL ---
    public function updateModule(Request $request, $id)
    {
        $module = \App\Models\Module::findOrFail($id);
        $module->update($request->all());
        return response()->json(['success' => true, 'message' => 'Modul diperbarui!']);
    }

    public function destroyModule($id)
    {
        \App\Models\Module::destroy($id);
        return response()->json(['success' => true, 'message' => 'Modul dihapus!']);
    }

    // --- FITUR UPDATE & DELETE TUGAS ---
    public function updateTask(Request $request, $id)
    {
        $task = \App\Models\Task::findOrFail($id);
        $task->update($request->all());
        return response()->json(['success' => true, 'message' => 'Tugas diperbarui!']);
    }

    public function destroyTask($id)
    {
        \App\Models\Task::destroy($id);
        return response()->json(['success' => true, 'message' => 'Tugas dihapus!']);
    }

    // --- FITUR UPDATE USER ROLE ---
    public function updateUserRole(Request $request, $id)
    {
        $user = \App\Models\User::findOrFail($id);
        $validated = $request->validate([
            'role' => 'required|in:siswa,guru,admin',
            'track_id' => 'nullable|integer|exists:tracks,id'
        ]);
        
        $user->update($validated);
        
        return response()->json([
            'success' => true, 
            'message' => 'Hak akses dan spesialisasi berhasil diperbarui!'
        ]);
    }

    public function submitReview(Request $request, $id)
    {
        $submission = \App\Models\Submission::findOrFail($id);
        
        $validated = $request->validate([
            'final_score' => 'required|numeric|min:0|max:100',
            'mentor_feedback' => 'nullable|string'
        ]);

        // Otomatis ubah status menjadi verified jika sudah dinilai
        $validated['status'] = 'verified';

        $submission->update($validated);

        return response()->json([
            'success' => true, 
            'message' => 'Evaluasi berhasil disimpan dan disahkan!'
        ]);
    }
}