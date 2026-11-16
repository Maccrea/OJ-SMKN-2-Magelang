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
        // Tangkap data, kalau kosong PAKSA jadi angka 1 (Frontend UI)
        $role = $request->input('role', 'siswa');
        $trackId = $request->input('track_id');
        $finalTrackId = empty($trackId) ? 1 : (int) $trackId; 
        
        // Tembak langsung ke MySQL tanpa ampun
        \Illuminate\Support\Facades\DB::table('users')
            ->where('id', $id)
            ->update([
                'role' => $role,
                'track_id' => $finalTrackId
            ]);
        
        // Kirim balik laporan persis apa yang disimpan
        return response()->json([
            'success' => true, 
            'message' => "SUKSES! Data ditembak: Role = $role, Track ID = $finalTrackId"
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

    // --- API UNTUK DASHBOARD SISWA ---
    public function getStudentDashboard(Request $request)
    {
        $user = $request->user();

        $modules = \App\Models\Module::with('tasks')
            ->where('track_id', $user->track_id)
            ->orderBy('week_number', 'asc')
            ->get();

        $submissions = \App\Models\Submission::with('task.module')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        $mentor = \App\Models\User::whereIn('role', ['guru', 'admin'])
            ->where('track_id', $user->track_id)
            ->first();

        if (!$mentor) {
            $mentor = \App\Models\User::whereIn('role', ['guru', 'admin'])->first();
        }

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'modules' => $modules,
                'submissions' => $submissions,
                'mentor' => $mentor // <-- Mengirim data mentor ke React
            ]
        ]);
    }

    public function getTaskDetail($id)
    {
        $task = \App\Models\Task::with('module')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $task
        ]);
    }

    // --- API UNTUK SISWA MENGIRIM JAWABAN TUGAS ---
    public function submitTask(Request $request, $id)
    {
        $request->validate([
            'code_snapshot' => 'required|string'
        ]);

        // Simpan jawaban, kalau sudah pernah ngerjain sebelumnya bakal di-update
        $submission = \App\Models\Submission::updateOrCreate(
            ['user_id' => $request->user()->id, 'task_id' => $id],
            [
                'code_snapshot' => $request->code_snapshot,
                'status' => 'submitted'
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Jawaban berhasil dikirim! Silakan tunggu review mentor.'
        ]);
    }

    // --- API BIMBINGAN MENTOR (SISWA) ---
    public function getMentorshipData(Request $request)
    {
        $user = $request->user();

        // Ambil daftar mentor (admin / guru) dari database
        $mentors = \App\Models\User::whereIn('role', ['admin', 'guru'])->get();

        // Ambil riwayat & jadwal bimbingan siswa ini
        $sessions = \App\Models\MentorshipSession::with('mentor')
            ->where('student_id', $user->id)
            ->orderBy('session_date', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'mentors' => $mentors,
                'sessions' => $sessions
            ]
        ]);
    }

    public function storeMentorshipSession(Request $request)
    {
        $validated = $request->validate([
            'mentor_id' => 'required|exists:users,id',
            'session_date' => 'required|date',
            'time_slot' => 'required|string',
            'location_type' => 'required|string',
            'topic' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $validated['student_id'] = $request->user()->id;
        $validated['status'] = 'scheduled';

        $session = \App\Models\MentorshipSession::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Jadwal bimbingan berhasil dikonfirmasi!',
            'data' => $session
        ]);
    }
}