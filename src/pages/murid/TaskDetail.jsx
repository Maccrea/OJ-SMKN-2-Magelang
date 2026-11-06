import { Clock, Book, MessageSquare, Terminal, FileCode, PlayCircle, Save, CheckCircle2 } from 'lucide-react';

export default function TaskDetail() {
  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 h-[calc(100vh-56px)] flex flex-col">
      
      {/* Task Header */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-800 shrink-0">
        <div>
          <div className="flex items-center gap-3 text-xs text-zinc-400 mb-1">
            <span className="flex items-center gap-1 border border-zinc-700 bg-zinc-800/50 px-2 py-0.5 rounded"><Book size={12}/> Baca Modul & Panduan</span>
            <span className="flex items-center gap-1 border border-zinc-700 bg-zinc-800/50 px-2 py-0.5 rounded"><MessageSquare size={12}/> Tanya Pak Hendra</span>
            <span className="flex items-center gap-1"><Clock size={12}/> Praktikum Pekan Ini • Tenggat Senin 23:59 WIB</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">Filter Transaksi Kantin Sekolah 🍜</h1>
        </div>
        <div className="text-right flex items-center gap-4">
          <div className="text-[10px] text-rose-400 font-medium">SISA WAKTU PENGERJAAN</div>
          <div className="flex gap-2 text-center text-zinc-200 font-mono text-xl">
            <div className="bg-[#121214] border border-zinc-800 rounded-lg px-3 py-1">06<div className="text-[8px] text-zinc-500 font-sans tracking-widest mt-1">HARI</div></div> <span className="pt-2 text-zinc-600">:</span>
            <div className="bg-[#121214] border border-zinc-800 rounded-lg px-3 py-1">23<div className="text-[8px] text-zinc-500 font-sans tracking-widest mt-1">JAM</div></div> <span className="pt-2 text-zinc-600">:</span>
            <div className="bg-[#121214] border border-zinc-800 rounded-lg px-3 py-1">42<div className="text-[8px] text-zinc-500 font-sans tracking-widest mt-1">MNT</div></div> <span className="pt-2 text-zinc-600">:</span>
            <div className="bg-[#121214] border border-zinc-800 rounded-lg px-3 py-1 text-rose-400">19<div className="text-[8px] text-zinc-500 font-sans tracking-widest mt-1 text-rose-500/50">DTK</div></div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* Left Col: Study Case & Q&A */}
        <div className="lg:col-span-5 flex flex-col gap-6 min-h-0 overflow-y-auto pr-2">
          
          {/* Study Case */}
          <div className="bg-[#121214] border border-zinc-800 rounded-xl flex flex-col">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="font-bold text-zinc-200 flex items-center gap-2"><Book size={16}/> Study Case</h3>
              <span className="text-[10px] text-zinc-500">Kompilasi JS/PHP</span>
            </div>
            <div className="p-5 text-sm text-zinc-300 font-mono leading-relaxed bg-[#09090b]/50">
              <p className="mb-4">Buat fungsi <code className="text-indigo-300 bg-indigo-500/10 px-1 rounded">filterKantinTransactions(items, filterOptions)</code> yang menerima list transaksi dan opsi filter.</p>
              <ul className="list-disc pl-5 space-y-2 mb-6 text-zinc-400">
                <li>Pencarian case-insensitive pada nama menu.</li>
                <li>Filter berdasarkan status: "SELESAI" atau "PENDING".</li>
                <li>Urutkan nominal terbesar ke terkecil.</li>
              </ul>
              <div className="text-[10px] text-zinc-500 mb-2 font-sans">Contoh Panggilan & Output</div>
              <div className="bg-[#09090b] border border-zinc-800 rounded p-3 text-xs text-zinc-400">
                <div className="text-zinc-500 italic">// Format Output: Array Object Terurut</div>
                <div>const hasil = filterKantinTransactions(dataKantin, {'{'}</div>
                <div className="pl-4">keyword: "bakso",</div>
                <div className="pl-4">status: "SELESAI"</div>
                <div>{'}'});</div>
                <div className="text-emerald-400/70 italic mt-2">{"// Return -> [{'id': 'TRX-18', 'total': 24000, ... }]"}</div>
              </div>
            </div>
            <div className="p-4 border-t border-zinc-800 flex gap-3 text-xs">
              <button className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 bg-zinc-800/50 px-3 py-1.5 rounded transition-colors"><FileCode size={14}/> Unduh Starter Code (.zip)</button>
              <button className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 bg-zinc-800/50 px-3 py-1.5 rounded transition-colors"><br size={14}/> {'{ }'} kantin-sample.json</button>
            </div>
          </div>

          {/* Q&A Argument Box */}
          <div className="bg-[#121214] border border-indigo-900/30 rounded-xl flex flex-col ring-1 ring-indigo-500/20">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="font-bold text-zinc-200 flex items-center gap-2"><MessageSquare size={16}/> Tanya Jawab Argumen</h3>
              <span className="text-[10px] font-bold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">Wajib Dijawab</span>
            </div>
            <div className="p-5">
              <div className="flex gap-3 mb-6 bg-[#09090b] p-4 rounded-lg border border-zinc-800">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-500/30">HK</div>
                <div>
                  <div className="text-[10px] text-zinc-500 mb-1">Bpk. Hendra Kurniawan, S.Kom. • Mentor RPL</div>
                  <p className="text-sm text-zinc-300 italic leading-relaxed">"Mengapa memilih built-in <code className="bg-zinc-800 px-1 rounded not-italic text-indigo-300 text-xs">filter()</code> dibanding loop <code className="bg-zinc-800 px-1 rounded not-italic text-indigo-300 text-xs">for</code> manual? Bagaimana efisiensi memorinya jika dataset transaksi mencapai ribuan baris di perangkat kantin?"</p>
                </div>
              </div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-xs font-medium text-zinc-400">Argumen & Penjelasan Logika Kamu:</label>
                <span className="text-[10px] text-zinc-500">214 karakter</span>
              </div>
              <textarea 
                className="w-full bg-[#09090b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none mb-3"
                rows="4"
                defaultValue="Saya memilih method filter() yang dikombinasikan dengan chaining sort() karena sintaks deklaratif mempermudah readability kode tim RPL. Untuk dataset 5.000 transaksi kantin, overhead call stack JavaScript engine V8 sangat minim dan memori tetap terjaga di bawah 2MB."
              ></textarea>
              <div className="flex justify-between items-center">
                <div className="text-[10px] text-emerald-400/80 flex items-center gap-1"><CheckCircle2 size={12}/> Tersimpan otomatis 3 menit lalu</div>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"><Save size={14}/> Simpan Argumen</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Editor & Test Suite */}
        <div className="lg:col-span-7 flex flex-col gap-6 min-h-0">
          
          {/* Fake Code Editor */}
          <div className="bg-[#121214] border border-zinc-800 rounded-xl flex flex-col flex-1 min-h-[300px]">
            <div className="flex justify-between items-center px-4 h-12 border-b border-zinc-800 bg-[#09090b] rounded-t-xl">
              <div className="flex gap-1 text-xs font-medium">
                <button className="px-3 py-1.5 bg-zinc-800 text-zinc-200 rounded-md">Editor Langsung</button>
                <button className="px-3 py-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 rounded-md">Unggah File (.js / .php)</button>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-zinc-400">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> JavaScript (Node.js 20)</span>
                <span className="flex items-center gap-1 border border-zinc-700 px-2 py-0.5 rounded text-zinc-300"><CheckCircle2 size={12}/> Syntax Valid</span>
              </div>
            </div>
            <div className="flex-1 bg-[#09090b] relative font-mono text-[13px] leading-relaxed overflow-hidden flex flex-col">
              <div className="flex justify-between items-center px-4 py-2 border-b border-zinc-800/50 text-[10px] text-zinc-500 bg-[#121214]/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div></div>
                  <span className="ml-2 text-zinc-400">solution_kantin.js</span>
                </div>
                <span>Tab: 2 Spaces • UTF-8</span>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                {/* Fake Syntax Highlighting */}
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">01</div><div className="text-indigo-400">function <span className="text-blue-300">filterKantinTransactions</span><span className="text-zinc-300">(transactions, keyword) {'{'}</span></div></div>
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">02</div><div className="text-zinc-600 italic">{'  '}// Validasi pertahanan input awal</div></div>
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">03</div><div className="text-zinc-300">{'  '}if (!Array.isArray(transactions)) return [];</div></div>
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">04</div></div>
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">05</div><div className="text-zinc-600 italic">{'  '}// Immutable pipeline: Filter status PAID & keyword match</div></div>
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">06</div><div className="text-zinc-300">{'  '}<span className="text-indigo-400">const</span> term = (keyword || <span className="text-emerald-300">""</span>).toLowerCase();</div></div>
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">07</div><div className="text-zinc-300">{'  '}return transactions</div></div>
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">08</div><div className="text-zinc-300">{'    '}.filter(tx ={'>'} tx.status === <span className="text-emerald-300">'PAID'</span>)</div></div>
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">09</div><div className="text-zinc-300">{'    '}.filter(tx ={'>'} tx.item.toLowerCase().includes(term))</div></div>
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">10</div><div className="text-zinc-300">{'    '}.slice()</div></div>
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">11</div><div className="text-zinc-300">{'    '}.sort((a, b) ={'>'} b.price - a.price);</div></div>
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">12</div><div className="text-zinc-300">{'}'}</div></div>
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">13</div></div>
                <div className="flex"><div className="w-8 text-zinc-700 select-none text-right pr-4">14</div><div className="text-zinc-300">module.exports = {'{'} filterKantinTransactions {'}'};</div></div>
              </div>
            </div>
            <div className="px-4 py-3 bg-[#121214] border-t border-zinc-800 rounded-b-xl flex justify-between items-center">
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 px-3 py-1.5"><Clock size={14}/> Reset Kode</button>
                <button className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 px-3 py-1.5"><Save size={14}/> Simpan Draf</button>
              </div>
              <button className="bg-indigo-200 hover:bg-indigo-300 text-indigo-950 font-bold px-5 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors"><PlayCircle size={16} className="fill-indigo-950 text-indigo-200"/> Kirim & Jalankan Uji Otomatis</button>
            </div>
          </div>

          {/* Test Runner Suite Results */}
          <div className="bg-[#121214] border border-zinc-800 rounded-xl flex flex-col shrink-0">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/20"><Terminal size={16}/></div>
                <div>
                  <h3 className="font-bold text-zinc-200 text-sm">B.O.S Runtime Test Suite</h3>
                  <div className="text-[10px] text-zinc-500">Hasil build #4928 • 10 Menit lalu</div>
                </div>
              </div>
              <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 5/5 Lolos (100% Akurasi)
              </div>
            </div>
            
            <div className="grid grid-cols-3 divide-x divide-zinc-800 border-b border-zinc-800">
              <div className="p-4 text-center">
                <div className="text-[10px] text-zinc-500 mb-1">Execution Time</div>
                <div className="text-xl font-mono text-zinc-200">12.4 ms</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-[10px] text-zinc-500 mb-1">Memory Usage</div>
                <div className="text-xl font-mono text-zinc-200">1.8 MB</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-[10px] text-zinc-500 mb-1">Code Style Score</div>
                <div className="text-xl font-mono text-zinc-200">A+ Clean</div>
              </div>
            </div>

            <div className="p-2 space-y-1 bg-[#09090b] rounded-b-xl">
              {[
                { name: "Filter nama menu case-insensitive ('soto' vs 'SOTO')", time: "2.1ms" },
                { name: "Filter status transaksi ('PENDING' & 'SELESAI')", time: "1.8ms" },
                { name: "Sort descending berdasarkan harga transaksi terbesar", time: "3.2ms" },
                { name: "Handling input empty array tanpa throw error", time: "1.4ms" },
                { name: "Stress test dataset 2.500 transaksi < 30ms", time: "3.9ms" }
              ].map((test, i) => (
                <div key={i} className="flex justify-between items-center px-4 py-2 hover:bg-zinc-800/30 rounded">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <CheckCircle2 size={14} className="text-emerald-500" /> TC-0{i+1}: {test.name}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono">PASSED ({test.time})</div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}