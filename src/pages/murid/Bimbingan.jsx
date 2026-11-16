import { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  CheckCircle2,
  UserCheck,
  Sparkles,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

export default function Bimbingan() {
  const [mentors, setMentors] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // State Kalender Dinamis (Bulan Berjalan)
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // State Form Booking Sesi
  const [selectedMentor, setSelectedMentor] = useState("");
  const [timeSlot, setTimeSlot] = useState("13:30");
  const [locationType, setLocationType] = useState("offline");
  const [topic, setTopic] = useState("Review Logika Modul");
  const [notes, setNotes] = useState("");

  const timeSlots = [
    { time: "10:15", label: "Pagi • Sesi 1" },
    { time: "13:30", label: "Siang • Sesi 2" },
    { time: "14:15", label: "Siang • Sesi 3" },
    { time: "15:00", label: "Sore • Sesi 4" },
  ];

  const topics = [
    "Review Logika Modul",
    "Pendalaman Tanya Jawab",
    "Kendala Bug / Error",
    "Diskusi PKL & Karier",
    "Refactoring Clean Code",
  ];

  const fetchMentorship = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.get(
        "https://oj-smkn-2-magelang-production.up.railway.app/api/student/mentorship",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        const fetchedMentors = response.data.data.mentors || [];
        setMentors(fetchedMentors);
        setSessions(response.data.data.sessions || []);
        if (fetchedMentors.length > 0 && !selectedMentor) {
          setSelectedMentor(fetchedMentors[0].id);
        }
      }
    } catch (err) {
      console.error("Gagal memuat data bimbingan:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentorship();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedMentor) {
      alert("Pilih mentor terlebih dahulu!");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.post(
        "https://oj-smkn-2-magelang-production.up.railway.app/api/student/mentorship",
        {
          mentor_id: selectedMentor,
          session_date: selectedDate,
          time_slot: timeSlot,
          location_type: locationType,
          topic: topic,
          notes: notes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        setNotes("");
        fetchMentorship(); // Refresh jadwal dari database
      }
    } catch (err) {
      alert(
        "Gagal membuat jadwal: " +
          (err.response?.data?.message || "Periksa koneksi atau tabel database.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Helper Generate Hari Kalender
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  const upcomingSessions = sessions.filter((s) => s.status === "scheduled");
  const completedSessions = sessions.filter((s) => s.status === "completed");

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-400 p-8 flex justify-center items-center">
        Menyiapkan ruang bimbingan...
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-zinc-300 font-sans pb-20">
      <div className="max-w-[1200px] mx-auto px-6 pt-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Lab RPL Unit 2 • Konsultasi Tatap Muka & Online
            </div>
            <h1 className="text-3xl font-bold text-zinc-100 mb-1">
              Ruang Bimbingan & Meja Konsultasi ✨
            </h1>
            <p className="text-xs text-zinc-400">
              Pilih jadwal diskusi santai di Meja Konsultasi Lab RPL atau online voice untuk bedah kode, tanya jawab logika algoritma, dan curhat seputar industri software.
            </p>
          </div>

          <div className="bg-[#121214] border border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <UserCheck size={18} />
            </div>
            <div>
              <div className="text-[9px] text-zinc-500 font-bold uppercase">
                Total Sesi Bimbingan
              </div>
              <div className="text-sm font-bold text-zinc-100">
                {sessions.length} Sesi Terdaftar
              </div>
            </div>
          </div>
        </div>

        {/* GRID UTAMA: KALENDER + MENTOR STANDBY (KIRI) & FORM BOOKING (KANAN) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* KOLOM KIRI (5 KOLOM) */}
          <div className="lg:col-span-5 space-y-6">
            {/* KALENDER */}
            <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <CalendarIcon size={15} className="text-indigo-400" />
                  {monthNames[month]} {year}
                </h2>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                    className="p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-zinc-400 cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                    className="p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-zinc-400 cursor-pointer"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-zinc-500 mb-2">
                <div>Min</div>
                <div>Sen</div>
                <div>Sel</div>
                <div>Rab</div>
                <div>Kam</div>
                <div>Jum</div>
                <div>Sab</div>
              </div>

              <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-2"></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const dateStr = `${year}-${String(month + 1).padStart(
                    2,
                    "0"
                  )}-${String(dayNum).padStart(2, "0")}`;
                  const isSelected = selectedDate === dateStr;
                  const hasSession = sessions.some(
                    (s) => s.session_date === dateStr
                  );

                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => setSelectedDate(dateStr)}
                      className={`p-2 rounded-lg font-bold transition-all relative cursor-pointer ${
                        isSelected
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                          : "bg-[#09090b] hover:bg-zinc-800 text-zinc-300 border border-zinc-800/60"
                      }`}
                    >
                      {dayNum}
                      {hasSession && (
                        <span className="w-1 h-1 rounded-full bg-emerald-400 absolute bottom-1 left-1/2 -translate-x-1/2"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MENTOR STANDBY */}
            <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Mentor Standby Lab RPL
                </h3>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                  {mentors.length} Aktif
                </span>
              </div>

              <div className="space-y-3">
                {mentors.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMentor(m.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      Number(selectedMentor) === Number(m.id)
                        ? "bg-indigo-500/10 border-indigo-500/40"
                        : "bg-[#09090b] border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-900/60 text-indigo-300 flex items-center justify-center font-bold text-xs uppercase">
                        {m.name.substring(0, 2)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-100">
                          {m.name}
                        </div>
                        <div className="text-[10px] text-zinc-500 capitalize">
                          {m.role} • {m.track?.name || "Fullstack & RPL"}
                        </div>
                      </div>
                    </div>
                    {Number(selectedMentor) === Number(m.id) && (
                      <CheckCircle2 size={16} className="text-indigo-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: FORMULIR BOOKING SESI (7 KOLOM) */}
          <form
            onSubmit={handleBooking}
            className="lg:col-span-7 bg-[#121214] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                    <Sparkles size={16} className="text-indigo-400" /> Formulir
                    Booking Sesi
                  </h2>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Tanggal dipilih:{" "}
                    <span className="text-zinc-200 font-bold">
                      {selectedDate}
                    </span>
                  </p>
                </div>
              </div>

              {/* 1. PILIH JAM SESI DISKUSI */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                  1. Pilih Jam Sesi Diskusi
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setTimeSlot(slot.time)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        timeSlot === slot.time
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                          : "bg-[#09090b] border-zinc-800 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      <div className="text-sm font-bold font-mono">
                        {slot.time}
                      </div>
                      <div
                        className={`text-[9px] mt-0.5 ${
                          timeSlot === slot.time
                            ? "text-indigo-200"
                            : "text-zinc-500"
                        }`}
                      >
                        {slot.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. METODE PERTEMUAN */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                  2. Metode Pertemuan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLocationType("offline")}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      locationType === "offline"
                        ? "bg-indigo-500/10 border-indigo-500/50 text-zinc-100"
                        : "bg-[#09090b] border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <MapPin
                      size={18}
                      className={
                        locationType === "offline"
                          ? "text-indigo-400"
                          : "text-zinc-500"
                      }
                    />
                    <div>
                      <div className="text-xs font-bold">
                        Tatap Muka di Lab RPL 2
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        Meja Konsultasi #1 (Fisik)
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationType("online")}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      locationType === "online"
                        ? "bg-indigo-500/10 border-indigo-500/50 text-zinc-100"
                        : "bg-[#09090b] border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <Video
                      size={18}
                      className={
                        locationType === "online"
                          ? "text-indigo-400"
                          : "text-zinc-500"
                      }
                    />
                    <div>
                      <div className="text-xs font-bold">
                        Online Discord / Meet
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        Channel #bimbingan-voice-1
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* 3. FOKUS MATERI & DISKUSI */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                  3. Fokus Materi & Diskusi
                </label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                        topic === t
                          ? "bg-indigo-600 border-indigo-500 text-white"
                          : "bg-[#09090b] border-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. CATATAN SINGKAT UNTUK MENTOR */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  4. Catatan Singkat untuk Mentor (Opsional)
                </label>
                <textarea
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Pak/Kak, saya bingung bagian query relasi Eloquent atau error CORS saat fetch API..."
                  className="w-full bg-[#09090b] border border-zinc-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-zinc-200 outline-none resize-none"
                ></textarea>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
              >
                {submitting
                  ? "Menyimpan Jadwal..."
                  : "Konfirmasi Jadwal Bimbingan ➔"}
              </button>
            </div>
          </form>
        </div>

        {/* BAGIAN BAWAH: BIMBINGAN MENDATANG & CATATAN REFLEKSI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* BIMBINGAN MENDATANG */}
          <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Bimbingan Mendatang</span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded">
                {upcomingSessions.length} Jadwal
              </span>
            </h3>

            {upcomingSessions.length === 0 ? (
              <div className="bg-[#09090b] border border-zinc-800 border-dashed rounded-xl p-6 text-center text-xs text-zinc-500">
                Belum ada jadwal bimbingan mendatang. Silakan booking lewat form di atas.
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingSessions.map((ses) => (
                  <div
                    key={ses.id}
                    className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 flex justify-between items-center"
                  >
                    <div>
                      <div className="text-xs font-bold text-zinc-100">
                        {ses.topic}
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">
                        Mentor: {ses.mentor?.name || "Mentor Lab"}
                      </div>
                      <div className="text-[10px] text-zinc-500 flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1">
                          <CalendarIcon size={11} /> {ses.session_date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {ses.time_slot} WIB
                        </span>
                        <span className="uppercase text-indigo-400 font-bold">
                          • {ses.location_type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CATATAN REFLEKSI SESI TERAKHIR */}
          <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Catatan Refleksi Sesi Terakhir</span>
              <div className="flex text-amber-400 gap-0.5">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
              </div>
            </h3>

            {completedSessions.length === 0 ? (
              <div className="bg-[#09090b] border border-zinc-800 border-dashed rounded-xl p-6 text-center text-xs text-zinc-500">
                Catatan evaluasi dari mentor akan muncul di sini setelah sesi bimbingan selesai dilaksanakan.
              </div>
            ) : (
              <div className="space-y-3">
                {completedSessions.map((ses) => (
                  <div
                    key={ses.id}
                    className="bg-[#09090b] border border-zinc-800 rounded-xl p-4"
                  >
                    <div className="text-[10px] text-zinc-500 mb-1">
                      Sesi {ses.session_date} • {ses.mentor?.name}
                    </div>
                    <p className="text-xs text-zinc-300 italic">
                      "{ses.mentor_reflection || "Sesi diskusi berjalan lancar."}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}