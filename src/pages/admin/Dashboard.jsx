import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Layout as LayoutIcon, Code, X, BookOpen, Save, Layers, ListTodo, Route, MonitorPlay, Edit3, PlusCircle, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State Modal Buat Modul Baru
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '', week_number: '', track_id: '1', description: ''
  });

  // State Modal Edit / Kelola Tugas
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [taskData, setTaskData] = useState({
    title: '', study_case_html: '', deadline: ''
  });

  const fetchModules = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get('http://localhost:8000/api/admin/modules', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) setModules(response.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchModules(); }, []);

  // Simpan Modul Baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.post('http://localhost:8000/api/admin/modules', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setIsModalOpen(false);
        setFormData({ title: '', week_number: '', track_id: '1', description: '' });
        fetchModules();
      }
    } catch (error) {
      alert('Gagal menyimpan modul.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Buka Modal Edit Modul
  const handleOpenEdit = (mod) => {
    setActiveModule(mod);
    setIsEditModalOpen(true);
  };

  // Tambah Tugas ke Modul (Untuk menampung Analisis / Tugas 1-3)
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!activeModule) return;

    try {
      const token = localStorage.getItem('auth_token');
      // Endpoint ini nanti bisa kamu buat di Laravel untuk tabel tasks
      await axios.post(`http://localhost:8000/api/admin/modules/${activeModule.id}/tasks`, taskData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Tugas / Analisis berhasil ditambahkan ke modul ini!');
      setTaskData({ title: '', study_case_html: '', deadline: '' });
      fetchModules();
    } catch (error) {
      alert('Gagal menambahkan tugas. Pastikan backend endpoint tasks sudah siap.');
    }
  };

  const uniqueWeeks = [...new Set(modules.map(mod => mod.week_number))].sort((a, b) => a - b);

  if (loading) return <div className="text-zinc-400 p-8 flex justify-center items-center h-[calc(100vh-56px)]">Memuat data...</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 pb-20">
      
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-6">
        <div>
          <div className="text-[10px] text-zinc-500 mb-2 flex items-center gap-2 font-medium tracking-wider">
            <span className="bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded flex items-center gap-1 border border-indigo-500/20"><Layers size={12}/> Kurikulum Fase F SMK RPL</span>
            <span>• Tahun Ajaran 2024/2025</span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Kelola Modul Praktikum</h1>
          <p className="text-sm text-zinc-400">Atur roadmap materi harian, konfigurasi starter code, dan integrasi evaluasi otomatis Docker.</p>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-zinc-200 flex items-center gap-2">Roadmap Kurikulum</h2>
          <span className="text-[10px] text-zinc-400">Total: <strong className="text-zinc-200">{modules.length} Modul Terdaftar</strong></span>
        </div>
        
        {modules.length === 0 ? (
           <div className="bg-[#121214] border border-zinc-800 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-600 mb-2"><Route size={18}/></div>
              <div className="text-xs text-zinc-400">Roadmap masih kosong. Timeline akan otomatis terbentuk saat kamu menambahkan modul.</div>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-x-auto pb-2">
            {uniqueWeeks.map((week) => {
              const modulesInThisWeek = modules.filter(m => m.week_number === week);
              return (
                <div key={week} className="bg-[#121214] border border-indigo-900/50 rounded-xl p-4 relative overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.05)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                  <div className="text-xs font-bold text-zinc-300 mb-1">Pekan {week}</div>
                  <div className="text-[10px] text-zinc-500 mb-4 line-clamp-2 min-h-[30px]">
                    {modulesInThisWeek.map(m => m.title).join(' • ')}
                  </div>
                  <span className="text-[9px] bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded inline-flex items-center gap-1 font-bold">
                    <Layers size={10}/> {modulesInThisWeek.length} Modul
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Daftar Modul Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400"><ListTodo size={16}/></div>
              <div>
                 <h2 className="text-sm font-bold text-zinc-200">Daftar Modul Tersedia</h2>
                 <p className="text-[10px] text-zinc-500">Modul yang siap dikerjakan oleh siswa.</p>
              </div>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer">
              <BookOpen size={14}/> Buat Modul Baru
            </button>
        </div>

        {modules.length === 0 ? (
            <div className="bg-[#121214] border border-zinc-800 border-dashed rounded-xl p-12 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-600 mb-3"><LayoutIcon size={20}/></div>
              <div className="text-zinc-300 font-medium mb-1">Belum ada modul yang dibuat</div>
              <p className="text-xs text-zinc-500 max-w-sm">Mulai buat silabus praktikum dengan mengklik tombol "Buat Modul Baru" di pojok kanan atas.</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((mod) => (
              <div key={mod.id} className="bg-[#121214] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 transition-colors group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex gap-2">
                       <span className="text-[9px] bg-zinc-800 text-zinc-300 px-2 py-1 rounded font-medium">Pekan {mod.week_number}</span>
                       <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded font-medium">
                         {mod.track_id == 1 ? 'Frontend' : mod.track_id == 2 ? 'Backend' : 'AI'}
                       </span>
                     </div>
                  </div>
                  <h3 className="font-bold text-zinc-100 mb-2 text-sm group-hover:text-indigo-300 transition-colors">{mod.title}</h3>
                  <p className="text-[11px] text-zinc-400 mb-5 line-clamp-2 leading-relaxed">{mod.description || 'Tidak ada deskripsi.'}</p>
                </div>
                
                <div className="flex justify-between items-center text-[10px] pt-4 border-t border-zinc-800/80">
                   <span className="flex items-center gap-1.5 text-zinc-500"><Code size={12}/> {mod.tasks?.length || 0} Tugas Code</span>
                   {/* Tombol Edit Modul yang sekarang sudah aktif! */}
                   <button 
                      onClick={() => handleOpenEdit(mod)}
                      className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 transition-colors cursor-pointer bg-indigo-500/10 px-3 py-1.5 rounded-md border border-indigo-500/20"
                   >
                      <Edit3 size={12}/> Kelola & Edit Modul
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODAL BUAT MODUL BARU --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b]/80 backdrop-blur-md px-4">
          <div className="bg-[#121214] border border-zinc-700 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-[#121214]">
              <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-400" /> Konfigurasi Modul Baru
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-zinc-200 transition-colors p-1 bg-zinc-800/50 rounded-md cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-5">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 mb-2 block uppercase tracking-wider">Judul Modul</label>
                  <input 
                    type="text" required value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-700 shadow-inner" 
                    placeholder="Contoh: Beranda lambat dibaca di HP"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400 mb-2 block uppercase tracking-wider">Pekan Ke-</label>
                    <input 
                      type="number" required min="1" max="30" value={formData.week_number}
                      onChange={(e) => setFormData({...formData, week_number: e.target.value})}
                      className="w-full bg-[#09090b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:border-indigo-500 outline-none transition-all shadow-inner" 
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400 mb-2 block uppercase tracking-wider">Spesialisasi Target</label>
                    <select 
                      value={formData.track_id}
                      onChange={(e) => setFormData({...formData, track_id: e.target.value})}
                      className="w-full bg-[#09090b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:border-indigo-500 outline-none transition-all shadow-inner"
                    >
                      <option value="1">Frontend UI</option>
                      <option value="2">Backend API</option>
                      <option value="3">AI Specialist</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-400 mb-2 block uppercase tracking-wider">Deskripsi Skenario (Copy dari Bank Soal)</label>
                  <textarea 
                    rows="3" value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:border-indigo-500 outline-none transition-all resize-none shadow-inner" 
                    placeholder="Contoh: Bu Ratna mencoba halaman beranda di HP siswa..."
                  ></textarea>
                </div>
              </div>

              <div className="p-6 border-t border-zinc-800 bg-[#09090b] flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-xs font-bold text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
                    Batal
                  </button>
                  <button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer">
                    {isSubmitting ? 'Memproses...' : <><Save size={14} /> Terbitkan Modul</>}
                  </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL KELOLA & EDIT TUGAS (UNTUK ANALISIS & TUGAS 1-3) --- */}
      {isEditModalOpen && activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b]/80 backdrop-blur-md px-4">
          <div className="bg-[#121214] border border-zinc-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-[#121214]">
              <div>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-bold">Pekan {activeModule.week_number}</span>
                <h3 className="text-lg font-bold text-zinc-100 mt-1">{activeModule.title}</h3>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="text-zinc-500 hover:text-zinc-200 p-1 bg-zinc-800/50 rounded-md cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Skenario Utama */}
              <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Skenario Masalah Klien</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{activeModule.description || 'Tidak ada skenario.'}</p>
              </div>

              {/* Daftar Tugas (Tasks) yang sudah masuk */}
              <div>
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">Daftar Tugas & Analisis di Modul Ini</h4>
                {activeModule.tasks?.length === 0 ? (
                  <div className="text-xs text-zinc-500 bg-[#09090b] border border-zinc-800 border-dashed rounded-xl p-6 text-center">
                    Belum ada tugas atau soal analisis yang dimasukkan untuk modul ini. Silakan tambahkan di bawah.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {activeModule.tasks?.map((t, idx) => (
                      <div key={t.id} className="bg-[#09090b] border border-zinc-800 rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <div className="text-xs font-bold text-zinc-200">Tugas {idx + 1}: {t.title}</div>
                          <div className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">{t.study_case_html}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Tambah Tugas Baru (Tempat memasukkan detail tugas dari Word Bank Soal) */}
              <form onSubmit={handleAddTask} className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 space-y-4">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <PlusCircle size={14}/> Tambah Butir Tugas / Soal Analisis
                </h4>
                
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 mb-1 block">Judul Tugas (Contoh: Analisis.md atau Tugas 1 - Kartu Buku)</label>
                  <input 
                    type="text" required value={taskData.title}
                    onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                    className="w-full bg-[#121214] border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-100 outline-none focus:border-indigo-500" 
                    placeholder="Analisis.md / Tugas 1..."
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-400 mb-1 block">Instruksi Soal / Pertanyaan Analisis (Copy dari Word)</label>
                  <textarea 
                    rows="3" required value={taskData.study_case_html}
                    onChange={(e) => setTaskData({...taskData, study_case_html: e.target.value})}
                    className="w-full bg-[#121214] border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-100 outline-none focus:border-indigo-500 resize-none" 
                    placeholder="Masukkan detail instruksi atau pertanyaan..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <PlusCircle size={14}/> Masukkan ke Modul
                  </button>
                </div>
              </form>

            </div>

            <div className="p-4 border-t border-zinc-800 bg-[#09090b] flex justify-end">
              <button onClick={() => setIsEditModalOpen(false)} className="px-5 py-2 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer">
                Selesai & Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}