
import { User, UserRole, Post } from '../types';

export const seedDatabase = () => {
  if (!localStorage.getItem('app_users')) {
    const mockUsers: User[] = [
      {
        id: 'user-1',
        username: 'nguyenvana',
        displayName: 'Nguyễn Văn A',
        email: 'user@socialapp.com',
        avatarUrl: 'https://picsum.photos/seed/user1/200',
        role: UserRole.USER,
        bio: 'Frontend Developer đam mê ReactJS và giao diện người dùng hiện đại.',
        location: 'Hà Nội',
        joinedDate: 'Tháng 9/2023',
        followingCount: 248,
        followerCount: 10500,
      },
      {
        id: 'admin-1',
        username: 'admin_boss',
        displayName: 'Admin User',
        email: 'admin@socialapp.com',
        avatarUrl: 'https://picsum.photos/seed/admin/200',
        role: UserRole.ADMIN,
        bio: 'Hệ thống quản trị SocialApp.',
        joinedDate: 'Tháng 1/2023',
        followingCount: 10,
        followerCount: 99999,
      }
    ];
    localStorage.setItem('app_users', JSON.stringify(mockUsers));
  }

  if (!localStorage.getItem('app_posts')) {
    const mockPosts: Post[] = [
      {
        id: 'post-init-1',
        userId: 'user-1',
        authorName: 'Nguyễn Văn A',
        authorAvatar: 'https://picsum.photos/seed/user1/200',
        authorRole: UserRole.USER,
        content: 'Chào mừng mọi người đến với SocialApp! Đây là bài đăng khởi tạo. 🚀',
        createdAt: '1 ngày trước',
        likeCount: 42,
        commentCount: 5,
        shareCount: 2,
        location: 'Hà Nội',
        isLiked: false
      }
    ];
    localStorage.setItem('app_posts', JSON.stringify(mockPosts));
  }
};

export const getStoredPosts = (): Post[] => {
  const data = localStorage.getItem('app_posts');
  return data ? JSON.parse(data) : [];
};

export const savePostToStorage = (post: Post) => {
  const posts = getStoredPosts();
  localStorage.setItem('app_posts', JSON.stringify([post, ...posts]));
};

export const updatePostInStorage = (postId: string, content: string) => {
  const posts = getStoredPosts();
  const index = posts.findIndex(p => p.id === postId);
  if (index !== -1) {
    posts[index].content = content;
    localStorage.setItem('app_posts', JSON.stringify(posts));
  }
};
