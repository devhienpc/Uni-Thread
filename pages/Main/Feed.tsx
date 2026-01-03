
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import PostCard from '../../components/PostCard';
import CreatePostForm from '../../components/CreatePostForm';
import { vi } from '../../lang/vi';
import { Post, UserRole } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';
import { useFeedStore } from '../../store/useFeedStore';
import { getStoredPosts } from '../../utils/storage';

const Feed: React.FC = () => {
  const t = vi.common;
  const { user } = useAuthStore();
  const { posts, setPosts } = useFeedStore();
  const [activeSort, setActiveSort] = useState('newest');

  useEffect(() => {
    // Initial load from storage
    const storedPosts = getStoredPosts();
    
    // Add some dynamic variance for dev feel if storage is empty
    if (storedPosts.length <= 1) {
       const initialPosts: Post[] = [
        ...storedPosts,
        {
          id: 'post-static-1',
          userId: 'user-2',
          authorName: 'Sarah Trần',
          authorAvatar: 'https://picsum.photos/seed/sarah/100',
          authorRole: UserRole.USER,
          content: 'Hôm nay trời thật đẹp, tôi đã đi dạo quanh hồ và chụp được bức ảnh này. Mọi người thấy thế nào? Không khí mùa thu thật tuyệt vời! 🍂📸',
          imageUrl: 'https://picsum.photos/seed/autumn/800/450',
          createdAt: '2 giờ trước',
          likeCount: 125,
          commentCount: 45,
          shareCount: 10,
          location: 'Hà Nội',
          isLiked: false
        },
        {
          id: 'post-static-2',
          userId: 'user-3',
          authorName: 'Mike Ross',
          authorAvatar: 'https://picsum.photos/seed/mike/100',
          authorRole: UserRole.USER,
          content: 'Cuối tuần cafe làm việc, view đẹp thế này thì năng suất x2 nhé mọi người! ☕️🏢',
          imageUrl: 'https://picsum.photos/seed/office/800/600',
          createdAt: '5 giờ trước',
          likeCount: 89,
          commentCount: 15,
          shareCount: 5,
          isLiked: false
        }
      ];
      setPosts(initialPosts);
    } else {
      setPosts(storedPosts);
    }
  }, [setPosts]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden h-screen flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-background-light dark:bg-background-dark">
        <div className="max-w-[720px] mx-auto py-6 px-4 md:px-8 flex flex-col gap-6">
          
          <CreatePostForm />

          {/* Sorting Chips */}
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: 'newest', icon: 'schedule', label: t.newest },
              { id: 'popular', icon: 'trending_up', label: t.popular },
              { id: 'commented', icon: 'forum', label: t.mostCommented }
            ].map(sort => (
              <button 
                key={sort.id}
                onClick={() => setActiveSort(sort.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shadow-sm ${
                  activeSort === sort.id 
                    ? 'bg-primary text-white shadow-primary/20' 
                    : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-slate-600 dark:text-text-secondary hover:bg-gray-50 dark:hover:bg-[#223149]'
                }`}
              >
                <span className={`material-symbols-outlined text-[18px] ${activeSort === sort.id ? 'filled' : ''}`}>
                  {sort.icon}
                </span>
                {sort.label}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="flex flex-col gap-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center py-4 text-text-secondary text-sm">
            Đã hiển thị hết bài viết
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feed;
