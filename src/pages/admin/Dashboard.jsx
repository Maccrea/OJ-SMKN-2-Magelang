import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Layout as LayoutIcon, Code, X, BookOpen, Save, Layers, ListTodo, Route, MonitorPlay, Edit3, PlusCircle, Trash2, Edit2 } from 'lucide-react';

export default function AdminDashboard() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State Modal Modul (Untuk Create & Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState(null); // Penanda Edit Modul
  const [formData, setFormData] = useState({
    title: '', week_number: '', track_id: '1', description: ''
  });

  // State Modal Kelola Tugas
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null); // Penanda Edit Tugas
  const [taskData, setTaskData] = useState({
    title: '', study_case_html: '', deadline: ''
  });

  // Fetch Data Modul
  const fetchModules = async (forceUpdateActiveModule = false) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get('http://localhost:8000/api/admin/modules', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setModules(response.data.data);
        // Jika sedang buka modal Kelola Tugas, update juga datanya
        if (forceUpdateActiveModule && activeModule) {
          const updatedActive = response.data.data.find(m => m.id === activeModule.id);
          setActiveModule(updatedActive);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchModules(); }, []);

  // ----------------------------------------------------
  // FUNGSI MODUL (CREATE, UPDATE, DELETE)
  // ----------------------------------------------------
  const handleOpenCreateModule = () => {
    setEditingModuleId(null);
    setFormData({ title: '', week_number: '', track_id: '1', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModule = (mod) => {
    setEditingModuleId(mod.id);
    setFormData({ 
      title: mod.title, 
      week_number: mod.week_number, 
      track_id: mod.track_id, 
      description: mod.description || '' 
    });
    setIsModalOpen(true);
  };

  const handleSubmitModule = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('auth_token');
      if (editingModuleId) {
        // UPDATE
        await axios.put(`http://localhost:8000/api/admin/modules/${editingModuleId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // CREATE
        await axios.post('http://localhost:8000/api/admin/modules', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsModalOpen(false);
      fetchModules();
    } catch (error) {
      alert('Gagal menyimpan modul.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteModule = async (id) => {
    if(!window.confirm('Yakin ingin menghapus modul ini beserta semua tugas di dalamnya?')) return;
    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(`http://localhost:8000/api/admin/modules/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchModules();
    } catch (error) {
      alert('Gagal menghapus modul.');
    }
  };


  // ----------------------------------------------------
  // FUNGSI TUGAS (CREATE, UPDATE, DELETE)
  // ----------------------------------------------------
  const handleOpenManageTasks = (mod) => {
    setActiveModule(mod);
    setEditingTaskId(null);
    setTaskData({ title: '', study_case_html: '', deadline: '' });
    setIsEditModalOpen(true);
  };

  const handleEditTaskClick = (task) => {
    setEditingTaskId(task.id);
    setTaskData({ title: task.title, study_case_html: task.study_case_html, deadline: task.deadline || '' });
  };

  const handleCancelEditTask = () => {
    setEditingTaskId(null);
    setTaskData({ title: '', study_case_html: '', deadline: '' });
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    if (!activeModule) return;
    try {
      const token = localStorage.getItem('auth_token');
      if (editingTaskId) {
        // UPDATE TUGAS
        await axios.put(`http://localhost:8000/api/admin/tasks/${editingTaskId}`, taskData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // CREATE TUGAS
        await axios.post(`http://localhost:8000/api/admin/modules/${activeModule.id}/tasks`, taskData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setEditingTaskId(null);
      setTaskData({ title: '', study_case_html: '', deadline: '' });
      fetchModules(true); // Refetch & update activeModule state
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      alert('Gagal menyimpan tugas: ' + msg);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if(!window.confirm('Yakin ingin menghapus tugas/analisis ini?')) return;
    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(`http://localhost:8000/api/admin/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchModules(true);
    } catch (error) {
      alert('Gagal menghapus tugas.');
    }
  };


  const uniqueWeeks = [...new Set(modules.map(mod => mod.week_number))].sort((a, b) => a - b);

  if (loading) return <div className="text-zinc-400 p-8 flex justify-center items-center h-[calc(100vh-56px)]">Memuat data...</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 pb-20">
      
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

      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-zinc-200 flex items-center gap-2">Roadmap Kurikulum</h2>
          <span className="text-[10px] text-zinc-400">Total: <strong className="text-zinc-200">{modules.length} Modul Terdaftar</strong></span>
        </div>
        
        {modules.length === 0 ? (
           <div className="bg-[#121214] border border-zinc-800 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-600 mb-2"><Route size={18}/></div>
              <div className="text-xs text-zinc-400">Roadmap masih kosong.</div>
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

      <div>
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400"><ListTodo size={16}/></div>
              <h2 className="text-sm font-bold text-zinc-200">Daftar Modul Tersedia</h2>
            </div>
            <button onClick={handleOpenCreateModule} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg cursor-pointer">
              <BookOpen size={14}/> Buat Modul Baru
            </button>
        </div>

        {modules.length === 0 ? (
            <div className="bg-[#121214] border border-zinc-800 border-dashed rounded-xl p-12 text-center text-zinc-500 text-sm">
              Belum ada modul yang dibuat.
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((mod) => (
              <div key={mod.id} className="bg-[#121214] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 group flex flex-col justify-between relative">
                
                {/* Tombol Hapus Modul & Edit Info Modul */}
                <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenEditModule(mod)} className="p-1.5 bg-zinc-800 hover:bg-indigo-500/20 text-zinc-400 hover:text-indigo-400 rounded-md cursor-pointer"><Edit2 size={12}/></button>
                  <button onClick={() => handleDeleteModule(mod.id)} className="p-1.5 bg-zinc-800 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 rounded-md cursor-pointer"><Trash2 size={12}/></button>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-4 pr-16">
                     <div className="flex gap-2">
                       <span className="text-[9px] bg-zinc-800 text-zinc-300 px-2 py-1 rounded font-medium">Pekan {mod.week_number}</span>
                       <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded font-medium">
                         {mod.track_id == 1 ? 'Frontend' : mod.track_id == 2 ? 'Backend' : 'AI'}
                       </span>
                     </div>
                  </div>
                  <h3 className="font-bold text-zinc-100 mb-2 text-sm">{mod.title}</h3>
                  <p className="text-[11px] text-zinc-400 mb-5 line-clamp-2">{mod.description || 'Tidak ada deskripsi.'}</p>
                </div>
                
                <div className="flex justify-between items-center text-[10px] pt-4 border-t border-zinc-800/80">
                   <span className="flex items-center gap-1.5 text-zinc-500"><Code size={12}/> {mod.tasks?.length || 0} Tugas Code</span>
                   <button onClick={() => handleOpenManageTasks(mod)} className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer bg-indigo-500/10 px-3 py-1.5 rounded-md border border-indigo-500/20">
                      <ListTodo size={12}/> Kelola Tugas
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODAL FORM MODUL (CREATE & UPDATE) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b]/80 backdrop-blur-md px-4">
          <div className="bg-[#121214] border border-zinc-700 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-400" /> {editingModuleId ? 'Edit Modul' : 'Konfigurasi Modul Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-zinc-200 p-1 bg-zinc-800/50 rounded-md cursor-pointer"><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmitModule}>
              <div className="p-6 space-y-5">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 mb-2 block">JUDUL MODUL</label>
                  <input 
                    type="text" required value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:border-indigo-500 outline-none" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400 mb-2 block">PEKAN KE-</label>
                    <input 
                      type="number" required min="1" max="30" value={formData.week_number}
                      onChange={(e) => setFormData({...formData, week_number: e.target.value})}
                      className="w-full bg-[#09090b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:border-indigo-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400 mb-2 block">SPESIALISASI TARGET</label>
                    <select 
                      value={formData.track_id}
                      onChange={(e) => setFormData({...formData, track_id: e.target.value})}
                      className="w-full bg-[#09090b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:border-indigo-500 outline-none"
                    >
                      <option value="1">Frontend UI</option>
                      <option value="2">Backend API</option>
                      <option value="3">AI Specialist</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-400 mb-2 block">DESKRIPSI SKENARIO</label>
                  <textarea 
                    rows="3" value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:border-indigo-500 outline-none resize-none" 
                  ></textarea>
                </div>
              </div>
              <div className="p-6 border-t border-zinc-800 bg-[#09090b] flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-xs font-bold text-zinc-400 hover:text-zinc-200 cursor-pointer">Batal</button>
                  <button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg text-xs font-bold cursor-pointer">
                    {isSubmitting ? 'Memproses...' : (editingModuleId ? 'Simpan Perubahan' : 'Terbitkan Modul')}
                  </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL KELOLA TUGAS (MENDUKUNG EDIT & DELETE TUGAS) --- */}
      {isEditModalOpen && activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b]/80 backdrop-blur-md px-4">
          <div className="bg-[#121214] border border-zinc-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <div>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-bold">Pekan {activeModule.week_number}</span>
                <h3 className="text-lg font-bold text-zinc-100 mt-1">{activeModule.title}</h3>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="text-zinc-500 hover:text-zinc-200 p-1 bg-zinc-800/50 rounded-md cursor-pointer"><X size={18} /></button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Daftar Tugas */}
              <div>
                <h4 className="text-xs font-bold text-zinc-300 uppercase mb-3">Daftar Tugas & Analisis</h4>
                {activeModule.tasks?.length === 0 ? (
                  <div className="text-xs text-zinc-500 bg-[#09090b] border border-zinc-800 border-dashed rounded-xl p-6 text-center">Belum ada tugas.</div>
                ) : (
                  <div className="space-y-2">
                    {activeModule.tasks?.map((t, idx) => (
                      <div key={t.id} className="bg-[#09090b] border border-zinc-800 rounded-lg p-3 flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="text-xs font-bold text-zinc-200">{t.title}</div>
                          <div className="text-[10px] text-zinc-500 mt-1 whitespace-pre-wrap">{t.study_case_html}</div>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => handleEditTaskClick(t)} className="p-1.5 text-zinc-500 hover:text-amber-400 bg-zinc-800 hover:bg-zinc-700 rounded cursor-pointer"><Edit2 size={12}/></button>
                          <button onClick={() => handleDeleteTask(t.id)} className="p-1.5 text-zinc-500 hover:text-rose-400 bg-zinc-800 hover:bg-zinc-700 rounded cursor-pointer"><Trash2 size={12}/></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Tugas (Create / Update) */}
              <form onSubmit={handleSubmitTask} className={`border rounded-xl p-4 space-y-4 ${editingTaskId ? 'bg-amber-500/5 border-amber-500/20' : 'bg-[#09090b] border-zinc-800'}`}>
                <h4 className={`text-xs font-bold uppercase flex items-center gap-1.5 ${editingTaskId ? 'text-amber-400' : 'text-indigo-400'}`}>
                  {editingTaskId ? <><Edit2 size={14}/> Edit Tugas</> : <><PlusCircle size={14}/> Tambah Tugas Baru</>}
                </h4>
                
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 mb-1 block">Judul Tugas</label>
                  <input 
                    type="text" required value={taskData.title}
                    onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                    className="w-full bg-[#121214] border border-zinc-800 rounded-lg p-2 text-xs text-zinc-100 outline-none focus:border-indigo-500" 
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-400 mb-1 block">Instruksi Soal</label>
                  <textarea 
                    rows="4" required value={taskData.study_case_html}
                    onChange={(e) => setTaskData({...taskData, study_case_html: e.target.value})}
                    className="w-full bg-[#121214] border border-zinc-800 rounded-lg p-2 text-xs text-zinc-100 outline-none focus:border-indigo-500 resize-none" 
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2">
                  {editingTaskId && (
                    <button type="button" onClick={handleCancelEditTask} className="px-3 py-2 text-xs font-bold text-zinc-400 hover:text-zinc-200 cursor-pointer">Batal Edit</button>
                  )}
                  <button type="submit" className={`text-white text-xs px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer ${editingTaskId ? 'bg-amber-600 hover:bg-amber-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}>
                    {editingTaskId ? 'Simpan Perubahan' : 'Masukkan ke Modul'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}