import { useParams, Link } from 'react-router-dom';

export default function TaskDetail() {
  const { id } = useParams();

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Kolom Soal */}
      <div className="lg:w-2/3 bg-white border border-slate-300 rounded shadow-sm p-6 flex flex-col h-full">
        <div className="border-b border-slate-200 pb-4 mb-4">
          <Link to="/" className="text-sm text-blue-600 hover:underline mb-2 inline-block">&larr; Kembali ke Dashboard</Link>
          <h1 className="text-2xl font-bold text-slate-900">Task #{id}: Manipulasi State React</h1>
        </div>
        
        <div className="prose prose-slate max-w-none text-sm leading-relaxed">
          <p><strong>Tujuan:</strong> Buat sebuah komponen <code>Counter.jsx</code> yang mengimplementasikan <code>useState</code>.</p>
          <h4 className="font-bold mt-4 mb-2">Spesifikasi:</h4>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>Terdapat tombol tambah dan kurang.</li>
            <li>Nilai tidak boleh berada di bawah angka 0.</li>
            <li>Gunakan Tailwind CSS untuk styling tombol.</li>
          </ul>
          
          <div className="bg-slate-100 p-4 border border-slate-300 rounded font-mono text-xs text-slate-700 mt-4">
            <p>// Contoh ekspektasi output struktural</p>
            <p>&lt;div className="flex gap-2"&gt;</p>
            <p>  &lt;button onClick=&#123;decrement&#125;&gt;-&lt;/button&gt;</p>
            <p>  &lt;span&gt;&#123;count&#125;&lt;/span&gt;</p>
            <p>  &lt;button onClick=&#123;increment&#125;&gt;+&lt;/button&gt;</p>
            <p>&lt;/div&gt;</p>
          </div>
        </div>
      </div>

      {/* Kolom Submission */}
      <div className="lg:w-1/3 bg-slate-50 border border-slate-300 rounded shadow-sm p-6 h-fit">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Submission Area</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Link Commit GitHub
            </label>
            <input 
              type="url" 
              placeholder="https://github.com/..." 
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Atau Paste Snippet Code
            </label>
            <textarea 
              rows="8" 
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="// Paste kode spesifikmu di sini..."
            ></textarea>
          </div>
          
          <button 
            type="button" 
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded text-sm transition-colors"
          >
            Submit & Jalankan Test
          </button>
        </form>

        <div className="mt-6 border-t border-slate-200 pt-4">
          <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            Status: Menunggu Submission
          </h3>
          <p className="text-xs text-slate-500">
            Setelah disubmit, sistem akan melakukan pengecekan linter dan AI Defense Question.
          </p>
        </div>
      </div>
    </div>
  );
}