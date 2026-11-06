import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Lock, UserCircle, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  
  // State untuk menyimpan input user dan error
  const [nisn, setNisn] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      // Tembak API Laravel
      const response = await axios.post('http://localhost:8000/api/login', {
        nisn: nisn,
        password: password
      });

      if (response.data.success) {
        // Simpan token dan data user ke penyimpanan browser
        localStorage.setItem('auth_token', response.data.access_token);
        localStorage.setItem('user_data', JSON.stringify(response.data.user));

        // Arahkan berdasarkan role (siswa atau admin)
        const userRole = response.data.user.role;
        if (userRole === 'admin' || userRole === 'mentor') {
          navigate('/admin'); 
        } else {
          navigate('/dashboard'); 
        }
      }
    } catch (error) {
      setErrorMsg('Gagal masuk. Cek kembali NISN dan Kata Sandi kamu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#09090b] p-4">
      <div className="w-full max-w-md bg-[#121214] border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-4 border border-indigo-500/30">
            <Terminal size={24} />
          </div>
          <h1 className="text-2xl font-bold text-zinc-100 mb-2">Selamat Datang di Lab B.O.S 👋</h1>
          <p className="text-sm text-zinc-400">Masuk ke sesi praktikum coding terpadu dan ruang kolaborasi belajar hari ini.</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/50 text-rose-400 text-xs rounded-lg text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-xs font-medium text-zinc-300">NISN / Nomor Induk Siswa</label>
              <span className="text-[10px] text-zinc-500">Gunakan NISN Dapodik</span>
            </div>
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                placeholder="Contoh: 0054321980" 
                className="w-full bg-[#09090b] border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-zinc-700" 
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-xs font-medium text-zinc-300">Kata Sandi</label>
              <a href="#" className="text-[10px] text-zinc-500 hover:text-indigo-400">Lupa sandi?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-[#09090b] border border-zinc-800 rounded-lg py-2.5 pl-10 pr-10 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" 
                required
              />
              <div 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer hover:text-zinc-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-indigo-200 hover:bg-indigo-300 text-indigo-950 font-bold py-3 rounded-lg text-sm transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Mengecek Data...' : 'Masuk ke Sesi Lab 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
}