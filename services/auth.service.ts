
import { User, UserRole } from '../types';
import { apiClient } from './apiClient';

export const authService = {
  async login(email: string, pass: string): Promise<User> {
    // Logic tìm user trong DB giả lập
    const usersJson = localStorage.getItem('app_users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];
    const user = users.find(u => u.email === email);
    
    if (!user) throw new Error("User not found");
    
    await apiClient.post('identity', '/login', { email });
    return user;
  },

  async oauthCallback(provider: string): Promise<{ user: User; token: string }> {
    const email = `${provider}.user@example.com`;
    const usersJson = localStorage.getItem('app_users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    let user = users.find((u) => u.email === email);

    if (!user) {
      user = {
        id: `oauth-${Date.now()}`,
        username: `${provider}_user_${Math.floor(Math.random() * 1000)}`,
        displayName: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: email,
        avatarUrl: `https://picsum.photos/seed/${provider}/200`,
        role: UserRole.USER,
        joinedDate: new Date().toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }),
        followingCount: 0,
        followerCount: 0,
      };
      users.push(user);
      localStorage.setItem('app_users', JSON.stringify(users));
    }

    const mockToken = `jwt-${provider}-${Math.random()}`;
    await apiClient.post('identity', '/oauth', { provider });
    
    return { user, token: mockToken };
  }
};
