import { Link } from 'react-router-dom';

export default function ModulTracks() {
  return (
    <div className="flex h-screen w-full bg-[#0a0f1c] text-slate-300 overflow-hidden text-xs sm:text-sm font-sans">
      
      {/* SIDEBAR (Dipertahankan agar konsisten dengan Dashboard) */}
      <aside className="w-64 bg-[#0d1326] border-r border-slate-800 flex flex-col flex-shrink-0 z-10">
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
            <Link to="/" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"></path></svg>
              Dashboard & Overview
            </Link>
            {/* Menu Modul & Tracks Aktif */}
            <Link to="/modul" className="flex items-center gap-3 px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-md border-l-2 border-indigo-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              Modul & Tracks (W1-W4)
            </Link>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              AI Defense Engine
            </a>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
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
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">AF</div>
          </div>
        </header>

        {/* CONTENT SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* HEADER AREA */}
          <div className="flex justify-between items-end border-b border-slate-800 pb-4">
            <div>
              <div className="text-[10px] text-emerald-400 font-mono mb-2 flex items-center gap-2">
                TELEMETRY RUNNER v2.4 • SoCS Curriculum Hub
              </div>
              <h2 className="text-2xl font-bold text-white">Hierarchical Task Explorer</h2>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-300 text-xs font-bold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg> Tambah Task Baru
              </button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-300 text-xs font-bold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Download Boilerplate
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white text-xs font-bold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg> Test Suite Matrix
              </button>
            </div>
          </div>

          {/* BREADCRUMB PROGRESS */}
          <div className="flex gap-4">
            <div className="flex-1 p-3 bg-[#111827] border border-emerald-900/50 rounded-lg">
              <div className="text-[10px] text-emerald-400 font-bold mb-1 flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> SELESAI (100%) <span className="ml-auto text-slate-600">W1</span></div>
              <div className="font-bold text-slate-300 text-xs">Week 1: Foundations</div>
              <div className="text-[10px] text-slate-500 truncate">Sintaks Inti, Git Flow & Algoritma D...</div>
            </div>
            <div className="flex-1 p-3 bg-[#111827] border border-emerald-900/50 rounded-lg">
              <div className="text-[10px] text-emerald-400 font-bold mb-1 flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> SELESAI (100%) <span className="ml-auto text-slate-600">W2</span></div>
              <div className="font-bold text-slate-300 text-xs">Week 2: Frameworks</div>
              <div className="text-[10px] text-slate-500 truncate">Komponen State, MVC & ORM Sch...</div>
            </div>
            <div className="flex-1 p-3 bg-[#111827] border border-emerald-900/50 rounded-lg">
              <div className="text-[10px] text-emerald-400 font-bold mb-1 flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> SELESAI (100%) <span className="ml-auto text-slate-600">W3</span></div>
              <div className="font-bold text-slate-300 text-xs">Week 3: Integrations</div>
              <div className="text-[10px] text-slate-500 truncate">REST APIs, Auth JWT & Pipeline D...</div>
            </div>
            <div className="flex-1 p-3 bg-indigo-900/20 border border-indigo-500/50 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <div className="text-[10px] text-indigo-400 font-bold mb-1 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> SIKLUS AKTIF <span className="ml-auto text-slate-600">W4</span></div>
              <div className="font-bold text-indigo-200 text-xs">Week 4: Advanced Capstone</div>
              <div className="text-[10px] text-indigo-300/70 truncate">Scalability, AI Engine Defense & D...</div>
            </div>
          </div>

          <div className="text-[10px] font-bold text-slate-500 flex justify-between items-center mt-6">
            <span>TRACKS TERPILIH • WEEK 4 - 4 Bidang Keahlian</span>
            <span>Klik tab track untuk memfilter antrian tugas</span>
          </div>

          {/* 4 TRACK CARDS */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#111827] border border-slate-700 p-4 rounded-xl relative cursor-pointer ring-1 ring-slate-600">
              <div className="flex justify-between items-start mb-3">
                <div className="p-1.5 bg-slate-800 rounded text-slate-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                <div className="text-[10px] text-slate-500 font-bold">2 Siswa Terdaftar</div>
              </div>
              <h3 className="font-bold text-slate-200 text-sm mb-1">Track 1: Frontend</h3>
              <p className="text-[10px] text-slate-400 font-mono mb-2">Tailwind - React Architecture</p>
              <p className="text-[10px] text-slate-500 line-clamp-2 mb-4">Komposisi kustom hooks, caching level memori, suspens...</p>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 border border-[#111827] flex items-center justify-center text-[8px] font-bold text-white">FJ</div>
                  <div className="w-6 h-6 rounded-full bg-blue-600 border border-[#111827] flex items-center justify-center text-[8px] font-bold text-white">RN</div>
                </div>
                <div className="text-[10px] font-bold text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded">2 Tasks Open</div>
              </div>
            </div>
            
            <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
               <div className="flex justify-between items-start mb-3">
                <div className="p-1.5 bg-slate-800 rounded text-slate-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg></div>
                <div className="text-[10px] text-slate-500 font-bold">1 Siswa</div>
              </div>
              <h3 className="font-bold text-slate-200 text-sm mb-1">Track 2: Backend</h3>
              <p className="text-[10px] text-slate-400 font-mono mb-2">PHP Native - Laravel Sanctum</p>
              <p className="text-[10px] text-slate-500 line-clamp-2 mb-4">Queue workers, Redis throttler, rate limit transaction, dan test...</p>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-rose-600 border border-[#111827] flex items-center justify-center text-[8px] font-bold text-white">DK</div>
                </div>
                <div className="text-[10px] font-bold text-slate-400">3 Tasks</div>
              </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
               <div className="flex justify-between items-start mb-3">
                <div className="p-1.5 bg-slate-800 rounded text-slate-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></div>
                <div className="text-[10px] text-slate-500 font-bold">1 Siswa</div>
              </div>
              <h3 className="font-bold text-slate-200 text-sm mb-1">Track 3: Data & Automasi</h3>
              <p className="text-[10px] text-slate-400 font-mono mb-2">Python ETL - Celery Pipeline</p>
              <p className="text-[10px] text-slate-500 line-clamp-2 mb-4">Scraping asinkron, validasi skema data, transform pandas...</p>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 border border-[#111827] flex items-center justify-center text-[8px] font-bold text-white">ST</div>
                </div>
                <div className="text-[10px] font-bold text-slate-400">2 Tasks</div>
              </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
               <div className="flex justify-between items-start mb-3">
                <div className="p-1.5 bg-slate-800 rounded text-slate-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
                <div className="text-[10px] text-slate-500 font-bold">2 Siswa</div>
              </div>
              <h3 className="font-bold text-slate-200 text-sm mb-1">Track 4: AI & LLM</h3>
              <p className="text-[10px] text-slate-400 font-mono mb-2">RAG System - Groq Engine</p>
              <p className="text-[10px] text-slate-500 line-clamp-2 mb-4">Integrasi Llama 3.3, prompt guardrails, semantic cache, da...</p>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-amber-600 border border-[#111827] flex items-center justify-center text-[8px] font-bold text-white">BY</div>
                  <div className="w-6 h-6 rounded-full bg-purple-600 border border-[#111827] flex items-center justify-center text-[8px] font-bold text-white">KV</div>
                </div>
                <div className="text-[10px] font-bold text-slate-400">3 Tasks</div>
              </div>
            </div>
          </div>

          {/* MAIN TWO-COLUMN LAYOUT */}
          <div className="flex gap-6 items-start">
            
            {/* LEFT COL: TASK LIST */}
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                  Daftar Modul Evaluasi: Frontend React
                </h3>
                <span className="text-[10px] text-slate-500">Tugas Minggu 4 / 3 Modul</span>
              </div>

              {/* Task 1 */}
              <div className="bg-[#111827] border border-slate-700 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-slate-800">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-900/30 px-2 py-0.5 rounded">TASK-W4-01</span>
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 2/2 Siswa Submitted</span>
                      <span className="text-[10px] text-slate-500 font-mono">Core Logic</span>
                    </div>
                    <button className="text-[10px] text-slate-400 hover:text-white bg-slate-800 px-3 py-1 rounded border border-slate-700 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> Inspeksi Submisi Siswa
                    </button>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-4">React Custom Hook + Infinite Query Pagination & Error Boundary</h4>
                  
                  <div className="flex gap-8 text-[10px]">
                    <div><div className="text-slate-500 mb-1">AUTOMATED JUDGE</div><div className="text-emerald-400 font-bold text-sm">8/8 Passed</div></div>
                    <div><div className="text-slate-500 mb-1">DEFENSE AVG</div><div className="text-white font-bold text-sm">9.2<span className="text-slate-500 text-[10px]">/10</span></div></div>
                    <div><div className="text-slate-500 mb-1">MAX LATENCY</div><div className="text-white font-bold text-sm">14.8 <span className="text-slate-500 text-[10px]">ms</span></div></div>
                    <div><div className="text-slate-500 mb-1">SUBMISSION RATE</div><div className="text-white font-bold text-sm">100%</div></div>
                  </div>
                </div>
                
                <div className="p-5 bg-slate-900/50">
                  <div className="text-[10px] text-slate-500 font-bold mb-2">SPESIFIKASI & PERSYARATAN TUGAS:</div>
                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    Implementasikan Custom Hook <code className="bg-slate-800 text-indigo-300 px-1 py-0.5 rounded font-mono text-[10px]">useInfiniteTelemetry(endpoint, options)</code> yang menangani pagination berbasis kursor, retry backoff eksponensial (maks 3 kali percobaan), serta isolasi error rendering menggunakan React Error Boundary komponen tingkat atomik.
                  </p>
                  <ul className="list-disc pl-4 text-[10px] text-slate-400 space-y-1 mb-4">
                    <li>State deduplication menggunakan Set untuk ID submission unik.</li>
                    <li>AbortController sinyal harus ditrigger saat komponen ter-unmount sebelum request tuntas.</li>
                    <li>Pertanyaan AI Defense: Mahasiswa harus menjelaskan alasan memilih cursor-based pagination dibanding offset limit standar.</li>
                  </ul>
                  
                  {/* Test Runner Block */}
                  <div className="bg-[#0b1120] border border-slate-800 rounded p-4 font-mono text-[10px]">
                    <div className="flex justify-between items-center text-emerald-500 mb-3 border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> TEST RUNNER RUNTIME SPECIFICATION (SUITE: TC-01 → TC-08)</div>
                      <div className="font-bold">PASS ALL RUNS</div>
                    </div>
                    <div className="flex gap-4 text-slate-400">
                      <div className="flex-1">
                        <div className="text-slate-500 mb-1">SAMPLE INPUT (Test #3: Cursor Invalidation)</div>
                        <div className="text-indigo-300">{"{"}"endpoint": "/api/v1/telemetry", "cursor": "c_9948a", "pageSize": 15, "simulateAbort": true{"}"}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-slate-500 mb-1">EXPECTED OUTPUT ASSERTION</div>
                        <div className="text-emerald-300">{"{"}"status": "ABORTED", "retainedStateCount": 45, "hasMore": true, "errorBoundaryCaught": false{"}"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task 2 */}
              <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden opacity-80">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-900/30 px-2 py-0.5 rounded">TASK-W4-02</span>
                      <span className="text-[10px] text-amber-400 flex items-center gap-1"><svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> 1/2 Submitted • 1 In Progress</span>
                    </div>
                    <div className="text-[10px] text-rose-400 font-bold">Tenggat: 23:59 WIB Hari Ini</div>
                  </div>
                  <h4 className="text-md font-bold text-white mb-2">State Persistence & Optimistic UI Updates</h4>
                  <p className="text-[10px] text-slate-400 mb-4">Menerapkan mekanisme antrean mutasi offline menggunakan IndexedDB dengan fallback localStorage. UI harus menampilkan nilai instan sebelum konfirmasi respon server 200 OK.</p>
                  
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-800 flex justify-between items-center text-[10px]">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Fajar: Submitted (TC: 10/10)</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Rian: Sedang Mengerjakan (Repo active 14m ago)</div>
                    <button className="text-slate-400 hover:text-white flex items-center gap-1">Detail Evaluasi <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
                  </div>
                </div>
              </div>
              
              {/* Task 3 Upcoming */}
               <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden opacity-50">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded">TASK-W4-03 [UPCOMING] Capstone Prep Final</span>
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <h4 className="text-md font-bold text-slate-300 mb-2">Full Responsive Telemetry Dashboard with Custom CSS Token Switcher</h4>
                  <p className="text-[10px] text-slate-500">Penggabungan seluruh modul hook dengan visual chart SVG dinamis, zero CSS runtime overhead, dan evaluasi performa Lighthouse 95+. Rilis otomatis setelah Task 01 & 02 terverifikasi.</p>
                </div>
               </div>

            </div>

            {/* RIGHT COL: SUBMISSION & DEFENSE STATUS */}
            <div className="w-80 flex-shrink-0 flex flex-col gap-4">
              
              <div className="bg-[#111827] border border-slate-700 rounded-xl overflow-hidden shadow-lg">
                <div className="p-4 border-b border-slate-800 flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Submission &<br/>Defense Status</h3>
                    <p className="text-[9px] text-slate-400">W4-Track 1</p>
                  </div>
                  <div className="p-2 bg-indigo-900/30 rounded-lg text-indigo-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  </div>
                </div>
                <div className="p-4 bg-[#0a0f1c]">
                  <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">Hasil evaluasi ganda: Online Judge unit testing otomatis dan evaluasi pertahanan kode berbasis LLM (Groq Llama 3.3).</p>
                  
                  {/* Status 1: Verified */}
                  <div className="bg-[#111827] border border-slate-700 rounded-lg p-3 mb-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full"></div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center font-bold text-white text-[10px]">FJ</div>
                        <div>
                          <div className="font-bold text-white text-xs">Fajar Nugraha</div>
                          <div className="text-[9px] text-slate-500">SMK-FE-001 • 14 menit lalu</div>
                        </div>
                      </div>
                      <div className="text-[9px] font-bold text-emerald-400 bg-emerald-900/40 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> TERVERIFIKASI
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] mb-3">
                      <div><span className="text-slate-500 block mb-0.5">JUDGE RUNNER</span><span className="font-bold text-emerald-400">8/8 PASSED</span> <span className="text-slate-500">(12ms)</span></div>
                      <div className="text-right"><span className="text-slate-500 block mb-0.5">AI DEFENSE SCORE</span><span className="font-bold text-white text-sm">9.5 <span className="text-slate-500 text-[10px]">/ 10.0</span></span></div>
                    </div>
                    <div className="bg-slate-900 rounded p-2 text-[10px] text-slate-400 border border-slate-800">
                      <span className="text-emerald-400 mr-1">✓</span> Refleksi arsitektur jelas: Mahasiswa menguasai konsep unmount cleanup dan mencegah stale closures.
                    </div>
                    <button className="w-full text-center text-[10px] text-slate-500 hover:text-slate-300 mt-2 font-mono">Lihat Snapshot Kode →</button>
                  </div>

                  {/* Status 2: Flagged */}
                  <div className="bg-[#111827] border border-rose-900/50 rounded-lg p-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-bl-full"></div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">RN</div>
                        <div>
                          <div className="font-bold text-white text-xs">Rian Pratama</div>
                          <div className="text-[9px] text-slate-500">SMK-FE-002 • 1 jam lalu</div>
                        </div>
                      </div>
                      <div className="text-[9px] font-bold text-rose-400 bg-rose-900/40 px-1.5 py-0.5 rounded flex items-center gap-1 border border-rose-800/50">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg> FLAGGED DEFENSE
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] mb-3">
                      <div><span className="text-slate-500 block mb-0.5">JUDGE RUNNER</span><span className="font-bold text-emerald-400">8/8 PASSED</span> <span className="text-slate-500">(14ms)</span></div>
                      <div className="text-right"><span className="text-slate-500 block mb-0.5">AI DEFENSE SCORE</span><span className="font-bold text-rose-400 text-sm">6.2 <span className="text-slate-500 text-[10px]">/ 10.0</span></span></div>
                    </div>
                    <div className="bg-rose-950/30 rounded p-2 text-[10px] text-rose-300/80 border border-rose-900/50 mb-3">
                      <span className="text-rose-400 font-bold mr-1">⚠ Catatan Asisten AI:</span> Kode lulus unit test, namun jawaban reflektif terkait alur error boundary identik dengan template generic AI. Butuh konfirmasi sesi mentor 1-on-1.
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-rose-900/40 hover:bg-rose-900/60 border border-rose-800 text-rose-300 text-[10px] font-bold py-1.5 rounded">Jadwalkan Oral Defense</button>
                      <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold py-1.5 rounded">Review Jawaban</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Distribusi Siswa Summary */}
              <div className="bg-[#111827] border border-slate-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">DISTRIBUSI SISWA SoCS</div>
                  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <div className="flex justify-between items-end mb-4">
                  <div className="text-xs text-slate-400">Total Siswa Aktif:</div>
                  <div className="text-xl font-bold text-white">6 Siswa</div>
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> 2 FE</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> 1 BE</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> 1 PY</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> 2 AI</div>
                </div>
              </div>

            </div>
          </div>
          
        </div>

        {/* BOTTOM FOOTER STATUS */}
        <footer className="h-8 border-t border-slate-800 bg-[#0d1326] flex items-center justify-between px-6 text-[9px] font-mono text-slate-500 flex-shrink-0 absolute bottom-0 w-full z-10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Groq Llama 3.3</span>
            <span className="text-emerald-400">ONLINE</span>
            <span className="text-slate-600">|</span>
            <span>SMK OJ & Mentorship Hub • SoCS Edition</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Judge Runner: <span className="text-emerald-400">OK</span></span>
            <span className="text-slate-600">•</span>
            <span>Groq Llama 3.3 Defense Engine: <span className="text-emerald-400">Online</span></span>
          </div>
        </footer>

      </main>
    </div>
  );
}