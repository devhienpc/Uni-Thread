
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUIStore } from '../store/useUIStore';
import { useAuthStore } from '../store/useAuthStore';
import { vi } from '../lang/vi';
import { User } from '../types';

interface EditProfileFormData {
  displayName: string;
  bio: string;
}

const EditProfileModal: React.FC = () => {
  const { modalProps, closeModal, addToast } = useUIStore();
  const { updateUser } = useAuthStore();
  const user = modalProps.user as User;
  const t = vi.common;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<EditProfileFormData>({
    defaultValues: {
      displayName: user.displayName,
      bio: user.bio || '',
    }
  });

  const onSubmit = async (data: EditProfileFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Mock API logic
      await new Promise(resolve => setTimeout(resolve, 500));

      const usersJson = localStorage.getItem('app_users');
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];
      
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex === -1) throw new Error("User not found");

      const updatedUser = {
        ...users[userIndex],
        displayName: data.displayName,
        bio: data.bio
      };

      users[userIndex] = updatedUser;
      localStorage.setItem('app_users', JSON.stringify(users));

      updateUser(updatedUser);
      addToast({ message: 'Cập nhật hồ sơ thành công!', type: 'success' });
      closeModal();
    } catch (err) {
      setError("Có lỗi xảy ra khi cập nhật hồ sơ. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={closeModal}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-border-dark overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-border-dark flex items-center justify-between">
          <h2 className="text-xl font-bold">{t.editProfile}</h2>
          <button onClick={closeModal} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tên hiển thị</label>
            <input 
              {...register('displayName', { required: 'Tên hiển thị là bắt buộc' })}
              className={`w-full bg-slate-50 dark:bg-[#101722] border ${errors.displayName ? 'border-red-500' : 'border-slate-200 dark:border-border-dark'} rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all`}
              placeholder="Nhập tên hiển thị"
            />
            {errors.displayName && <p className="text-xs text-red-500 mt-1">{errors.displayName.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tiểu sử</label>
            <textarea 
              {...register('bio')}
              className="w-full bg-slate-50 dark:bg-[#101722] border border-slate-200 dark:border-border-dark rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all min-h-[100px] resize-none"
              placeholder="Kể chút về bản thân bạn..."
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button 
              type="button"
              onClick={closeModal}
              className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-border-dark rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {t.cancel}
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-primary hover:bg-blue-600 disabled:bg-primary/50 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
