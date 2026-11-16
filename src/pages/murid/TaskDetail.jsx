import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, ChevronLeft, Download, Terminal, PlayCircle, BookOpen, MessageSquare } from 'lucide-react';

export default function TaskWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [code, setCode] = useState('// Tulis jawaban atau analisismu di sini...\n\n');
  const [timeLeft, setTimeLeft] = useState({ hari: 0, jam: 0, mnt: 0, dtk: 0 });
  
  // State loading saat tombol kirim dipencet
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await axios.get(`https://oj-smkn-2-magelang-production.up.railway.app/api/student/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setTask(response.data.data);
        }
      } catch (err) {
        console.error("Gagal memuat tugas", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  useEffect(() => {
    if (!task || !task.deadline) return;

    const timerInterval = setInterval(() => {
      const difference = new Date(task.deadline) - new Date();
      if (difference > 0) {
        setTimeLeft({
          hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
          jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mnt: Math.floor((difference / 1000 / 60) % 60),
          dtk: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ hari: 0, jam: 0, mnt: 0, dtk: 0 });
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [task]);

  // FUNGSI UNDUH (Dummy untuk saat ini karena file zip belum ada di database)
  const handleDownload = () => {
    alert('Tidak ada aset tambahan (.zip) yang perlu diunduh untuk tugas ini.');
  };

  // FUNGSI KIRIM JAWABAN
  const handleSubmit = async () => {
    if (!code.trim() || code === '// Tulis jawaban atau analisismu di sini...\n\n') {
      alert('Tulis jawabanmu dulu dong sebelum dikirim!');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.post(`https://oj-smkn-2-magelang-production.up.railway.app/api/student/tasks/${id}/submit`, {
        code_snapshot: code
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert(response.data.message);
      navigate('/dashboard'); // Balik ke beranda otomatis!
    } catch (error) {
      alert('Gagal mengirim jawaban. Coba lagi!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#09090b] text-zinc-400 p-8 flex justify-center items-center">Menyiapkan ruang kerja...</div>;
  if (!task) return <div className="min-h-screen bg-[#09090b] text-zinc-400 p-8 flex justify-center items-center">Tugas tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans flex flex-col">
      <div className="border-b border-zinc-800 bg-[#121214] px-6 py-4 flex justify-between items-center">
         <div>
            <div className="flex gap-4 text-[10px] text-zinc-500 font-bold mb-1">
               <Link to="/dashboard" className="flex items-center gap-1 hover:text-zinc-300 transition-colors cursor-pointer"><ChevronLeft size={12}/> Kembali ke Dashboard</Link>
               <span className="flex items-center gap-1"><BookOpen size={12}/> {task.module?.title || 'Modul Praktikum'}</span>
            </div>
            <h1 className="text-xl font-bold text-zinc-100">{task.title}</h1>
         </div>
         
         <div className="flex items-center gap-4 bg-[#09090b] border border-zinc-800 px-4 py-2 rounded-xl shadow-inner">
            <div className="text-[9px] text-zinc-500 font-bold text-right leading-tight">
               SISA WAKTU<br/>PENGERJAAN
            </div>
            <div className="flex gap-2 text-center text-rose-400 font-mono">
               <div className="w-10"><div className="text-xl font-bold">{String(timeLeft.hari).padStart(2, '0')}</div><div className="text-[8px] text-zinc-500">HARI</div></div> <span className="text-xl text-zinc-700">:</span>
               <div className="w-10"><div className="text-xl font-bold">{String(timeLeft.jam).padStart(2, '0')}</div><div className="text-[8px] text-zinc-500">JAM</div></div> <span className="text-xl text-zinc-700">:</span>
               <div className="w-10"><div className="text-xl font-bold">{String(timeLeft.mnt).padStart(2, '0')}</div><div className="text-[8px] text-zinc-500">MNT</div></div> <span className="text-xl text-zinc-700">:</span>
               <div className="w-10"><div className="text-xl font-bold">{String(timeLeft.dtk).padStart(2, '0')}</div><div className="text-[8px] text-zinc-500">DTK</div></div>
            </div>
         </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-1 p-1 overflow-hidden">
         <div className="lg:col-span-4 bg-[#121214] border border-zinc-800 rounded-lg p-5 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
               <h2 className="text-sm font-bold text-zinc-200 flex items-center gap-2"><BookOpen size={16}/> Instruksi / Study Case</h2>
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap">
               {task.study_case_html}
            </div>
            <div className="mt-auto pt-4 border-t border-zinc-800">
               <button onClick={handleDownload} className="w-full flex justify-between items-center bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 text-xs px-4 py-3 rounded-lg border border-zinc-700 transition-colors cursor-pointer">
                  <span className="flex items-center gap-2"><Download size={14}/> Unduh Aset Tambahan (.zip)</span>
               </button>
            </div>
         </div>

         <div className="lg:col-span-8 bg-[#121214] border border-zinc-800 rounded-lg flex flex-col">
            <div className="border-b border-zinc-800 px-4 py-3 flex justify-between items-center bg-[#09090b]">
               <div className="flex gap-2">
                  <button className="px-4 py-1.5 bg-zinc-800 text-zinc-300 text-[10px] font-bold rounded-md">Editor Langsung</button>
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500">
                  <span className="text-emerald-400">● JavaScript / Markdown</span>
               </div>
            </div>
            
            <div className="flex-1 relative">
               <textarea 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                  className="absolute inset-0 w-full h-full bg-[#09090b] text-zinc-300 text-sm font-mono p-4 outline-none resize-none custom-scrollbar"
               ></textarea>
            </div>

            <div className="border-t border-zinc-800 p-3 bg-[#09090b] flex justify-between items-center">
               <button onClick={() => setCode('// Tulis jawaban atau analisismu di sini...\n\n')} className="text-[10px] text-zinc-500 hover:text-rose-400 px-3 py-1 cursor-pointer transition-colors font-bold">Reset Lembar Kerja</button>
               <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer shadow-lg"
               >
                  <PlayCircle size={14}/> {isSubmitting ? 'Mengirim...' : 'Kirim & Uji Jawaban'}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}