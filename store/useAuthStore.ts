
import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  sessionToken: string | null;
  login: (user: User) => void;
  logout: () => void;
  clearSession: () => void;
  setSession: (user: User, token: string) => void;
  updateUser: (updatedUser: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  sessionToken: null,
  login: (user) => {
    localStorage.setItem('app_session', 'true');
    set({ 
      user, 
      isAuthenticated: true, 
      isAdmin: user.role === UserRole.ADMIN 
    });
  },
  logout: () => {
    localStorage.removeItem('app_session');
    set({ 
      user: null, 
      isAuthenticated: false, 
      isAdmin: false,
      sessionToken: null
    });
  },
  clearSession: () => {
    localStorage.removeItem('app_session');
    set({ 
      user: null, 
      isAuthenticated: false, 
      isAdmin: false,
      sessionToken: null
    });
  },
  setSession: (user, token) => {
    localStorage.setItem('app_session', 'true');
    localStorage.setItem('session_token', token);
    set({
      user,
      sessionToken: token,
      isAuthenticated: true,
      isAdmin: user.role === UserRole.ADMIN
    });
  },
  updateUser: (updatedUser) => {
    set((state) => ({
      user: updatedUser,
      isAdmin: updatedUser.role === UserRole.ADMIN
    }));
  }
}));
