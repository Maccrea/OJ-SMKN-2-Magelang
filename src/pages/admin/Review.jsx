import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Code2, CheckCircle2, AlertTriangle, Send, FileDown, ShieldCheck } from 'lucide-react';

export default function Review() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState(null);
  
  // State untuk form feedback mentor
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await axios.get('http://localhost:8000/api/admin/submissions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setSubmissions(response.data.data);
          if(response.data.data.length > 0) {
              setSelectedSub(response.data.data[0]);
              setScore(response.data.data[0].final_score || 0);
          }
        }
      } catch (err) {
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  if (loading) return <div className="text-zinc-400 p-8 flex justify-center items-center h-screen">Memuat antrean review...</div>;

  return (
    <div className="max-w-[1400px] mx-auto p-6 text-zinc-300 grid grid-cols-1 xl:grid-cols-12 gap-6 pb-20 h-[calc(100vh-56px)]">
      
      {/* Kolom Kiri: Daftar Antrean Siswa */}
      <div className="xl:col-span-3 flex flex-col gap-4 h-full overflow-hidden">
        <h2 className="text-xl font-bold text-zinc-100">Review & Evaluasi</h2>
        
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
            <input type="text" placeholder="Cari NISN siswa..." className="w-full bg-[#121214] border border-zinc-800 rounded-lg py-2 pl-9 pr-4 text-xs focus:border-indigo-500 transition-colors" />
        </div>

        <div className="flex gap-2 text-[10px] mb-2">
            <button className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full">Semua ({submissions.length})</button>
            <button className="px-3 py-1 hover:bg-zinc-800/50 text-zinc-500 rounded-full">Perlu Review</button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {submissions.map(sub => (
            <div 
              key={sub.id} 
              onClick={() => { setSelectedSub(sub); setScore(sub.final_score || 0); setFeedback(sub.mentor_feedback || ''); }}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedSub?.id === sub.id ? 'bg-[#121214] border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.05)]' : 'bg-[#09090b] border-zinc-800 hover:border-zinc-700'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400">
                    {sub.user?.name.substring(0,2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-200">{sub.user?.name}</div>
                    <div className="text-[9px] text-zinc-500">{sub.user?.track?.name || 'UMUM'}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-indigo-400">{sub.final_score || '-'}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-amber-500/80 font-medium">
                 <AlertTriangle size={10}/> Menunggu Verifikasi
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kolom Kanan: Panel Code Editor & Umpan Balik */}
      {selectedSub ? (
        <div className="xl:col-span-9 flex flex-col h-full bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
          
          {/* Editor Header */}
          <div className="p-4 border-b border-zinc-800 bg-[#09090b] flex justify-between items-center">
            <div>
               <div className="text-[10px] text-zinc-500 mb-1">Tugas: {selectedSub.task?.title || 'Tugas Praktikum'}</div>
               <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                 <Code2 size={18} className="text-indigo-400"/> solution.js 
                 <span className="text-[9px] font-normal bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">Node v20.10.0</span>
               </h3>
            </div>
            <div className="flex gap-2">
               <div className="text-right mr-4">
                  <div className="text-[10px] text-zinc-500">Estimasi Sistem</div>
                  <div className="text-xl font-bold text-emerald-400 flex items-center justify-end gap-1">{selectedSub.ai_defense_score || 95} <ShieldCheck size={16}/></div>
               </div>
            </div>
          </div>

          {/* Area Koding (Mockup Editor) */}
          <div className="flex-1 bg-[#09090b] p-4 font-mono text-xs overflow-y-auto custom-scrollbar text-zinc-300 leading-relaxed border-b border-zinc-800">
             <div className="text-zinc-600 mb-2">{'// Kode jawaban yang dikirim oleh siswa'}</div>
             <pre className="whitespace-pre-wrap">
               {selectedSub.code_snapshot || "export function aggregateOrders(transactions) {\n  // Code goes here\n}"}
             </pre>
          </div>

          {/* Panel Evaluasi & Umpan Balik */}
          <div className="p-5 bg-[#121214]">
             <h4 className="text-xs font-bold text-zinc-300 mb-3 flex items-center gap-2"><Send size={14}/> Pertahanan Argumen & Umpan Balik Guru</h4>
             
             {/* Argumen Siswa */}
             <div className="bg-[#09090b] border border-zinc-800 rounded-lg p-4 mb-4">
               <div className="text-[10px] text-zinc-500 mb-2 flex justify-between">
                 <span>Argumen {selectedSub.user?.name}</span>
                 <span className="bg-zinc-800 px-1.5 py-0.5 rounded">O(N) Verified</span>
               </div>
               <p className="text-xs text-zinc-300 italic">
                 "{selectedSub.student_argument || "Saya menggunakan fungsi bawaan filter() yang langsung dirangkai dengan reduce() agar kompleksitas waktu tetap O(N)."}"
               </p>
             </div>

             {/* Form Penilaian */}
             <div className="flex gap-4 items-start">
               <div className="flex-1">
                 <label className="text-[10px] text-zinc-500 mb-1 block">Catatan Bimbingan / Portofolio:</label>
                 <textarea 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full h-20 bg-[#09090b] border border-zinc-800 rounded-lg p-3 text-xs focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Tulis umpan balik yang membangun untuk siswa..."
                 ></textarea>
               </div>
               
               <div className="w-48 bg-[#09090b] border border-zinc-800 rounded-lg p-4 flex flex-col justify-between">
                 <div>
                   <label className="text-[10px] text-zinc-500 mb-1 block text-center">Nilai Akhir (0-100):</label>
                   <input 
                      type="number" 
                      value={score} 
                      onChange={(e) => setScore(e.target.value)}
                      className="w-full bg-transparent text-center text-3xl font-bold text-zinc-100 focus:outline-none"
                   />
                 </div>
                 <button className="w-full mt-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-950 font-bold py-2 rounded-lg text-[10px] transition-colors flex items-center justify-center gap-1">
                    <CheckCircle2 size={12}/> Sahkan Nilai
                 </button>
               </div>
             </div>
          </div>
        </div>
      ) : (
        <div className="xl:col-span-9 flex items-center justify-center bg-[#121214] border border-zinc-800 rounded-xl">
           <div className="text-zinc-500 text-sm">Pilih siswa dari antrean di sebelah kiri untuk mereview kode.</div>
        </div>
      )}

    </div>
  );
}