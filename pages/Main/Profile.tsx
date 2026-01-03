
import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import PostCard from '../../components/PostCard';
import { vi } from '../../lang/vi';
import { Post, UserRole } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';

const Profile: React.FC = () => {
  const { username } = useParams();
  const { user } = useAuthStore();
  const { openModal } = useUIStore();
  const t = vi.common;
  const profileT = vi.profile;

  // Simulate profile data
  const isOwnProfile = user?.username === username;
  
  const profileUser = isOwnProfile ? user : {
    id: 'user-b',
    displayName: username === 'tranthib' ? 'Trần Thị B' : 'Nguyễn Văn A',
    username: username || 'nguyenvana',
    role: UserRole.USER,
    avatarUrl: `https://picsum.photos/seed/${username}/200`,
    bio: 'Frontend Developer 👨‍💻 | Coffee Enthusiast ☕️ | Hanoi 🇻🇳\nĐam mê xây dựng giao diện web đẹp và trải nghiệm người dùng tuyệt vời.',
    joinedDate: 'Tháng 9/2023',
    followingCount: 248,
    followerCount: 10500,
    location: 'Hà Nội, Việt Nam',
    website: 'nguyenvana.dev'
  };

  const mockPosts: Post[] = [
    {
      id: 'p-1',
      userId: profileUser?.id || '1',
      authorName: profileUser?.displayName || '',
      authorAvatar: profileUser?.avatarUrl || '',
      authorRole: profileUser?.role || UserRole.USER,
      content: 'Vừa hoàn thành dự án mới! Cảm giác thật tuyệt vời khi nhìn thấy thành quả sau bao ngày cố gắng. 🚀\nMọi người cho mình xin ý kiến nhé! #webdevelopment #codinglife',
      imageUrl: 'https://picsum.photos/seed/code/800/450',
      createdAt: '2 giờ trước',
      likeCount: 124,
      commentCount: 18,
      shareCount: 5,
      location: 'Hà Nội, Việt Nam',
      isLiked: true
    },
    {
       id: 'p-2',
       userId: profileUser?.id || '1',
       authorName: profileUser?.displayName || '',
       authorAvatar: profileUser?.avatarUrl || '',
       authorRole: profileUser?.role || UserRole.USER,
       content: 'Có ai biết quán cà phê nào yên tĩnh ở khu vực Cầu Giấy để làm việc cuối tuần không nhỉ? 🤔\nMình cần không gian thoáng và wifi mạnh một chút. Thanks cả nhà!',
       createdAt: '1 ngày trước',
       likeCount: 45,
       commentCount: 32,
       shareCount: 12,
       isLiked: false
    }
  ];

  const handleEditClick = () => {
    if (user) {
      openModal('editProfileModal', { user });
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pt-6 px-4 md:px-8 lg:px-12 flex justify-center">
        <div className="flex flex-col w-full max-w-[800px]">
          {/* Header Card */}
          <div className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-border-dark mb-4">
            <div 
              className="relative h-48 sm:h-64 w-full bg-cover bg-center" 
              style={{ backgroundImage: `url(https://picsum.photos/seed/${username}banner/1200/400)` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="relative px-6 pb-6">
              <div className="absolute -top-[64px] left-6">
                <div className="size-32 rounded-full border-[4px] border-white dark:border-surface-dark bg-white dark:bg-surface-dark overflow-hidden">
                  <img src={profileUser?.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex justify-end pt-4 mb-2">
                {isOwnProfile ? (
                  <button 
                    onClick={handleEditClick}
                    className="flex items-center gap-2 rounded-full h-10 px-6 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white text-sm font-bold transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    <span>{t.editProfile}</span>
                  </button>
                ) : (
                  <button className="bg-primary hover:bg-blue-600 text-white font-bold h-10 px-8 rounded-full shadow-lg shadow-primary/25 transition-all">
                    Theo dõi
                  </button>
                )}
              </div>
              <div className="mt-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{profileUser?.displayName}</h1>
                  <span className="material-symbols-outlined text-blue-500 text-[20px] filled">verified</span>
                </div>
                <p className="text-text-secondary text-sm">@{profileUser?.username}</p>
                <div className="mt-3 max-w-2xl">
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {profileUser?.bio}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-text-secondary">
                  {profileUser?.location && (
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      <span>{profileUser.location}</span>
                    </div>
                  )}
                  {profileUser?.website && (
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">link</span>
                      <a className="text-primary hover:underline" href={`https://${profileUser.website}`} target="_blank" rel="noreferrer">{profileUser.website}</a>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                    <span>{t.joined} {profileUser?.joinedDate}</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-4 text-sm">
                  <button className="hover:underline text-slate-900 dark:text-white"><span className="font-bold">{profileUser?.followingCount}</span> <span className="text-text-secondary">{t.following}</span></button>
                  <button className="hover:underline text-slate-900 dark:text-white"><span className="font-bold">{(profileUser?.followerCount || 0).toLocaleString()}</span> <span className="text-text-secondary">{t.followers}</span></button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-border-dark mb-4 sticky top-[20px] z-30">
            <div className="flex px-2 w-full overflow-x-auto no-scrollbar">
              {[profileT.posts, profileT.comments, profileT.likes, profileT.media].map((tab, idx) => (
                <button 
                  key={tab}
                  className={`flex flex-1 min-w-[100px] flex-col items-center justify-center border-b-[3px] py-3 transition-colors ${
                    idx === 0 ? 'border-b-primary text-slate-900 dark:text-white' : 'border-b-transparent text-text-secondary hover:text-slate-700 dark:hover:text-slate-300 hover:bg-gray-50 dark:hover:bg-[#223149]/50'
                  }`}
                >
                  <span className="text-sm font-bold">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Feed */}
          <div className="flex flex-col gap-4 pb-20">
            {mockPosts.map(post => (
              <PostCard key={post.id} post={post} isOwner={post.userId === user?.id} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
