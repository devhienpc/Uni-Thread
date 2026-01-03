
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { UserRole, User } from '../../types';

const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      const provider = searchParams.get('provider');

      if (!provider || !['google', 'github'].includes(provider)) {
        setError("Authentication failed. Invalid provider.");
        return;
      }

      try {
        // Simulate network latency
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock OAuth exchange
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

        const mockToken = `mock-oauth-jwt-token-${provider}-${Date.now()}`;
        setSession(user, mockToken);
        navigate('/');
      } catch (err) {
        setError("Authentication failed. Please try again.");
      }
    };

    authenticate();
  }, [searchParams, setSession, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-4 text-center">
        <span className="material-symbols-outlined text-red-500 text-6xl mb-4">error</span>
        <h1 className="text-white text-xl font-bold mb-2">{error}</h1>
        <button 
          onClick={() => navigate('/auth/login')}
          className="text-primary hover:underline font-medium"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-white text-lg font-medium animate-pulse">Authenticating...</p>
      </div>
    </div>
  );
};

export default Callback;
