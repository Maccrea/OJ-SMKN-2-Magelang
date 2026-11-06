import { Link } from 'react-router-dom';
import { CheckCircle2, MessageSquare, Star, Clock, Laptop, PlayCircle, BookOpen, Terminal } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      
      {/* Hero Section */}
      <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 mb-6 flex justify-between items-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Lab RPL 2 • Online • Sesi Siang
          </div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-1 flex items-center gap-2">Halo, Ahmad! ✨</h1>
          <p className="text-sm text-zinc-400">Siap ngoding santai hari ini? 1 tugas aktif menunggu sentuhan logikamu.</p>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400"><BookOpen size={20} /></div>
            <div>
              <div className="text-[10px] text-zinc-500">TARGET MODUL</div>
              <div className="text-sm font-bold text-zinc-200">Modul 04 <span className="text-zinc-500 font-normal">/ 04</span></div>
            </div>
          </div>
          <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400"><CheckCircle2 size={20} /></div>
            <div>
              <div className="text-[10px] text-zinc-500">RATA-RATA NILAI</div>
              <div className="text-sm font-bold text-zinc-200">91.6 <span className="text-zinc-500 font-normal">/ 100</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Task Active & History) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 3 Status Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#121214] border border-zinc-800 rounded-xl p-4">
              <div className="text-[10px] text-emerald-400 mb-1 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> MODUL AKTIF</div>
              <div className="font-bold text-zinc-200 text-sm truncate">Filter Data Kantin</div>
              <div className="text-xs text-zinc-500 mt-1 flex justify-between items-center">
                <span>PHP 8.2 CLI Array</span>
                <span className="p-1 bg-zinc-800 rounded text-zinc-400"><Terminal size={14}/></span>
              </div>
            </div>
            <div className="bg-[#121214] border border-zinc-800 rounded-xl p-4">
              <div className="text-[10px] text-amber-400 mb-1 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> STATUS REVIEW</div>
              <div className="font-bold text-zinc-200 text-sm">Tahap 3 <span className="text-zinc-500 font-normal text-xs">/ 4</span></div>
              <div className="text-xs text-zinc-500 mt-1 flex justify-between items-center">
                <span>Tanya Jawab Guru</span>
                <span className="p-1 bg-zinc-800 rounded text-zinc-400"><MessageSquare size={14}/></span>
              </div>
            </div>
            <div className="bg-[#121214] border border-zinc-800 rounded-xl p-4">
              <div className="text-[10px] text-rose-400 mb-1 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> WAKTU TERSISA</div>
              <div className="font-bold text-zinc-200 text-sm">6 Hari 23 Jam</div>
              <div className="text-xs text-zinc-500 mt-1 flex justify-between items-center">
                <span>Tenggat: Senin 23:59</span>
                <span className="p-1 bg-zinc-800 rounded text-zinc-400"><Clock size={14}/></span>
              </div>
            </div>
          </div>

          {/* Active Task Detail Card */}
          <div className="bg-[#121214] border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 mb-2">
                  <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">TUGAS MINGGU INI</span>
                  Algoritma & Pemrograman
                </div>
                <h2 className="text-xl font-bold text-zinc-100">Filter Data Kantin SMK</h2>
              </div>
              <div className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-mono">
                PHP 8.2 CLI
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-zinc-400">PROGRES EVALUASI</span>
                <span className="text-[10px] text-zinc-500">75% Menuju Selesai</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-[#09090b] border border-emerald-900/50 rounded-lg p-2.5 flex items-center gap-2 opacity-60">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <div className="text-[10px] text-emerald-400">1. Git Push<br/><span className="text-zinc-500">Terkirim</span></div>
                </div>
                <div className="flex-1 bg-[#09090b] border border-emerald-900/50 rounded-lg p-2.5 flex items-center gap-2 opacity-60">
                  <PlayCircle size={16} className="text-emerald-500" />
                  <div className="text-[10px] text-emerald-400">2. Unit Test<br/><span className="text-zinc-500">5/5 Lolos</span></div>
                </div>
                <div className="flex-1 bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-2.5 flex items-center gap-2">
                  <MessageSquare size={16} className="text-indigo-400" />
                  <div className="text-[10px] text-indigo-300">3. Tanya Jawab<br/><span className="text-indigo-400/60">Tunggu Responmu</span></div>
                </div>
                <div className="flex-1 bg-[#09090b] border border-zinc-800 rounded-lg p-2.5 flex items-center gap-2 opacity-40">
                  <Star size={16} className="text-zinc-500" />
                  <div className="text-[10px] text-zinc-400">4. Nilai Akhir<br/><span className="text-zinc-600">Pending</span></div>
                </div>
              </div>
            </div>

            <div className="bg-[#09090b] border border-zinc-800 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-zinc-500" />
                  <span className="text-xs font-bold text-zinc-300">Catatan Guru</span>
                  <span className="text-[10px] text-zinc-500">• Bpk. Hendra (15 menit lalu)</span>
                </div>
                <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">Santai, kamu pasti bisa!</span>
              </div>
              <p className="text-sm text-zinc-300 italic">"Mengapa memilih built-in <code className="bg-zinc-800 text-indigo-300 px-1 py-0.5 rounded not-italic font-mono text-[10px]">array_filter()</code> dibanding <code className="bg-zinc-800 text-indigo-300 px-1 py-0.5 rounded not-italic font-mono text-[10px]">foreach</code>? Bagaimana perkiraan efisiensi memorinya jika dataset makin besar?"</p>
            </div>

            <div className="flex gap-3">
              <Link to="/task/1" className="bg-zinc-100 hover:bg-white text-zinc-900 font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <MessageSquare size={16} /> Jawab Pertanyaan
              </Link>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <Terminal size={16} /> Lihat Kodemu
              </button>
            </div>
          </div>

          {/* Task History */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500"/> Tugas yang Sudah Selesai</h3>
              <span className="text-xs text-zinc-500">Semester Genap 2024</span>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Penjadwalan Antrian Servis Mobil', date: '12 Feb', mod: 'Modul 03', note: 'Logika antrian FIFO sudah tepat, struktur kode rapi.', score: 95 },
                { title: 'Validasi Formulir Pendaftaran Siswa', date: '05 Feb', mod: 'Modul 02', note: 'Regex email bagus, hanya perlu merapikan response error.', score: 88 },
                { title: 'Perhitungan Kasir Toko Kelontong', date: '28 Jan', mod: 'Modul 01', note: 'Algoritma diskon bekerja optimal sesuai modul.', score: 92 },
              ].map((task, i) => (
                <div key={i} className="bg-[#121214] border border-zinc-800 rounded-xl p-4 flex items-center justify-between group hover:border-zinc-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#09090b] rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      {i === 0 ? <Terminal size={18}/> : i === 1 ? <BookOpen size={18}/> : <Laptop size={18}/>}
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-500 mb-0.5">{task.mod} • {task.date}</div>
                      <div className="text-sm font-bold text-zinc-200 mb-0.5">{task.title}</div>
                      <div className="text-xs text-zinc-500 italic truncate max-w-sm">"{task.note}"</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm font-bold text-zinc-200 bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-700/50">
                      <Star size={14} className="text-amber-400" /> {task.score}
                    </div>
                    <button className="text-xs text-zinc-400 hover:text-zinc-100 flex items-center gap-1 transition-colors">Review →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Mentor & Stats) */}
        <div className="space-y-6">
          
          <div className="bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden">
            <div className="h-32 bg-zinc-800 relative overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500&auto=format&fit=crop" alt="Lab" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121214] to-transparent"></div>
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-zinc-200 shadow-black drop-shadow-md">Lab 2 Terbuka</span>
              </div>
              <div className="absolute bottom-3 right-4 text-[10px] text-zinc-300 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">Kapasitas: 24/32 PC</div>
            </div>
            
            <div className="p-5 border-b border-zinc-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-zinc-200 flex items-center gap-2"><MessageSquare size={16}/> Tanya Mentor</h3>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Tersedia</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30">HK</div>
                <div>
                  <div className="text-sm font-bold text-zinc-200">Bpk. Hendra Kurniawan</div>
                  <div className="text-[10px] text-zinc-500 flex items-center gap-1"><Clock size={10}/> Selasa & Kamis • 13.00</div>
                </div>
              </div>
              <button className="w-full bg-[#09090b] hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-medium py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-2">
                <Laptop size={14}/> Reservasi Meja Praktikum
              </button>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-zinc-200 text-xs flex items-center gap-2"><Star size={14}/> PENCAPAIAN PEKAN INI</h3>
                <span className="text-[10px] text-zinc-500">Level 4 Coder</span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-zinc-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path className="text-zinc-200" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-200">3 dari 4 Tugas Tuntas!</div>
                  <div className="text-[10px] text-zinc-500">Konsistensi kode rapi, pertahankan ritme belajarmu.</div>
                </div>
              </div>

              <div className="flex justify-between text-center border-t border-zinc-800 pt-4">
                <div>
                  <div className="text-lg font-bold text-zinc-200">5</div>
                  <div className="text-[9px] text-zinc-500 uppercase tracking-wider">Unit Test OK</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-zinc-200">91.6</div>
                  <div className="text-[9px] text-zinc-500 uppercase tracking-wider">Rerata Skor</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-zinc-200">100%</div>
                  <div className="text-[9px] text-zinc-500 uppercase tracking-wider">Kehadiran</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}