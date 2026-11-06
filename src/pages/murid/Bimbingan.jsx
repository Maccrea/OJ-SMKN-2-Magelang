import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Monitor, Zap, MessageSquare, Coffee, Video, CheckCircle2, Clock, Star, Send } from 'lucide-react';

export default function Bimbingan() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 pb-20">
      
      {/* Hero Section */}
      <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 mb-6 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-bl-full pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Lab RPL SMK 2 • Konsultasi Tatap Muka & Online
          </div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-2 flex items-center gap-2">Ruang Bimbingan & Meja Konsultasi <Coffee size={24} className="text-amber-500"/></h1>
          <p className="text-sm text-zinc-400 max-w-2xl">Pilih jadwal diskusi santai di Meja Konsultasi Lab RPL atau online voice untuk bedah kode, tanya jawab logika algoritma, dan curhat seputar industri software.</p>
        </div>
        <div className="hidden md:flex items-center gap-4 relative z-10 bg-[#09090b] border border-zinc-800 p-4 rounded-xl">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
            <div className="w-6 h-6 rounded-full border-2 border-indigo-400 flex items-center justify-center">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Status Bimbingan</div>
            <div className="text-lg font-bold text-zinc-200">3 Sesi Mandiri</div>
            <div className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span> Sisa kuota pekan aktif</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Calendar & Mentor Status */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Calendar Widget */}
          <div className="bg-[#121214] border border-zinc-800 rounded-xl p-5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-zinc-200 flex items-center gap-2 text-lg"><CalendarIcon size={18}/> Februari 2025</h3>
              <div className="flex items-center gap-2">
                <button className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded">Hari Ini</button>
                <div className="flex gap-1">
                  <button className="p-1 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-400"><ChevronLeft size={16}/></button>
                  <button className="p-1 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-400"><ChevronRight size={16}/></button>
                </div>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-zinc-500 mb-2 font-medium">
              <div>Sen</div><div>Sel</div><div>Rab</div><div>Kam</div><div>Jum</div><div className="text-rose-400/70">Sab</div><div className="text-rose-400/70">Min</div>
            </div>

            {/* Dates Grid (Dummy Data for Feb 2025 based on image) */}
            <div className="grid grid-cols-7 gap-y-3 text-center text-xs">
              <div className="text-zinc-700">27</div><div className="text-zinc-700">28</div><div className="text-zinc-700">29</div><div className="text-zinc-700">30</div><div className="text-zinc-700">31</div><div className="text-zinc-700">1</div><div className="text-zinc-700">2</div>
              
              <div className="flex flex-col items-center gap-1 text-zinc-300">3<span className="w-1 h-1 rounded-full bg-indigo-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">4<span className="w-1 h-1 rounded-full bg-indigo-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">5<span className="w-1 h-1 rounded-full bg-amber-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">6<span className="w-1 h-1 rounded-full bg-amber-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">7<span className="w-1 h-1 rounded-full bg-amber-500"></span></div>
              <div className="text-zinc-700">8</div><div className="text-zinc-700">9</div>
              
              <div className="flex flex-col items-center gap-1 text-zinc-300">10<span className="w-1 h-1 rounded-full bg-indigo-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">11<span className="w-1 h-1 rounded-full bg-indigo-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">12<span className="w-1 h-1 rounded-full bg-amber-500"></span></div>
              <div className="flex flex-col items-center justify-center w-7 h-7 bg-indigo-100 text-indigo-950 rounded-full font-bold mx-auto">13</div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">14<span className="w-1 h-1 rounded-full bg-rose-500"></span></div>
              <div className="text-zinc-700">15</div><div className="text-zinc-700">16</div>

              <div className="flex flex-col items-center gap-1 text-zinc-300">17<span className="w-1 h-1 rounded-full bg-indigo-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">18<span className="w-1 h-1 rounded-full bg-indigo-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">19<span className="w-1 h-1 rounded-full bg-indigo-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">20<span className="w-1 h-1 rounded-full bg-indigo-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">21<span className="w-1 h-1 rounded-full bg-amber-500"></span></div>
              <div className="text-zinc-700">22</div><div className="text-zinc-700">23</div>
              
              <div className="flex flex-col items-center gap-1 text-zinc-300">24<span className="w-1 h-1 rounded-full bg-indigo-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">25<span className="w-1 h-1 rounded-full bg-indigo-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">26<span className="w-1 h-1 rounded-full bg-indigo-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">27<span className="w-1 h-1 rounded-full bg-indigo-500"></span></div>
              <div className="flex flex-col items-center gap-1 text-zinc-300">28<span className="w-1 h-1 rounded-full bg-rose-500"></span></div>
              <div className="text-zinc-700">1</div><div className="text-zinc-700">2</div>
            </div>

            {/* Legend */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-800 text-[10px] text-zinc-400">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Slot Terbuka</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Terbatas</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Penuh</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span> Libur</span>
            </div>
          </div>

          {/* Mentor Standby Widget */}
          <div className="bg-[#121214] border border-zinc-800 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Mentor Standby • 13 Feb 2025</h3>
              <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">Meja A-1 (Lab Komputer 2)</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#09090b] border border-zinc-800 p-3 rounded-lg flex items-center gap-3">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop" className="w-10 h-10 rounded object-cover" alt="Mentor" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#09090b] rounded-full"></span>
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-200">Bpk. Hendra Kurniawan</div>
                  <div className="text-[9px] text-zinc-500">S.Kom • Fullstack & Backend</div>
                </div>
              </div>
              <div className="bg-[#09090b] border border-zinc-800 p-3 rounded-lg flex items-center gap-3">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" className="w-10 h-10 rounded object-cover" alt="Mentor" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#09090b] rounded-full"></span>
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-200">Ibu Ratna Kumalasari</div>
                  <div className="text-[9px] text-zinc-500">S.Pd • Database & OOP Logic</div>
                </div>
              </div>
            </div>

            <div className="bg-[#09090b] border border-zinc-800 p-3 rounded-lg">
              <div className="text-[10px] text-zinc-500 mb-2">Fasilitas Standby di Meja A-1:</div>
              <div className="flex flex-wrap gap-2 text-[10px] text-zinc-400">
                <span className="flex items-center gap-1 bg-zinc-800/50 px-2 py-1 rounded"><Zap size={12}/> Koneksi Gigabit Lab</span>
                <span className="flex items-center gap-1 bg-zinc-800/50 px-2 py-1 rounded"><Coffee size={12}/> Colokan Meja Standby</span>
                <span className="flex items-center gap-1 bg-zinc-800/50 px-2 py-1 rounded w-full"><Monitor size={12}/> Monitor Eksternal Siap Pakai</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Booking Form */}
        <div className="lg:col-span-8">
          <div className="bg-[#121214] border border-zinc-800 rounded-xl p-6 h-full flex flex-col">
            
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20"><Book size={20} className="lucide lucide-calendar-check" /></div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-100">Formulir Booking Sesi</h2>
                  <p className="text-xs text-zinc-500">Terpilih: Kamis, 13 Februari 2025</p>
                </div>
              </div>
              <div className="text-[10px] font-medium bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">Step 1 s/d 4</div>
            </div>

            <div className="flex-1 space-y-6">
              {/* Step 1 */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center text-[10px]">1</span> Pilih Jam Sesi Diskusi</h3>
                  <span className="text-[10px] text-zinc-500">Sesi reguler: 40 Menit</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-[#09090b] border border-zinc-800 hover:border-zinc-600 rounded-xl p-4 text-center cursor-pointer transition-colors">
                    <div className="text-[10px] text-zinc-500 mb-1">Pagi</div>
                    <div className="text-xl font-bold text-zinc-300 mb-1">10:15</div>
                    <div className="text-[10px] text-zinc-500">1 slot</div>
                  </div>
                  <div className="bg-indigo-500/10 border-2 border-indigo-500 rounded-xl p-4 text-center cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                    <div className="text-[10px] text-indigo-400 mb-1 flex items-center justify-center gap-1">Siang <Star size={10} className="fill-indigo-400"/></div>
                    <div className="text-xl font-bold text-indigo-100 mb-1">13:30</div>
                    <div className="text-[10px] bg-indigo-500 text-white rounded px-1.5 py-0.5 inline-block">Terpilih ✓</div>
                  </div>
                  <div className="bg-[#09090b] border border-zinc-800 hover:border-zinc-600 rounded-xl p-4 text-center cursor-pointer transition-colors">
                    <div className="text-[10px] text-zinc-500 mb-1">Siang</div>
                    <div className="text-xl font-bold text-zinc-300 mb-1">14:15</div>
                    <div className="text-[10px] text-zinc-500">2 slot</div>
                  </div>
                  <div className="bg-[#09090b] border border-zinc-800 hover:border-zinc-600 rounded-xl p-4 text-center cursor-pointer transition-colors">
                    <div className="text-[10px] text-zinc-500 mb-1">Sore</div>
                    <div className="text-xl font-bold text-zinc-300 mb-1">15:00</div>
                    <div className="text-[10px] text-zinc-500">1 slot</div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2 mb-3"><span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center text-[10px]">2</span> Format Pertemuan</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-100 border-2 border-indigo-200 rounded-xl p-4 flex items-center justify-between cursor-pointer text-indigo-950">
                    <div className="flex items-center gap-4">
                      <MapPin size={24} className="text-indigo-600"/>
                      <div>
                        <div className="font-bold text-sm">Tatap Muka di Lab RPL 2</div>
                        <div className="text-[10px] text-indigo-950/70">Meja Konsultasi A-1 • Kopi / Teh lab</div>
                      </div>
                    </div>
                    <CheckCircle2 size={20} className="text-indigo-600 fill-indigo-200"/>
                  </div>
                  <div className="bg-[#09090b] border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors">
                    <div className="flex items-center gap-4">
                      <Video size={24} className="text-zinc-500"/>
                      <div>
                        <div className="font-bold text-sm text-zinc-300">Online Discord / Voice</div>
                        <div className="text-[10px] text-zinc-500">Channel #bimbingan-voice-1</div>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-700"></div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2 mb-3"><span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center text-[10px]">3</span> Fokus Materi & Diskusi</h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button className="bg-indigo-500 border border-indigo-400 text-white px-4 py-2 rounded-full flex items-center gap-2 font-medium"><CheckCircle2 size={14}/> Review Logika Modul 04</button>
                  <button className="bg-[#09090b] border border-zinc-700 text-zinc-400 hover:text-zinc-200 px-4 py-2 rounded-full transition-colors">Persiapan Tanya Jawab</button>
                  <button className="bg-[#09090b] border border-zinc-700 text-zinc-400 hover:text-zinc-200 px-4 py-2 rounded-full transition-colors">Kendala Bug / Error</button>
                  <button className="bg-[#09090b] border border-zinc-700 text-zinc-400 hover:text-zinc-200 px-4 py-2 rounded-full transition-colors">Diskusi PKL & Karier</button>
                  <button className="bg-[#09090b] border border-zinc-700 text-zinc-400 hover:text-zinc-200 px-4 py-2 rounded-full transition-colors">Refactoring Clean Code</button>
                </div>
              </div>

              {/* Step 4 */}
              <div>
                <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2 mb-3"><span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center text-[10px]">4</span> Catatan Singkat untuk Mentor (Opsional)</h3>
                <textarea 
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none placeholder:text-zinc-700"
                  rows="3"
                  placeholder="Contoh: Pak Hendra, saya bingung relasi Eloquent Many-to-Many di Laravel saat migrate tabel pivot..."
                ></textarea>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-5 mt-6 flex justify-between items-center">
              <div className="text-[10px] text-zinc-500 flex items-center gap-2">
                <MessageSquare size={14}/> Notifikasi otomatis dikirim ke WhatsApp siswa
              </div>
              <button className="bg-indigo-200 hover:bg-indigo-300 text-indigo-950 font-bold px-6 py-3 rounded-lg text-sm transition-colors flex items-center gap-2">
                Konfirmasi Jadwal Bimbingan <Send size={16}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Mendatang */}
        <div className="bg-[#121214] border border-zinc-800 rounded-xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded uppercase tracking-wider">Bimbingan Mendatang</span>
            <span className="text-[10px] text-zinc-300 bg-zinc-800 px-2 py-1 rounded flex items-center gap-1"><Clock size={12}/> 1 Hari 4 Jam Lagi</span>
          </div>
          <div className="flex gap-4">
            <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop" className="w-12 h-12 rounded-lg object-cover border border-zinc-700" alt="Mentor" />
            <div>
              <h4 className="font-bold text-zinc-100 text-lg mb-1">Refactoring API RESTful Modul 03</h4>
              <div className="text-xs text-zinc-400 mb-2">Bpk. Hendra Kurniawan, S.Kom</div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-zinc-500">
                <span className="flex items-center gap-1"><CalendarIcon size={12}/> Jumat, 14 Feb 2025</span>
                <span className="flex items-center gap-1"><Clock size={12}/> 09:00 - 09:45 WIB</span>
                <span className="flex items-center gap-1"><MapPin size={12}/> Lab RPL Meja B-2</span>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-5 pt-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-[10px] text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Status: Dikonfirmasi & Kalender Tersinkron
            </div>
            <button className="text-[10px] text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded transition-colors flex items-center gap-1">
              Detail Lab Meet →
            </button>
          </div>
        </div>

        {/* Refleksi */}
        <div className="bg-[#121214] border border-zinc-800 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded uppercase tracking-wider">Catatan Refleksi Sesi Terakhir</span>
            <div className="flex text-amber-400"><Star size={14} className="fill-amber-400"/><Star size={14} className="fill-amber-400"/><Star size={14} className="fill-amber-400"/><Star size={14} className="fill-amber-400"/><Star size={14} className="fill-amber-400"/></div>
          </div>
          <div className="bg-[#09090b] border border-zinc-800 rounded-lg p-4 mb-4">
            <div className="text-[10px] text-zinc-500 mb-2 flex items-center gap-1">
              <MessageSquare size={12}/> Ulasan Bimbingan • 07 Feb 2025 oleh Ibu Ratna, S.Pd
            </div>
            <p className="text-xs text-zinc-300 italic leading-relaxed">
              "Logika normalisasi database 3NF Ahmad sudah sangat matang. Coba perhatikan kembali indeks pada kolom foreign key agar performa query query saat data berjumlah jutaan tetap stabil. Good job!"
            </p>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex gap-2">
              <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20"><CheckCircle2 size={16}/></div>
              <div>
                <div className="text-[10px] font-bold text-zinc-300">Tugas Lanjutan: Implementasi Foreign Key Index</div>
                <div className="text-[9px] text-zinc-500">Status: Selesai di-push ke GitHub Repo</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-zinc-500">Total 8 Sesi Konsultasi Semester Ini</span>
              <button className="text-[10px] text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded transition-colors flex items-center gap-1">
                Buka Arsip Refleksi <Clock size={12}/>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer System Status (Optional based on image bottom edge) */}
      <div className="mt-8 flex justify-between items-center text-[10px] text-zinc-500">
        <span>© 2025 Bimbingan Online Siswa (B.O.S) • SMK Rekayasa Perangkat Lunak</span>
        <div className="flex gap-3">
          <span className="bg-zinc-800 px-2 py-0.5 rounded flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> v2.4.0 Production</span>
          <span className="bg-zinc-800 px-2 py-0.5 rounded flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span> Sistem Normal</span>
        </div>
      </div>

    </div>
  );
}