
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import PostCard from '../../components/PostCard';
import { vi } from '../../lang/vi';
import { Post, UserRole } from '../../types';

const Search: React.FC = () => {
  const t = vi.common;
  const [query, setQuery] = useState('Du lịch Đà Lạt');

  const results: Post[] = [
     {
      id: 'search-1',
      userId: 'user-b',
      authorName: 'Trần Thị B',
      authorAvatar: 'https://picsum.photos/seed/tranthib/100',
      authorRole: UserRole.USER,
      content: 'Review chuyến đi Đà Lạt 3 ngày 2 đêm siêu tiết kiệm cho hội bạn thân! 🌲🍓\nTụi mình đã đi săn mây ở đồi Đa Phú, check-in quảng trường Lâm Viên và ăn bánh tráng nướng siêu ngon.\n#dalat #travel #vietnam',
      imageUrl: 'https://picsum.photos/seed/dalat/800/450',
      createdAt: '5 giờ trước',
      likeCount: 245,
      commentCount: 42,
      shareCount: 15,
      location: 'Công khai',
      isLiked: false
    },
    {
      id: 'search-2',
      userId: 'user-a',
      authorName: 'Nguyễn Văn A',
      authorAvatar: 'https://picsum.photos/seed/nguyenvana/100',
      authorRole: UserRole.USER,
      content: 'Đang tìm homestay view đẹp ở Đà Lạt cho dịp lễ tới. Anh em có recommend chỗ nào chill chill không ạ? 🏡☕️',
      createdAt: '2 ngày trước',
      likeCount: 12,
      commentCount: 35,
      shareCount: 2,
      location: 'Bạn bè',
      isLiked: false
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white h-screen flex overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full relative overflow-hidden w-full">
        <div className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-3xl mx-auto w-full px-4 pt-4 pb-2">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
              </div>
              <input 
                className="block w-full pl-10 pr-10 py-3 bg-white dark:bg-surface-dark border-none ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:outline-none transition-all shadow-sm" 
                placeholder={t.searchPlaceholder} 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                <button onClick={() => setQuery('')} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">cancel</span>
                </button>
              </div>
            </div>

            <div className="flex gap-2 mt-3 overflow-x-auto pb-2 no-scrollbar">
              {[t.all, t.posts, t.people, t.media].map((chip, idx) => (
                <button 
                  key={chip}
                  className={`flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium shadow-sm transition-all whitespace-nowrap ${
                    idx === 0 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-surface-dark ring-1 ring-slate-200 dark:ring-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto w-full px-4 pb-10">
          <div className="max-w-3xl mx-auto flex flex-col gap-6 py-6">
            <p className="text-text-secondary text-sm font-medium px-1">Khoảng {results.length} kết quả cho "{query}"</p>
            
            <div className="flex flex-col gap-6">
              {results.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <div className="animate-pulse flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/6"></div>
                </div>
              </div>
              <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-xl w-full"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
