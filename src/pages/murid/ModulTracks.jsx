import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ChevronRight,
  Terminal,
  Search,
  Filter,
  AlertCircle,
  Award,
  Layers,
} from "lucide-react";

export default function ModulTracks() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all | pending | submitted | verified

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(
          "http://localhost:8000/api/student/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.success) {
          setData(response.data.data);
        }
      } catch (err) {
        console.error("Gagal memuat daftar tugas praktikum:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getDeadlineBadge = (deadline) => {
    if (!deadline) return { text: "Tanpa Tenggat", urgent: false };
    const diff = new Date(deadline) - new Date();
    if (diff <= 0) return { text: "Tenggat Habis", urgent: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    if (days > 2) return { text: `${days} Hari Lagi`, urgent: false };
    if (days > 0) return { text: `${days} Hari ${hours} Jam`, urgent: true };
    return { text: `${hours} Jam Lagi`, urgent: true };
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-400 p-8 flex justify-center items-center">
        Memuat katalog modul & tugas praktikum...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-400 p-8 flex justify-center items-center">
        Gagal mengambil data dari server.
      </div>
    );
  }

  const { user, modules, submissions } = data;

  // Hitung ringkasan statistik dari database
  const allTasks = modules.flatMap((m) => m.tasks || []);
  const totalTasks = allTasks.length;
  const verifiedCount = submissions.filter((s) => s.status === "verified").length;
  const submittedCount = submissions.filter((s) => s.status === "submitted").length;
  const pendingCount = totalTasks - submissions.length;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-300 font-sans pb-20">
      <div className="max-w-[1200px] mx-auto px-6 pt-8">
        {/* HEADER HALAMAN */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Layers size={12} /> Kurikulum Praktikum •{" "}
              <span className="bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded text-indigo-300">
                {user.track?.name || "Umum"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-zinc-100 mb-1">
              Daftar Modul & Tugas Praktikum
            </h1>
            <p className="text-xs text-zinc-400">
              Pilih tugas di bawah ini untuk membuka editor kode, membaca studi kasus, atau mengecek hasil evaluasi mentor.
            </p>
          </div>

          {/* RINGKASAN MINI */}
          <div className="flex gap-3">
            <div className="bg-[#121214] border border-zinc-800 rounded-xl px-4 py-2.5 text-center">
              <div className="text-lg font-bold text-amber-400">{pendingCount}</div>
              <div className="text-[9px] text-zinc-500 font-bold uppercase">Belum Selesai</div>
            </div>
            <div className="bg-[#121214] border border-zinc-800 rounded-xl px-4 py-2.5 text-center">
              <div className="text-lg font-bold text-indigo-400">{submittedCount}</div>
              <div className="text-[9px] text-zinc-500 font-bold uppercase">Menunggu Nilai</div>
            </div>
            <div className="bg-[#121214] border border-zinc-800 rounded-xl px-4 py-2.5 text-center">
              <div className="text-lg font-bold text-emerald-400">{verifiedCount}</div>
              <div className="text-[9px] text-zinc-500 font-bold uppercase">Tuntas</div>
            </div>
          </div>
        </div>

        {/* FILTER & PENCARIAN */}
        <div className="bg-[#121214] border border-zinc-800 rounded-xl p-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              placeholder="Cari judul tugas atau modul..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#09090b] border border-zinc-800 focus:border-indigo-500 rounded-lg pl-9 pr-4 py-2 text-xs text-zinc-200 outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <Filter size={13} className="text-zinc-500 mr-1 shrink-0" />
            {[
              { id: "all", label: `Semua (${totalTasks})` },
              { id: "pending", label: `Belum Dikerjakan (${pendingCount})` },
              { id: "submitted", label: `Menunggu Review (${submittedCount})` },
              { id: "verified", label: `Selesai (${verifiedCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  filterStatus === tab.id
                    ? "bg-indigo-600 text-white"
                    : "bg-[#09090b] text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* DAFTAR MODUL & TUGAS DARI DATABASE */}
        {modules.length === 0 ? (
          <div className="bg-[#121214] border border-zinc-800 border-dashed rounded-xl p-12 text-center">
            <BookOpen size={32} className="text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-zinc-200 mb-1">
              Belum Ada Modul di Spesialisasi Ini
            </h3>
            <p className="text-xs text-zinc-500">
              Admin/Mentor belum menerbitkan modul praktikum untuk track{" "}
              <span className="text-zinc-300 font-semibold">
                {user.track?.name || "kamu"}
              </span>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {modules.map((mod) => {
              // Filter tugas berdasarkan pencarian dan status tab
              const filteredTasks = (mod.tasks || []).filter((task) => {
                const sub = submissions.find((s) => s.task_id === task.id);
                const status = sub ? sub.status : "pending";

                const matchesSearch =
                  task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  mod.title.toLowerCase().includes(searchQuery.toLowerCase());

                const matchesFilter =
                  filterStatus === "all" || filterStatus === status;

                return matchesSearch && matchesFilter;
              });

              if (filteredTasks.length === 0) return null;

              return (
                <div
                  key={mod.id}
                  className="bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden"
                >
                  {/* HEADER MODUL */}
                  <div className="bg-[#161619] border-b border-zinc-800 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded">
                          PEKAN {mod.week_number}
                        </span>
                        <span className="text-[11px] text-zinc-500">
                          {mod.tasks?.length || 0} Tugas Praktikum
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-zinc-100">
                        {mod.title}
                      </h2>
                      {mod.description && (
                        <p className="text-xs text-zinc-400 mt-1">
                          {mod.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* LIST TUGAS DALAM MODUL */}
                  <div className="divide-y divide-zinc-800/80">
                    {filteredTasks.map((task, idx) => {
                      const sub = submissions.find((s) => s.task_id === task.id);
                      const deadlineInfo = getDeadlineBadge(task.deadline);

                      return (
                        <div
                          key={task.id}
                          className="p-5 hover:bg-zinc-900/40 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                                sub?.status === "verified"
                                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                  : sub?.status === "submitted"
                                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                  : "bg-zinc-800/70 border-zinc-700 text-zinc-400"
                              }`}
                            >
                              <Terminal size={18} />
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="text-[10px] font-mono text-zinc-500">
                                  #{idx + 1}
                                </span>
                                <h3 className="text-sm font-bold text-zinc-100">
                                  {task.title}
                                </h3>

                                {/* BADGE STATUS */}
                                {sub?.status === "verified" ? (
                                  <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded">
                                    <Award size={10} /> Nilai: {sub.final_score}
                                  </span>
                                ) : sub?.status === "submitted" ? (
                                  <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded">
                                    <Clock size={10} /> Menunggu Review
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-400 text-[10px] font-bold px-2 py-0.5 rounded">
                                    <AlertCircle size={10} /> Belum Dikerjakan
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-zinc-400 line-clamp-2 max-w-2xl mb-2">
                                {task.study_case_html}
                              </p>

                              {/* CATATAN MENTOR JIKA SUDAH DINILAI */}
                              {sub?.mentor_feedback && (
                                <div className="bg-[#09090b] border border-zinc-800 rounded-lg px-3 py-2 text-[11px] text-zinc-400 mt-2 max-w-2xl">
                                  <span className="text-indigo-400 font-bold">
                                    Catatan Mentor:
                                  </span>{" "}
                                  {sub.mentor_feedback}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* AKSI & TENGGAT */}
                          <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                            {!sub && (
                              <div
                                className={`text-[11px] font-medium flex items-center gap-1 ${
                                  deadlineInfo.urgent
                                    ? "text-rose-400"
                                    : "text-zinc-500"
                                }`}
                              >
                                <Clock size={12} /> {deadlineInfo.text}
                              </div>
                            )}

                            <Link
                              to={`/task/${task.id}`}
                              className={`text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all ${
                                sub?.status === "verified"
                                  ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                                  : sub?.status === "submitted"
                                  ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                              }`}
                            >
                              {sub?.status === "verified"
                                ? "Lihat Tugas"
                                : sub?.status === "submitted"
                                ? "Edit Jawaban"
                                : "Kerjakan"}
                              <ChevronRight size={14} />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}