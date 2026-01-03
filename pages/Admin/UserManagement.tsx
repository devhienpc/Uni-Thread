
import React from 'react';
import { Link } from 'react-router-dom';
import { vi } from '../../lang/vi';
import { useAuthStore } from '../../store/useAuthStore';

const UserManagement: React.FC = () => {
  const t = vi.common;
  const { user, logout } = useAuthStore();

  const mockUsers = [
    { id: '#1001', name: 'Nguyen Van A', email: 'nguyen.a@example.com', status: 'active', avatar: 'https://picsum.photos/seed/1/100' },
    { id: '#1002', name: 'Tran Thi B', email: 'tran.b@example.com', status: 'suspended', avatar: 'https://picsum.photos/seed/2/100' },
    { id: '#1003', name: 'Le Van C', email: 'le.c@example.com', status: 'active', avatar: 'https://picsum.photos/seed/3/100' },
    { id: '#1004', name: 'Pham Thi D', email: 'pham.d@example.com', status: 'banned', avatar: 'https://picsum.photos/seed/4/100' },
    { id: '#1005', name: 'Hoang Van E', email: 'hoang.e@example.com', status: 'active', avatar: 'https://picsum.photos/seed/5/100' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800"><span className="size-1.5 rounded-full bg-green-500"></span>{t.active}</span>;
      case 'suspended':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800"><span className="size-1.5 rounded-full bg-amber-500"></span>{t.suspended}</span>;
      case 'banned':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800"><span className="size-1.5 rounded-full bg-red-500"></span>{t.banned}</span>;
      default: return null;
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white flex min-h-screen overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
           <Link to="/admin" className="flex items-center gap-2 text-primary font-black text-xl tracking-tight">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
            <span>AdminPanel</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-medium text-sm">{t.adminDashboard}</span>
          </Link>
          <Link to="/admin/users" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white shadow-md shadow-primary/20 transition-colors">
            <span className="material-symbols-outlined">group</span>
            <span className="font-medium text-sm">{t.userManagement}</span>
          </Link>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
            <span className="material-symbols-outlined group-hover:text-primary">fact_check</span>
            <span className="font-medium text-sm">{t.contentModeration}</span>
          </button>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button onClick={logout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-medium text-sm">{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span>Admin</span>
            <span className="material-symbols-outlined text-base">chevron_right</span>
            <span className="text-primary font-medium">{t.userManagement}</span>
          </div>
          <button className="relative p-2 rounded-full text-text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border border-white dark:border-surface-dark"></span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-black tracking-tight">{t.userManagement}</h1>
                <p className="text-text-secondary mt-1">Xem, tìm kiếm và quản lý quyền truy cập của thành viên.</p>
              </div>
              <button className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-primary/20 transition-all">
                <span className="material-symbols-outlined text-[20px]">add</span>
                {t.addAdmin}
              </button>
            </div>

            <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined">search</span>
                <input className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 dark:bg-[#101722] border-none focus:ring-2 focus:ring-primary text-sm placeholder-slate-400" placeholder="Tìm kiếm theo tên, email hoặc ID..." type="text"/>
              </div>
              <div className="flex gap-3">
                <select className="bg-slate-50 dark:bg-[#101722] text-sm rounded-lg px-4 py-2.5 border-none focus:ring-2 focus:ring-primary cursor-pointer min-w-[140px]">
                  <option>Tất cả trạng thái</option>
                  <option>Hoạt động</option>
                  <option>Bị đình chỉ</option>
                  <option>Bị cấm</option>
                </select>
                <button className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm font-medium">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Lọc
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                      <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider w-20">ID</th>
                      <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider min-w-[240px]">Tên người dùng</th>
                      <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell min-w-[200px]">{t.email}</th>
                      <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">{t.status}</th>
                      <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {mockUsers.map(u => (
                      <tr key={u.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 text-sm font-medium text-text-secondary">{u.id}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={u.avatar} className="size-10 rounded-full border border-border-dark object-cover" alt={u.name} />
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold">{u.name}</span>
                              <span className="text-xs text-text-secondary md:hidden">{u.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-300 hidden md:table-cell">{u.email}</td>
                        <td className="p-4">{getStatusBadge(u.status)}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 rounded-lg text-amber-600 hover:bg-amber-50 dark:text-amber-500 dark:hover:bg-amber-900/20 transition-colors" title="Đình chỉ">
                              <span className="material-symbols-outlined text-[20px]">pause_circle</span>
                            </button>
                            <button className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/20 transition-colors" title="Cấm">
                              <span className="material-symbols-outlined text-[20px]">block</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#101722]">
                <p className="text-sm text-text-secondary">Hiển thị <span className="font-medium text-slate-900 dark:text-white">1</span> đến <span className="font-medium text-slate-900 dark:text-white">5</span> của <span className="font-medium text-slate-900 dark:text-white">1,234</span> kết quả</p>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50 disabled:opacity-50">
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
