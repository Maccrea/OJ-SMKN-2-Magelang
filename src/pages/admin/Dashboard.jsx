import { Calendar, CheckCircle2, Clock, MoreVertical, Layout as LayoutIcon, Code, Database, MonitorPlay, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 pb-20">
      
      {/* Header Info */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-[10px] text-indigo-400 mb-2 flex items-center gap-2 font-medium tracking-wider">
            <span className="bg-indigo-500/10 px-2 py-1 rounded flex items-center gap-1 border border-indigo-500/20"><LayoutIcon size={12}/> Kurikulum Fase F SMK RPL</span>
            <span className="text-zinc-500">• Tahun Ajaran 2024/2025</span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Kelola Modul Praktikum</h1>
          <p className="text-sm text-zinc-400">Atur roadmap materi harian, konfigurasi repositori starter code siswa, dan integrasikan evaluasi otomatis dengan Docker auto-grader.</p>
        </div>
        <div className="flex bg-[#121214] rounded-lg border border-zinc-800 p-1 text-xs font-medium">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2"><Calendar size={14}/> 30 Hari (Reguler)</button>
          <button className="text-zinc-400 hover:text-zinc-200 px-4 py-2 rounded-md flex items-center gap-2">✦ 14 Hari (Intensif UKK)</button>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-zinc-200 flex items-center gap-2">Roadmap Kurikulum 30 Hari <span className="text-[9px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">Pekan 2 Berjalan</span></h2>
          <span className="text-[10px] text-zinc-400">Progres: <strong className="text-zinc-200">14 dari 30 Modul Siap</strong> (46.6%)</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {/* Pekan 1 */}
          <div className="bg-[#121214] border border-emerald-900/50 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="text-xs font-bold text-zinc-300">Pekan 1 (Hari 1-7)</div>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded flex items-center gap-1"><CheckCircle2 size={10}/> 7/7 Selesai</span>
            </div>
            <div className="text-[10px] text-zinc-500">Dasar Algoritma & Logika</div>
          </div>
          {/* Pekan 2 */}
          <div className="bg-[#121214] border border-indigo-900/50 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="text-xs font-bold text-zinc-300">Pekan 2 (Hari 8-14)</div>
              <span className="text-[9px] text-emerald-400 px-1.5 py-0.5 rounded flex items-center gap-1 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Hari 14 Aktif</span>
            </div>
            <div className="text-[10px] text-zinc-500">Struktur Data & Sanitasi Regex</div>
          </div>
          {/* Pekan 3 */}
          <div className="bg-[#121214] border border-zinc-800 rounded-xl p-4 relative overflow-hidden opacity-70">
            <div className="absolute top-0 left-0 w-1/2 h-1 bg-indigo-500"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="text-xs font-bold text-zinc-300">Pekan 3 (Hari 15-21)</div>
              <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/20">Draf Siap Terbit</span>
            </div>
            <div className="text-[10px] text-zinc-500">Backend API & Database</div>
          </div>
          {/* Pekan 4 */}
          <div className="bg-[#09090b] border border-zinc-800/50 rounded-xl p-4 opacity-50">
             <div className="flex justify-between items-start mb-6">
              <div className="text-xs font-bold text-zinc-500">Pekan 4 (Hari 22-30)</div>
              <span className="text-[9px] text-zinc-600">0/9 Terjadwal</span>
            </div>
            <div className="text-[10px] text-zinc-600">Capstone Project & Sertifikasi</div>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Modul List */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
             <div className="flex items-center gap-3">
               <h2 className="text-sm font-bold text-zinc-200">Daftar Modul Kurikulum</h2>
               <span className="bg-zinc-800 text-zinc-400 text-[9px] px-2 py-0.5 rounded-full">30 Modul</span>
             </div>
             <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors font-medium">+ Buat Modul Baru</button>
          </div>

          {/* Dummy Module 1 (Active) */}
          <div className="bg-[#121214] border border-zinc-700/50 rounded-xl p-5 shadow-[0_0_15px_rgba(99,102,241,0.05)] relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1 h-full bg-emerald-500"></div>
            <div className="flex justify-between items-start mb-3">
               <div className="flex gap-2">
                 <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-medium">Hari 14 / 30</span>
                 <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-medium">Backend API</span>
               </div>
               <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Aktif Hari Ini</span>
            </div>
            <h3 className="font-bold text-zinc-100 mb-1">Sanitasi Formulir & Regex NISN</h3>
            <p className="text-xs text-zinc-400 mb-4 w-3/4">Endpoint & Helper: validasi 10-digit NISN dan pembersihan string input dari injeksi skrip.</p>
            
            <div className="bg-[#09090b] border border-zinc-800 rounded-lg p-3 mb-4">
               <div className="flex justify-between text-[10px] mb-2">
                  <span className="text-zinc-300">Pengumpulan: <strong>32 dari 34 Siswa</strong> (94%)</span>
                  <span className="text-zinc-500"><strong className="text-emerald-400">30</strong> lolos auto-grader • <strong className="text-amber-400">2</strong> review</span>
               </div>
               <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{width: '85%'}}></div>
                  <div className="bg-amber-400 h-full" style={{width: '9%'}}></div>
               </div>
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-zinc-500">
               <span className="flex items-center gap-1 text-amber-500/70"><Clock size={12}/> Tenggat: Malam ini, 23:59 WIB</span>
               <div className="flex gap-2">
                 <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded flex items-center gap-1 transition-colors"><LayoutIcon size={12}/> Kelola & Edit</button>
                 <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-colors">Review Jawaban (32) <ArrowRight size={12}/></button>
               </div>
            </div>
          </div>
          {/* ... (Kamu bisa duplikasi card module di atas untuk list module lainnya jika diperlukan) */}
        </div>

        {/* Right Column: Studio Buat Modul (Form) */}
        <div className="lg:col-span-6">
           <div className="bg-[#121214] border border-zinc-800 rounded-xl p-6 relative overflow-hidden h-full">
              <div className="flex justify-between items-start border-b border-zinc-800 pb-5 mb-6">
                 <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                       <Code size={20}/>
                    </div>
                    <div>
                       <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">Studio Buat Modul Baru 
                         <span className="bg-indigo-600 text-white text-[9px] px-1.5 py-0.5 rounded">Hari #15</span>
                       </h2>
                       <p className="text-[10px] text-zinc-400 mt-0.5">Konfigurasi starter code dan kriteria penilaian auto-grader siswa.</p>
                    </div>
                 </div>
                 <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded text-xs transition-colors border border-zinc-700 flex items-center gap-2"><MonitorPlay size={12}/> Pratinjau</button>
              </div>

              {/* Form Content (Simplified to match image vibe) */}
              <div className="space-y-6">
                 <div>
                    <h3 className="text-xs font-bold text-zinc-300 mb-3 flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px]">1</span> KONFIGURASI MODUL & JADWAL</h3>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                       <div className="bg-[#09090b] border border-zinc-800 rounded-lg py-3 text-center cursor-pointer hover:border-zinc-600"><div className="text-zinc-400 mb-1 flex justify-center"><LayoutIcon size={16}/></div><div className="text-[10px] font-medium text-zinc-500">Frontend UI</div></div>
                       <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg py-3 text-center cursor-pointer"><div className="text-indigo-400 mb-1 flex justify-center"><Database size={16}/></div><div className="text-[10px] font-bold text-indigo-400">Backend API</div></div>
                       {/* ... */}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="text-[10px] text-zinc-500 mb-1 block">Judul Modul Praktikum</label>
                          <input type="text" value="Validasi Formulir PPDB & Sanitasi Input XSS" readOnly className="w-full bg-[#09090b] border border-zinc-800 rounded-md p-2.5 text-xs text-zinc-300" />
                       </div>
                       <div>
                          <label className="text-[10px] text-zinc-500 mb-1 block">Durasi Pengerjaan</label>
                          <input type="text" value="24 Jam (Harian)" readOnly className="w-full bg-[#09090b] border border-zinc-800 rounded-md p-2.5 text-xs text-zinc-300" />
                       </div>
                    </div>
                 </div>
                 {/* ... (Area kodingan dan unit test sesuai mockup bisa ditambahkan nanti) */}
              </div>

              <div className="mt-8 pt-5 border-t border-zinc-800 flex justify-end gap-3">
                 <button className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-lg text-xs font-medium">Simpan sebagai Draf</button>
                 <button className="bg-indigo-200 text-indigo-950 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2"><Calendar size={14}/> Jadwalkan & Rilis Modul (Hari 15)</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}