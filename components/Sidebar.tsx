
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { vi } from '../lang/vi';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, clearSession, isAdmin } = useAuthStore();
  const t = vi.common;

  const menuItems = [
    { path: '/', icon: 'home', label: t.home },
    { path: '/search', icon: 'search', label: t.search },
    { path: `/profile/${user?.username}`, icon: 'account_circle', label: t.profile },
    { path: '/notifications', icon: 'notifications', label: t.notifications, badge: 3 },
  ];

  if (isAdmin) {
    menuItems.push({ path: '/admin', icon: 'security', label: t.admin });
  }

  return (
    <aside className="hidden lg:flex w-[250px] flex-col bg-surface-dark border-r border-border-dark h-full shrink-0">
      <div className="p-6 flex flex-col h-full justify-between">
        <div className="flex flex-col gap-8 flex-1">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full size-10 flex items-center justify-center text-white">
               <span className="material-symbols-outlined text-[28px]">social_distance</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold leading-tight">SocialApp</h1>
              <p className="text-text-secondary text-xs">Mạng xã hội</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-2 h-full">
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
                    location.pathname === item.path 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-text-secondary hover:bg-[#223149] hover:text-white'
                  }`}
                >
                  <span className={`material-symbols-outlined ${location.pathname === item.path ? 'filled' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Logout Action Element */}
            <div className="mt-auto">
              <button
                onClick={() => clearSession()}
                className="flex items-center gap-3 w-full p-2 rounded-lg text-[#d1d5db] hover:bg-[#1f2937] transition-all active:scale-95 group"
                aria-label={t.logout}
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="text-sm font-medium">{t.logout}</span>
              </button>
            </div>
          </nav>
        </div>

        {/* User Info */}
        <div className="pt-4 border-t border-border-dark mt-4">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#223149] cursor-pointer transition-colors group relative">
            <img 
              src={user?.avatarUrl || "https://picsum.photos/seed/user/100"} 
              className="size-10 rounded-full border border-border-dark"
              alt="Avatar"
            />
            <div className="flex flex-col overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{user?.displayName}</p>
              <p className="text-text-secondary text-xs truncate">@{user?.username}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
