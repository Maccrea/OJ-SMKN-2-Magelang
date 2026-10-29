import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="w-full h-screen bg-[#0a0f1c] text-slate-300 overflow-hidden font-sans">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
export default App;