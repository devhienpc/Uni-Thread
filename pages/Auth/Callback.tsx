
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { authService } from '../../services/auth.service';

const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      const provider = searchParams.get('provider');

      if (!provider || !['google', 'github'].includes(provider)) {
        setError("Lỗi xác thực: Provider không hợp lệ.");
        return;
      }

      try {
        const { user, token } = await authService.oauthCallback(provider);
        setSession(user, token);
        navigate('/');
      } catch (err) {
        setError("Lỗi từ Identity Service. Vui lòng thử lại.");
      }
    };

    authenticate();
  }, [searchParams, setSession, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-4 text-center">
        <span className="material-symbols-outlined text-red-500 text-6xl mb-4">error</span>
        <h1 className="text-white text-xl font-bold mb-2">{error}</h1>
        <button onClick={() => navigate('/auth/login')} className="text-primary hover:underline font-medium">Quay lại đăng nhập</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-white text-lg font-medium animate-pulse">Đang liên kết với Identity Service...</p>
      </div>
    </div>
  );
};

export default Callback;
