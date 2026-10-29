import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function Dashboard() {
  // Data Grafik Kinerja Week 1 - 4
  const velocityData = [
    { name: 'Week 1', frontend: 30, backend: 20, python: 25, ai: 10 },
    { name: 'Week 2', frontend: 60, backend: 45, python: 50, ai: 30 },
    { name: 'Week 3', frontend: 80, backend: 70, python: 75, ai: 60 },
    { name: 'Week 4', frontend: 96, backend: 89, python: 92, ai: 98 },
  ];

  // Data Tabel History Submisi
  const historyData = [
    { id: 1, name: 'Ahmad Fauzi', track: 'AF Frontend (React SPA)', task: 'MOD-W4-FE-02', taskDesc: 'Optimistic UI State & Web Worker Cache', status: 'Passed Judge', test: '8/8', testPct: '100%', aiScore: '9.6', aiStatus: 'Verified Paham', action: 'Inspect Q&A', actionColor: 'bg-slate-700' },
    { id: 2, name: 'Dewi Kusuma', track: 'DK Backend (Laravel)', task: 'MOD-W4-BE-01', taskDesc: 'Database Lock & Concurrency Guard', status: 'Passed Judge', test: '6/6', testPct: '100%', aiScore: '5.2', aiStatus: 'Flagged Copypaste', action: 'Triage Code', actionColor: 'bg-rose-600' },
    { id: 3, name: 'Rian Setyo', track: 'RS AI / LLM Track', task: 'MOD-W4-AI-03', taskDesc: 'RAG Chunking & Cosine Distance Optimization', status: 'In AI Defense', test: '5/5', testPct: '100%', aiScore: '...', aiStatus: 'Siswa Sedang Menjawab...', action: 'Live Session', actionColor: 'bg-slate-700' },
    { id: 4, name: 'Farhan Saputra', track: 'FS Data Analytics', task: 'MOD-W4-PY-01', taskDesc: 'Pandas Stream Processing & Memory Budget', status: 'Passed Judge', test: '4/4', testPct: '100%', aiScore: '8.4', aiStatus: 'Verified Paham', action: 'Inspect Q&A', actionColor: 'bg-slate-700' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0a0f1c] text-slate-300 overflow-hidden text-xs sm:text-sm">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0d1326] border-r border-slate-800 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-white">OJ</div>
            <div>
              <h1 className="font-bold text-slate-100 text-sm">SMK OJ HUB</h1>
              <p className="text-[10px] text-slate-500">v2.4 Telemetry • SoCS</p>
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-slate-500">TELEMETRY ENGINE</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> READY (8ms)
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider">Workspace</div>
          <nav className="space-y-1 px-2 mb-6">
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-md border-l-2 border-indigo-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"></path></svg>
              Dashboard & Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              Modul & Tracks (W1-W4)
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              AI Defense Engine
            </a>
          </nav>

          <div className="px-4 mb-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider">Administration</div>
          <nav className="space-y-1 px-2">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-md">Manajemen Tugas</a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-md">Leaderboard & Prep</a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-md">Settings & Permissions</a>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className="h-14 border-b border-slate-800 bg-[#0d1326] flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-6 text-xs">
            <div className="flex bg-slate-900 rounded-md p-0.5 border border-slate-700">
              <button className="px-3 py-1 text-slate-400 hover:text-slate-200 rounded">Guru/Lead</button>
              <button className="px-3 py-1 bg-slate-700 text-slate-200 rounded shadow">Admin/Asisten</button>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Siswa (Ahmad - FE)</span>
              <span>Siklus: <span className="text-slate-200">Week 4 Aktif</span></span>
              <span>Siswa: <span className="text-slate-200">6 Terdaftar</span></span>
              <span>AI Defense: <span className="text-emerald-400">94.2% Passed</span></span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-xs">
              <div className="font-bold text-slate-200">Ahmad Fauzi</div>
              <div className="text-[10px] text-slate-500">ID: SMK-FE-004</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              AF
            </div>
          </div>
        </header>

        {/* DASHBOARD SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0f1c]">
          
          {/* HERO PANEL */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700 flex justify-between items-center shadow-lg">
            <div>
              <div className="text-[10px] text-emerald-400 font-mono mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> SYSTEM WORKSPACE v2.4 • ACTIVE CYCLE W4
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Selamat Datang, Lead Mentor<br/>(Pacar) & Asisten (Kamu)</h2>
              <p className="text-slate-400 text-xs max-w-xl">
                Pusat kendali evaluasi pemrograman SMK. Pantau integritas pemahaman siswa via AI Defense Engine, telusuri test matrix, dan persiapkan seleksi 14-Day Hackathon.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="flex flex-col items-center justify-center w-24 h-20 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700 text-[10px] text-slate-300 text-center gap-1 transition-colors">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                Guru/Lead<br/>Monitoring
              </button>
              <button className="flex flex-col items-center justify-center w-24 h-20 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700 text-[10px] text-slate-300 text-center gap-1 transition-colors">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                Admin/Asisten<br/>Triage & Test
              </button>
              <button className="flex flex-col items-center justify-center w-24 h-20 bg-indigo-600/20 border border-indigo-500 rounded-lg hover:bg-indigo-600/40 text-[10px] text-indigo-300 text-center gap-1 transition-colors">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                Siswa Track<br/>Defense Live
              </button>
            </div>
          </div>

          {/* 4 STATS CARDS */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#111827] p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Submissions Mingguan</div>
              <div className="flex items-end gap-3">
                <div className="text-4xl font-bold text-slate-100">148</div>
                <div className="text-xs text-emerald-400 mb-1 flex items-center">↑ 18%</div>
              </div>
              <div className="text-[10px] text-slate-500 mt-2">vs. Week 3 (125 submissions) • W4 Peak</div>
            </div>
            
            <div className="bg-[#111827] p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Pass Rate Judge Otomatis</div>
              <div className="flex items-end gap-3">
                <div className="text-4xl font-bold text-emerald-400">91.4%</div>
                <div className="text-[10px] text-slate-400 mb-1">318/348<br/>cases</div>
              </div>
              <div className="text-[10px] text-slate-500 mt-2">Unit Test Passing Speed • 8.2ms Avg</div>
            </div>

            <div className="bg-[#111827] p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">AI Defense Score Rata-Rata</div>
              <div className="flex items-end gap-2">
                <div className="text-4xl font-bold text-blue-400">8.7</div>
                <div className="text-sm text-slate-500 mb-1">/ 10.0</div>
              </div>
              <div className="text-[10px] text-slate-500 mt-2">Pemahaman Konseptual Kode • Optimal</div>
            </div>

            <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-900/50 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-2 flex justify-between">Flagged AI Cheating <span>⚠️</span></div>
              <div className="flex items-end gap-3">
                <div className="text-4xl font-bold text-rose-500">2</div>
                <div className="text-xs text-rose-400 mb-1">Insiden Terdeteksi</div>
              </div>
              <div className="text-[10px] text-slate-400 mt-2 flex justify-between items-center">Butuh Human Review <span className="bg-rose-600 text-white px-1.5 py-0.5 rounded text-[8px] font-bold uppercase">Pending</span></div>
            </div>
          </div>

          {/* MIDDLE GRID: CHART & MATRIX */}
          <div className="grid grid-cols-3 gap-6">
            
            {/* LINE CHART */}
            <div className="col-span-2 bg-[#111827] border border-slate-800 rounded-xl p-5">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-slate-200">Grafik Kinerja & Learning Velocity</h3>
                  <p className="text-[10px] text-slate-500">Telemetry Kemajuan 6 Siswa Berdasarkan Track (W1 - W4)</p>
                </div>
                <div className="bg-slate-800 text-[10px] px-2 py-1 rounded text-slate-300 border border-slate-700">Live Cohort</div>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={velocityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="frontend" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="backend" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="python" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="ai" stroke="#a855f7" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-4 text-[10px]">
                <div><span className="text-blue-400 font-bold">Frontend (2)</span><br/><span className="text-slate-400">96% Mastery</span></div>
                <div><span className="text-red-400 font-bold">Backend (1)</span><br/><span className="text-slate-400">89% Mastery</span></div>
                <div><span className="text-emerald-400 font-bold">Python Data (1)</span><br/><span className="text-slate-400">92% Mastery</span></div>
                <div><span className="text-purple-400 font-bold">AI / LLM (2)</span><br/><span className="text-slate-400">98% Mastery</span></div>
              </div>
            </div>

            {/* AI DEFENSE INTEGRITY MATRIX */}
            <div className="col-span-1 bg-[#111827] border border-slate-800 rounded-xl p-5 flex flex-col">
              <h3 className="font-bold text-slate-200 mb-1">AI Defense Integrity Matrix</h3>
              <p className="text-[10px] text-slate-500 mb-4">Verifikasi pemahaman kode vs AI Copy-Paste</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 flex items-center justify-center relative">
                  <span className="text-emerald-400 font-bold text-sm">94%</span>
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-emerald-500" strokeDasharray="94, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-300">Indeks Kemandirian Coding</div>
                  <div className="text-[10px] text-slate-500">5 dari 6 siswa lolos tes lisan/tanya-jawab arsitektur oleh LLM.</div>
                </div>
              </div>

              <div className="flex-1 space-y-3 text-xs">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 border-b border-slate-800 pb-1">
                  <span>DISTRIBUSI PEMAHAMAN SISWA</span>
                  <span>STATUS AI DEFENSE</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2"><span className="w-5 h-5 rounded bg-slate-800 text-[8px] flex items-center justify-center">AF</span> Ahmad Fauzi (FE React)</div>
                  <div className="text-emerald-400 text-[10px]">Score 9.5 •</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2"><span className="w-5 h-5 rounded bg-slate-800 text-[8px] flex items-center justify-center">BP</span> Budi Pratama (FE React)</div>
                  <div className="text-emerald-400 text-[10px]">Score 8.9 •</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-rose-400"><span className="w-5 h-5 rounded bg-rose-900/50 text-[8px] flex items-center justify-center text-rose-300">DK</span> Dewi Kusuma (BE Laravel)</div>
                  <div className="text-rose-400 text-[10px]">Score 5.2 (Flagged) •</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2"><span className="w-5 h-5 rounded bg-slate-800 text-[8px] flex items-center justify-center">FS</span> Farhan Saputra (Data Python)</div>
                  <div className="text-emerald-400 text-[10px]">Score 8.4 •</div>
                </div>
              </div>
              <button className="mt-4 w-full py-2 text-[10px] text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors text-center">Buka Telemetry Log Groq LLM &rarr;</button>
            </div>
          </div>

          {/* TABLE: HISTORY SUBMISI */}
          <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-200">History Submisi & Evaluasi Bertingkat</h3>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 ml-2">6 Total Siswa</span>
              </div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                Auto-refresh 5s
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b1120] text-[10px] uppercase text-slate-500 font-bold border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Siswa & Track</th>
                    <th className="px-4 py-3">ID Soal & Modul</th>
                    <th className="px-4 py-3">Judge Status</th>
                    <th className="px-4 py-3">Test Cases</th>
                    <th className="px-4 py-3">Skor AI Defense</th>
                    <th className="px-4 py-3 text-right">Aksi & Triage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {historyData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-300">{row.name}</div>
                        <div className="text-[10px] text-slate-500">{row.track}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-mono text-slate-400">{row.task}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[200px]">{row.taskDesc}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${row.status === 'Passed Judge' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-amber-900/30 text-amber-400'}`}>
                          • {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-300">{row.test}</div>
                        <div className="text-[10px] text-emerald-500">({row.testPct})</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`font-bold text-sm ${row.aiScore < 7 ? 'text-rose-400' : 'text-blue-400'}`}>{row.aiScore}</div>
                        <div className={`text-[10px] ${row.aiStatus.includes('Flagged') ? 'text-rose-500' : 'text-slate-500'}`}>{row.aiStatus}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className={`${row.actionColor} text-white px-3 py-1.5 rounded text-[10px] font-bold hover:brightness-110 transition-all`}>
                          {row.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}