
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useUIStore } from './store/useUIStore';
import { seedDatabase } from './utils/storage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Callback from './pages/Auth/Callback';
import Feed from './pages/Main/Feed';
import Profile from './pages/Main/Profile';
import Search from './pages/Main/Search';
import PostDetail from './pages/Main/PostDetail';
import Dashboard from './pages/Admin/Dashboard';
import UserManagement from './pages/Admin/UserManagement';
import EditProfileModal from './components/EditProfileModal';
import DevQuickLogin from './components/DevQuickLogin';

const App: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { activeModal, toasts, removeToast } = useUIStore();

  useEffect(() => {
    seedDatabase();
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen">
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/auth/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
          <Route path="/auth/callback" element={<Callback />} />

          {/* Main Routes */}
          <Route path="/" element={isAuthenticated ? <Feed /> : <Navigate to="/auth/login" />} />
          <Route path="/profile/:username" element={isAuthenticated ? <Profile /> : <Navigate to="/auth/login" />} />
          <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/auth/login" />} />
          <Route path="/post/:id" element={isAuthenticated ? <PostDetail /> : <Navigate to="/auth/login" />} />

          {/* Admin Routes */}
          <Route path="/admin" element={isAuthenticated && isAdmin ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/admin/users" element={isAuthenticated && isAdmin ? <UserManagement /> : <Navigate to="/" />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Modal Provider */}
        {activeModal === 'editProfileModal' && <EditProfileModal />}

        {/* Toast Notification Container */}
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
          {toasts.map((toast) => (
            <div 
              key={toast.id}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border animate-in slide-in-from-right-4 duration-300 ${
                toast.type === 'success' ? 'bg-green-500 border-green-600 text-white' : 
                toast.type === 'error' ? 'bg-red-500 border-red-600 text-white' : 
                'bg-slate-800 border-slate-700 text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
              </span>
              <p className="text-sm font-bold">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="ml-2 hover:opacity-70">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          ))}
        </div>

        {/* Dev Tools */}
        <DevQuickLogin />
      </div>
    </Router>
  );
};

export default App;
