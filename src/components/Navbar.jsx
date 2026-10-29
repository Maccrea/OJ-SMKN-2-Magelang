import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white font-bold tracking-wide text-lg">
              SMK<span className="text-blue-400">OJ</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="bg-slate-800 text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                <Link to="#" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Leaderboard</Link>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-300 border border-slate-600 px-3 py-1.5 rounded bg-slate-800">
              Student ID: DEV-01
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}