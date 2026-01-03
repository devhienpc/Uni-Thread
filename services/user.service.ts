
import { User } from '../types';
import { apiClient } from './apiClient';

export const userService = {
  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    const usersJson = localStorage.getItem('app_users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];
    
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) throw new Error("User not found");

    const updatedUser = { ...users[index], ...data };
    users[index] = updatedUser;
    
    localStorage.setItem('app_users', JSON.stringify(users));
    
    await apiClient.patch('user-profile', `/users/${userId}`, data);
    return updatedUser;
  },

  async getUser(username: string): Promise<User | null> {
    const usersJson = localStorage.getItem('app_users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];
    return users.find(u => u.username === username) || null;
  }
};
