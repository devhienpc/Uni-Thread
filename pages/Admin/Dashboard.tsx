
import React from 'react';
import { Link } from 'react-router-dom';
import { vi } from '../../lang/vi';
import { useAuthStore } from '../../store/useAuthStore';

const Dashboard: React.FC = () => {
  const t = vi.common;
  const { user, logout } = useAuthStore();

  const stats = [
    { label: t.totalUsers, value: '12,450', change: '+5%', icon: 'group', color: 'blue' },
    { label: t.newUsers, value: '142', change: '+12%', icon: 'person_add', color: 'green' },
    { label: t.online, value: '320', change: 'Hiện tại', icon: 'wifi', color: 'purple' },
    { label: t.violationReports, value: '15', change: '+2', icon: 'report', color: 'red' },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/admin" className="flex items-center gap-2 text-primary font-black text-xl tracking-tight">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
            <span>AdminPanel</span>
          </Link>
        </div>
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3">
            <img src={user?.avatarUrl} className="size-12 rounded-full border-2 border-primary" alt="Admin Avatar" />
            <div>
              <h3 className="font-bold text-sm">{user?.displayName}</h3>
              <p className="text-xs text-text-secondary">Super Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white shadow-md shadow-primary/20 transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-medium text-sm">{t.adminDashboard}</span>
          </Link>
          <Link to="/admin/users" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
            <span className="material-symbols-outlined group-hover:text-primary">group</span>
            <span className="font-medium text-sm">{t.userManagement}</span>
          </Link>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
            <span className="material-symbols-outlined group-hover:text-primary">fact_check</span>
            <span className="font-medium text-sm">{t.contentModeration}</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
            <span className="material-symbols-outlined group-hover:text-primary">bar_chart</span>
            <span className="font-medium text-sm">{t.reports}</span>
          </button>
          <div className="my-2 border-t border-slate-200 dark:border-slate-800"></div>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
            <span className="material-symbols-outlined group-hover:text-primary">settings</span>
            <span className="font-medium text-sm">{t.settings}</span>
          </button>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button onClick={logout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-medium text-sm">{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span>Admin</span>
            <span className="material-symbols-outlined text-base">chevron_right</span>
            <span className="text-primary font-medium">{t.adminDashboard}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full text-text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border border-white dark:border-surface-dark"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <p className="text-text-secondary text-sm font-medium">{stat.label}</p>
                    <span className={`p-1.5 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                      <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                    </span>
                  </div>
                  <div className="flex items-end gap-2 mt-2">
                    <h4 className="text-2xl font-bold">{stat.value}</h4>
                    <span className={`text-xs font-medium flex items-center mb-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-slate-500'}`}>
                      {stat.change.startsWith('+') && <span className="material-symbols-outlined text-sm">trending_up</span>} {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-black tracking-tight">{t.adminDashboard}</h1>
                  <p className="text-text-secondary mt-1">Tổng quan hoạt động của hệ thống.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-2 bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 h-96 flex items-center justify-center">
                    <p className="text-text-secondary italic">Biểu đồ thống kê tăng trưởng (Placeholder)</p>
                 </div>
                 <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold mb-4">Hoạt động gần đây</h3>
                    <div className="flex flex-col gap-4">
                       {[1,2,3,4,5].map(i => (
                         <div key={i} className="flex gap-3 text-sm">
                            <div className="size-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                            <div>
                               <p className="font-medium">Người dùng #102{i} vừa tham gia</p>
                               <p className="text-xs text-text-secondary">2 phút trước</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
