
import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { User, UserRole } from '../types';

const DevQuickLogin: React.FC = () => {
  const { setSession } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = (userId: string) => {
    const usersJson = localStorage.getItem('app_users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];
    const user = users.find(u => u.id === userId);

    if (user) {
      setSession(user, `dev-token-${userId}-${Date.now()}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-2">
      {isOpen && (
        <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark shadow-2xl rounded-2xl p-4 flex flex-col gap-2 min-w-[200px] animate-in slide-in-from-bottom-2 duration-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-1">Quick Login (Dev)</p>
          <button 
            onClick={() => handleLogin('user-1')}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
          >
            <img src="https://picsum.photos/seed/user1/40" className="size-8 rounded-full" />
            <div className="flex flex-col">
              <span className="text-xs font-bold">Login as User</span>
              <span className="text-[10px] text-text-secondary">Nguyễn Văn A</span>
            </div>
          </button>
          <button 
            onClick={() => handleLogin('admin-1')}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
          >
             <img src="https://picsum.photos/seed/admin/40" className="size-8 rounded-full" />
            <div className="flex flex-col">
              <span className="text-xs font-bold">Login as Admin</span>
              <span className="text-[10px] text-text-secondary">Admin Boss</span>
            </div>
          </button>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="size-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all"
      >
        <span className="material-symbols-outlined">{isOpen ? 'close' : 'developer_mode'}</span>
      </button>
    </div>
  );
};

export default DevQuickLogin;
