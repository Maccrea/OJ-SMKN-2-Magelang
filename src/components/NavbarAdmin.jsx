import { Link, useLocation } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

export default function NavbarAdmin() {
  const location = useLocation();

  return (
    <nav className="w-full bg-[#09090b] border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/admin" className="text-zinc-100 font-bold text-lg tracking-wide">
            B.O.S <span className="text-indigo-500 text-xs">✦</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/admin" className={`${location.pathname === '/admin' ? 'text-zinc-100 font-medium bg-zinc-800/50 px-3 py-1.5 rounded-md' : 'text-zinc-400 hover:text-zinc-200'}`}>Pratikum</Link>
            <Link to="/admin/review" className={`${location.pathname.includes('/review') ? 'text-zinc-100 font-medium bg-zinc-800/50 px-3 py-1.5 rounded-md' : 'text-zinc-400 hover:text-zinc-200'}`}>Review</Link>
            <Link to="/admin/users" className={`${location.pathname.includes('/users') ? 'text-zinc-100 font-medium bg-zinc-800/50 px-3 py-1.5 rounded-md' : 'text-zinc-400 hover:text-zinc-200'}`}>Manage</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-300 font-medium">Admin</span>
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400">
            <UserCircle size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
}