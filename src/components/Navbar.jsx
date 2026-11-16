import { useState, useEffect } from "react";
import axios from "axios";
import { User, LogOut } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) return;

        const response = await axios.get("http://localhost:8000/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data.data || response.data;
        setUser(userData);
      } catch (error) {
        console.error("Gagal memuat profil pengguna:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <nav className="border-b border-zinc-800 bg-[#121214] px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <div className="text-xl font-black text-indigo-400 flex items-center gap-1">
          B.O.S <span className="text-zinc-500 text-sm">✦</span>
        </div>
        <div className="flex items-center gap-6 text-xs font-bold">
          <Link
            to="/dashboard"
            className={`transition-colors ${
              isActive("/dashboard")
                ? "text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Beranda / Dashboard
          </Link>

          <Link
            to="/tasks"
            className={`transition-colors ${
              isActive("/tasks") || location.pathname.startsWith("/task/")
                ? "text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Tugas Praktikum
          </Link>

          <Link
            to="/bimbingan"
            className={`transition-colors ${
              isActive("/bimbingan")
                ? "text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Bimbingan Mentor
          </Link>
        </div>
      </div>

      {/* KANAN: PROFIL USER DINAMIS */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3 group relative cursor-pointer">
            <div className="text-right">
              <div className="text-xs font-bold text-zinc-200">{user.name}</div>
              <div className="text-[10px] text-zinc-500">
                XII RPL 2 • NISN {user.nisn || "-"}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 flex items-center justify-center font-bold text-xs uppercase hover:border-indigo-500 hover:text-indigo-400 transition-colors">
              {user.name ? user.name.substring(0, 2) : <User size={14} />}
            </div>

            {/* Tombol Logout */}
            <div className="absolute right-0 top-full mt-2 w-36 bg-[#09090b] border border-zinc-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-xs text-rose-400 hover:bg-zinc-800 rounded-lg flex items-center gap-2 font-bold cursor-pointer"
              >
                <LogOut size={14} /> Keluar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] font-bold text-zinc-500">
                Memuat profil...
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-zinc-800/50 animate-pulse border border-zinc-700"></div>
          </div>
        )}
      </div>
    </nav>
  );
}
