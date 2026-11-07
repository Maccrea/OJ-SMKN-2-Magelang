import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, UserPlus, FileDown, ShieldAlert, Monitor, ChevronRight, Info, Edit3, Settings } from 'lucide-react';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await axios.get('http://localhost:8000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setUsers(response.data.data);
          if(response.data.data.length > 0) setSelectedUser(response.data.data[0]); // Pilih user pertama otomatis
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="text-zinc-400 p-8 flex justify-center items-center h-screen">Memuat data pengguna...</div>;

  const studentCount = users.filter(u => u.role === 'siswa').length;
  const totalUsers = users.length;

  return (
    <div className="max-w-[1400px] mx-auto p-6 text-zinc-300 grid grid-cols-1 xl:grid-cols-12 gap-6 pb-20">
      
      {/* Kolom Kiri: Header & Tabel */}
      <div className="xl:col-span-9 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b border-zinc-800 pb-6">
          <div>
            <div className="text-[10px] text-zinc-500 mb-2 flex items-center gap-2">
                <Monitor size={12} /> Konsol Admin / Tahun Ajaran 2024/2025 / Manajemen Pengguna
            </div>
            <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3 mb-2">
              Kelola User & Peran Praktikum 
              <span className="text-[10px] bg-zinc-800/80 text-zinc-400 px-2 py-1 rounded border border-zinc-700 font-medium tracking-wide">{totalUsers} Akun Aktif</span>
            </h1>
            <p className="text-xs text-zinc-400">Pusat kendali hak akses akun siswa vokasi, tim guru penguji, dan administrator lab RPL.</p>
          </div>
          <div className="flex gap-2 text-xs">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#121214] hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-800 transition-colors"><FileDown size={14} /> Impor Dapodik/CSV</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-950 font-bold rounded-lg transition-colors"><UserPlus size={14} /> Tambah Pengguna</button>
          </div>
        </div>

        {/* Tabel */}
        <div className="bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-[#09090b]">
             <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                <input type="text" placeholder="Cari nama, NISN, atau email..." className="w-full bg-[#121214] border border-zinc-800 rounded-lg py-2 pl-9 pr-4 text-xs focus:border-indigo-500 transition-colors" />
             </div>
             <div className="flex gap-1 text-[10px]">
                 <button className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded">Semua ({totalUsers})</button>
                 <button className="px-3 py-1.5 hover:bg-zinc-800/50 text-zinc-500 rounded">Siswa Vokasi ({studentCount})</button>
             </div>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[#09090b] border-b border-zinc-800">
              <tr>
                <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Pengguna & Identitas</th>
                <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Spesialisasi & Role</th>
                <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {users.map(user => (
                <tr key={user.id} onClick={() => setSelectedUser(user)} className={`cursor-pointer transition-colors ${selectedUser?.id === user.id ? 'bg-indigo-500/5' : 'hover:bg-zinc-800/30'}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-400 text-xs">{user.name.substring(0,2).toUpperCase()}</div>
                      <div>
                        <div className="font-bold text-zinc-200 text-sm flex items-center gap-2">{user.name} </div>
                        <div className="text-[10px] text-zinc-500 mt-0.5">NISN: {user.nisn || '-'} • {user.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-[10px] text-zinc-300">
                      <Settings size={12} className="text-zinc-500" />
                      {user.role === 'siswa' ? `Siswa - ${user.track?.name || 'UMUM'}` : user.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 text-zinc-500">
                      <button className="p-1.5 hover:text-indigo-400 hover:bg-indigo-500/10 rounded"><Info size={14} /></button>
                      <button className="p-1.5 hover:text-amber-400 hover:bg-amber-500/10 rounded"><Edit3 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kolom Kanan: Inspeksi Cepat (Sesuai Mockup) */}
      <div className="xl:col-span-3">
        <div className="bg-[#121214] border border-zinc-800 rounded-xl p-5 sticky top-20 shadow-2xl">
           <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4">
              <h3 className="text-xs font-bold text-zinc-300 flex items-center gap-2"><ShieldAlert size={14}/> Inspeksi Cepat</h3>
              <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">Terpilih</span>
           </div>
           
           {selectedUser ? (
             <>
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-500/30">
                   {selectedUser.name.substring(0,2).toUpperCase()}
                 </div>
                 <div>
                   <div className="font-bold text-zinc-100 text-sm">{selectedUser.name}</div>
                   <div className="text-[10px] text-zinc-500">NISN: {selectedUser.nisn || '-'}</div>
                 </div>
               </div>

               <div className="bg-[#09090b] border border-zinc-800 rounded-lg p-3 mb-6">
                 <div className="text-[10px] text-zinc-500 font-bold mb-2">HAK AKSES & KEBIJAKAN</div>
                 <div className="space-y-2 text-[10px] text-zinc-300">
                    <div className="flex justify-between"><span>Git Push Repositori</span><span className="text-emerald-400">Diizinkan</span></div>
                    <div className="flex justify-between"><span>Akses Browser Sandbox</span><span className="text-emerald-400">Diizinkan</span></div>
                    <div className="flex justify-between"><span>Root Shell Lab</span><span className="text-rose-400">Dibatasi</span></div>
                 </div>
               </div>

               <div className="space-y-2">
                 <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors border border-zinc-700">Reset Sandi & Kirim Email</button>
                 <button className="w-full py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-xs rounded-lg transition-colors border border-indigo-500/20">Ubah Spesialisasi Vokasi</button>
               </div>
             </>
           ) : (
             <div className="text-xs text-zinc-500 text-center py-10">Pilih user dari tabel untuk melihat detail.</div>
           )}
        </div>
      </div>

    </div>
  );
}