import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/murid/Dashboard';
import TaskDetail from './pages/murid/TaskDetail';
import Navbar from './components/Navbar';
import NavbarAdmin from './components/NavbarAdmin';
import Bimbingan from './pages/murid/Bimbingan';
import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';

function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="w-full min-h-screen bg-[#09090b] text-zinc-300 font-sans overflow-x-hidden">
      {!isLoginPage && (isAdminPage ? <NavbarAdmin /> : <Navbar />)}
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task/:id" element={<TaskDetail />} />
        <Route path="/bimbingan" element={<Bimbingan />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
      </Routes>
    </Layout>
  );
}