import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, UserPlus, FileDown, ShieldAlert, Monitor, ChevronRight } from 'lucide-react';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        // Ganti URL jika port Laravel berbeda
        const response = await axios.get('http://localhost:8000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          setError('Format data dari server tidak sesuai.');
        }
      } catch (err) {
        setError('Gagal memuat data pengguna. Pastikan Anda memiliki akses Admin.');
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-zinc-400 p-8">Memuat data pengguna...</div>;
  if (error) return <div className="text-rose-500 p-8">{error}</div>;

  // Filter berdasarkan role untuk header summary (Sesuai referensi gambar)
  const studentCount = users.filter(u => u.role === 'siswa').length;
  const mentorCount = users.filter(u => u.role === 'mentor').length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const totalUsers = users.length;

  return (
    <div className="max-w-[1400px] mx-auto p-6 text-zinc-300">
        {/* --- Header Section (Sesuai Referensi Gambar) --- */}
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-6">
          <div>
            <div className="text-xs text-zinc-500 mb-1 flex items-center gap-2">
               <Monitor size={14} /> Konsol Admin / Tahun Ajaran 2024/2025 / Manajemen Pengguna
            </div>
            <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
              Kelola User & Peran Praktikum 
              <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-md font-normal">{totalUsers} Akun Aktif</span>
            </h1>
            <p className="text-sm text-zinc-400 mt-2">Pusat kendali hak akses akun siswa vokasi, tim guru penguji, dan administrator lab RPL SMK.</p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors border border-zinc-700">
              <FileDown size={16} /> Impor Dapodik/CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors">
              <UserPlus size={16} /> Tambah Pengguna
            </button>
          </div>
        </div>

        {/* --- Summary Cards (Statistik Role) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Card Siswa */}
          <div className="bg-[#121214] border border-zinc-800 rounded-xl p-5 flex flex-col">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Siswa Vokasi RPL</h3>
            <div className="text-3xl font-bold text-zinc-100 mb-4">{studentCount}</div>
            <div className="flex justify-between text-[10px] mt-auto border-t border-zinc-800 pt-3">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> FE: {users.filter(u => u.track?.name === 'Frontend').length}</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> BE: {users.filter(u => u.track?.name === 'Backend').length}</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> AI: {users.filter(u => u.track?.name === 'AI').length}</span>
            </div>
          </div>

          {/* Card Guru/Mentor */}
          <div className="bg-[#121214] border border-zinc-800 rounded-xl p-5">
             <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Guru & Pembina Lab</h3>
             <div className="text-3xl font-bold text-zinc-100 mb-2">{mentorCount} Pengajar</div>
             <p className="text-[10px] text-zinc-400 mt-auto border-t border-zinc-800 pt-3 flex items-center gap-1">
                <ShieldAlert size={12}/> Hak Akses: Penilai & Korektor
             </p>
          </div>

           {/* Card Admin */}
           <div className="bg-[#121214] border border-zinc-800 rounded-xl p-5">
             <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Admin & Devops Lab</h3>
             <div className="text-3xl font-bold text-zinc-100 mb-2">{adminCount} Superuser</div>
             <p className="text-[10px] text-zinc-400 mt-auto border-t border-zinc-800 pt-3">Izin Root & Server Cluster</p>
          </div>
        </div>

        {/* --- Data Table Section --- */}
        <div className="bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden">
            {/* Table Header/Toolbar */}
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-[#09090b]">
               <div className="relative w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Cari nama, NISN/NIP, atau email..." 
                    className="w-full bg-[#121214] border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-zinc-600"
                  />
               </div>
               <div className="flex gap-2">
                   <button className="px-3 py-1.5 bg-zinc-800 text-xs rounded text-zinc-300">Semua ({totalUsers})</button>
                   <button className="px-3 py-1.5 bg-transparent hover:bg-zinc-800 text-xs rounded text-zinc-500 transition-colors">Siswa ({studentCount})</button>
               </div>
            </div>

            {/* The Table */}
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-zinc-800 bg-[#09090b]">
                        <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Pengguna & Identitas</th>
                        <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Spesialisasi & Role</th>
                        <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-zinc-800/30 transition-colors group">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-400 border border-zinc-700">
                                        {user.name.substring(0,2).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="font-medium text-zinc-200 flex items-center gap-2">
                                            {user.name} 
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded-sm ${user.role === 'admin' ? 'bg-rose-500/20 text-rose-400' : 'bg-zinc-800 text-zinc-400'}`}>
                                                {user.role}
                                            </span>
                                        </div>
                                        <div className="text-xs text-zinc-500 mt-0.5 flex gap-2">
                                            <span>{user.nisn || 'N/A'}</span>
                                            {user.email && <span>• {user.email}</span>}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-300">
                                    <Monitor size={14} className="text-zinc-500" />
                                    {user.role === 'siswa' ? `Siswa - ${user.track?.name || 'Belum Pilih Track'}` : 'Admin Sistem'}
                                </div>
                            </td>
                            <td className="p-4 text-right">
                                <button className="p-2 text-zinc-500 hover:text-indigo-400 transition-colors rounded-lg hover:bg-indigo-500/10 opacity-0 group-hover:opacity-100">
                                    <ChevronRight size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}