import { useState, useEffect } from "react";
import axios from "axios";
import {
  Clock,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Terminal,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGIKA STATUS MENTOR (Berdasarkan Waktu Nyata)
  const [isMentorAvailable, setIsMentorAvailable] = useState(false);

  useEffect(() => {
    // Cek jam kerja: Senin(1) - Jumat(5), Jam 08.00 - 16.00
    const checkAvailability = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      setIsMentorAvailable(day >= 1 && day <= 5 && hour >= 8 && hour < 16);
    };

    checkAvailability();
    // Update status setiap menit
    const timer = setInterval(checkAvailability, 60000);

    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(
          "https://oj-smkn-2-magelang-production.up.railway.app/api/student/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.data.success) {
          setDashboardData(response.data.data);
        }
      } catch (err) {
        console.error("Gagal memuat dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();

    return () => clearInterval(timer);
  }, []);

  // FUNGSI HITUNG SISA WAKTU DINAMIS
  const getRemainingTimeText = (deadline) => {
    if (!deadline) return "7 Hari Lagi";
    const diff = new Date(deadline) - new Date();
    if (diff <= 0) return "Tenggat Habis";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    if (days > 0) return `${days} Hari Lagi`;
    return `${hours} Jam Lagi`;
  };

  if (loading)
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-400 p-8 flex justify-center items-center">
        Menyiapkan ruang kerja...
      </div>
    );
  if (!dashboardData)
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-400 p-8 flex justify-center items-center">
        Gagal memuat data.
      </div>
    );

  const { user, modules, submissions, mentor } = dashboardData;

  let activeModule = null;
  let activeTask = null;

  for (const mod of modules) {
    if (mod.tasks && mod.tasks.length > 0) {
      for (const task of mod.tasks) {
        const isSubmitted = submissions.find((s) => s.task_id === task.id);
        if (!isSubmitted) {
          activeModule = mod;
          activeTask = task;
          break;
        }
      }
      if (activeTask) break;
    }
  }

  const verifiedSubs = submissions.filter((s) => s.status === "verified");
  const avgScore =
    verifiedSubs.length > 0
      ? (
          verifiedSubs.reduce(
            (acc, curr) => acc + parseFloat(curr.final_score),
            0,
          ) / verifiedSubs.length
        ).toFixed(1)
      : 0;
  const totalTasksInTrack = modules.reduce(
    (total, mod) => total + (mod.tasks ? mod.tasks.length : 0),
    0,
  );
  const totalCompletedTasks = submissions.length;
  const progressPercentage =
    totalTasksInTrack > 0
      ? Math.round((totalCompletedTasks / totalTasksInTrack) * 100)
      : 0;
  const totalUnitTestsOk = submissions.reduce(
    (acc, curr) => acc + (curr.unit_test_score || 0),
    0,
  );

  // DATA MENTOR DINAMIS
  const mentorName = mentor?.name || "Belum ditugaskan";
  const mentorInitials = mentor?.name
    ? mentor.name.substring(0, 2).toUpperCase()
    : "NA";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-300 font-sans pb-20">
      <div className="max-w-[1200px] mx-auto px-6 pt-8">
        {/* WELCOME BANNER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="text-[10px] text-emerald-400 mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>{" "}
              Lab RPL 2 • Online • Sesi Siang
            </div>
            <h1 className="text-4xl font-bold text-zinc-100 mb-2">
              Halo, {user.name.split(" ")[0]}! ✨
            </h1>
            <p className="text-sm text-zinc-400">
              {activeTask
                ? "Siap ngoding santai hari ini? Ada tugas menunggumu."
                : "Hebat! Semua tugas yang tersedia sudah kamu selesaikan."}
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-[#121214] border border-zinc-800 rounded-xl p-3 flex items-center gap-3">
              <div className="p-2 bg-zinc-800/50 rounded-lg text-zinc-400">
                <BookOpen size={16} />
              </div>
              <div>
                <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                  Modul Diselesaikan
                </div>
                <div className="text-sm font-bold text-zinc-200">
                  {
                    [...new Set(submissions.map((s) => s.task?.module_id))]
                      .length
                  }{" "}
                  / {modules.length}
                </div>
              </div>
            </div>
            <div className="bg-[#121214] border border-zinc-800 rounded-xl p-3 flex items-center gap-3">
              <div className="p-2 bg-zinc-800/50 rounded-lg text-zinc-400">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                  Rata-Rata Nilai
                </div>
                <div className="text-sm font-bold text-zinc-200">
                  {avgScore}{" "}
                  <span className="text-[10px] text-zinc-500 font-normal">
                    / 100
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* KIRI: AREA TUGAS UTAMA */}
          <div className="lg:col-span-8 space-y-6">
            {activeTask && activeModule && (
              <div className="grid grid-cols-3 gap-4">
                {/* KARTU 1: MODUL AKTIF */}
                <div className="bg-[#121214] border border-zinc-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="text-[9px] text-emerald-400 font-bold tracking-wider mb-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{" "}
                    MODUL AKTIF
                  </div>
                  <div className="text-sm font-bold text-zinc-200 truncate">
                    {activeModule.title}
                  </div>
                  <div className="text-[10px] text-zinc-500 flex justify-between items-center mt-3">
                    Pekan {activeModule.week_number} <ChevronRight size={12} />
                  </div>
                </div>

                {/* KARTU 2: STATUS TUGAS (Dinamis & Bisa Diklik) */}
                <Link
                  to={`/task/${activeTask.id}`}
                  className="bg-[#121214] border border-zinc-800 hover:border-amber-500/40 rounded-xl p-4 flex flex-col justify-between transition-colors group"
                >
                  <div className="text-[9px] text-amber-400 font-bold tracking-wider mb-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>{" "}
                    STATUS TUGAS
                  </div>
                  <div className="text-sm font-bold text-zinc-200">
                    {totalTasksInTrack - totalCompletedTasks} Tugas Tersisa
                  </div>
                  <div className="text-[10px] text-zinc-500 group-hover:text-amber-400 flex justify-between items-center mt-3 transition-colors">
                    Buka Editor <MessageSquare size={12} />
                  </div>
                </Link>

                {/* KARTU 3: WAKTU TERSISA (Dinamis dari Deadline) */}
                <div className="bg-[#121214] border border-rose-900/30 rounded-xl p-4 flex flex-col justify-between">
                  <div className="text-[9px] text-rose-400 font-bold tracking-wider mb-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>{" "}
                    WAKTU TERSISA
                  </div>
                  <div className="text-lg font-bold text-zinc-100">
                    {getRemainingTimeText(activeTask.deadline)}
                  </div>
                  <div className="text-[10px] text-zinc-500 flex justify-between items-center mt-3">
                    Tenggat Praktikum <Clock size={12} />
                  </div>
                </div>
              </div>
            )}

            {/* Panel Tugas Aktif */}
            <div className="bg-[#121214] border border-indigo-500/20 rounded-xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.03)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>

              {activeTask ? (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                        Tugas Berikutnya{" "}
                        <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 capitalize">
                          {user.track?.name || "Umum"}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-zinc-100">
                        {activeTask.title}
                      </h2>
                    </div>
                  </div>

                  <div className="bg-[#09090b] border border-zinc-800 rounded-lg p-4 mb-6">
                    <p className="text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed">
                      {activeTask.study_case_html}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Link
                      to={`/task/${activeTask.id}`}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/20"
                    >
                      Mulai Kerjakan <ChevronRight size={14} />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center text-zinc-600 mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-200 mb-2">
                    Hore! Kamu sudah bebas tugas.
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Tunggu gurumu menerbitkan modul dan tugas baru ya.
                  </p>
                </div>
              )}
            </div>

            {/* Riwayat Selesai */}
            <div>
              <h3 className="text-sm font-bold text-zinc-200 mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> Riwayat
                Tugas Selesai
              </h3>
              {submissions.length === 0 ? (
                <div className="bg-[#121214] border border-zinc-800 border-dashed rounded-xl p-8 text-center text-xs text-zinc-500">
                  Kamu belum mengirimkan tugas apa pun.
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-[#121214] border border-zinc-800 rounded-xl p-4 flex justify-between items-center group hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
                          <Terminal size={16} />
                        </div>
                        <div>
                          <div className="text-[10px] text-zinc-500 mb-0.5">
                            {sub.task?.module?.title || "Modul Praktikum"}
                          </div>
                          <div className="text-sm font-bold text-zinc-200">
                            {sub.task?.title || "Tugas"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div
                            className={`text-sm font-bold ${sub.status === "verified" ? "text-emerald-400" : "text-amber-400"}`}
                          >
                            {sub.status === "verified"
                              ? `⭐ ${sub.final_score}`
                              : "Menunggu Nilai"}
                          </div>
                        </div>
                        <button className="text-[10px] font-bold text-zinc-400 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded transition-colors cursor-pointer">
                          Lihat Detail ➔
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* KANAN: SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            {/* Mentor Info */}
            <div className="bg-[#121214] border border-zinc-800 rounded-xl p-5">
              <h3 className="text-xs font-bold text-zinc-300 mb-4 flex justify-between items-center">
                Tanya Mentor
                {isMentorAvailable ? (
                  <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[9px] border border-emerald-500/20">
                    Tersedia
                  </span>
                ) : (
                  <span className="bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded text-[9px] border border-rose-500/20">
                    Offline
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${mentor ? "bg-indigo-900 text-indigo-300" : "bg-zinc-800 text-zinc-500"}`}
                >
                  {mentorInitials}
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-200">
                    {mentorName}
                  </div>
                  <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                    <Clock size={10} /> Senin - Jumat • 08.00 - 16.00
                  </div>
                </div>
              </div>
              <button
                disabled={!isMentorAvailable}
                className={`w-full text-xs font-bold py-2.5 rounded-lg transition-colors ${isMentorAvailable ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer" : "bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800"}`}
              >
                📅 Reservasi Meja Praktikum
              </button>
            </div>

            {/* Statistik */}
            <div className="bg-[#121214] border border-zinc-800 rounded-xl p-5">
              <h3 className="text-xs font-bold text-zinc-300 mb-4 flex justify-between items-center">
                Pencapaian Belajarmu{" "}
                <span className="text-[9px] text-zinc-500">Semester Ini</span>
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="text-zinc-800"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-indigo-500"
                      strokeWidth="3"
                      strokeDasharray={`${progressPercentage}, 100`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-200">
                    {totalCompletedTasks} dari {totalTasksInTrack} Tugas Tuntas!
                  </div>
                  <div className="text-[9px] text-zinc-500 mt-0.5">
                    {progressPercentage === 100
                      ? "Luar biasa, semuanya selesai!"
                      : "Ayo selesaikan sisa tugasmu."}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center border-t border-zinc-800 pt-4">
                <div>
                  <div className="text-lg font-bold text-zinc-200">
                    {totalUnitTestsOk}
                  </div>
                  <div className="text-[8px] font-bold text-zinc-500 uppercase">
                    Unit Test OK
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-indigo-400">
                    {avgScore}
                  </div>
                  <div className="text-[8px] font-bold text-zinc-500 uppercase">
                    Rerata Skor
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-400">
                    {progressPercentage}%
                  </div>
                  <div className="text-[8px] font-bold text-emerald-500 uppercase">
                    Progress
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}