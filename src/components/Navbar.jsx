import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="border-b border-zinc-800 bg-[#09090b] sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between text-sm">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-bold text-zinc-100 text-base tracking-wide">
            B.O.S <span className="text-zinc-500 text-xs font-normal ml-1">✦</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`${location.pathname === '/' ? 'text-zinc-100 font-medium' : 'text-zinc-400 hover:text-zinc-200'}`}>Beranda / Dashboard</Link>
            <Link to="/task/1" className={`${location.pathname.includes('/task') ? 'text-zinc-100 font-medium' : 'text-zinc-400 hover:text-zinc-200'}`}>Tugas Praktikum</Link>
            <Link to="#" className="text-zinc-400 hover:text-zinc-200">Bimbingan Mentor</Link>
          </div>
        </div>
        <div className="flex items-center gap-3 text-right">
          <div className="hidden sm:block">
            <div className="text-zinc-100 font-medium text-xs">Ahmad Pratama</div>
            <div className="text-[10px] text-zinc-500">XII RPL 2 • NISN 00641829</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300">
            <User size={16} />
          </div>
        </div>
      </div>
    </nav>
  );
}