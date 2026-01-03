
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/useAuthStore';
import { useFeedStore } from '../store/useFeedStore';
import { useUIStore } from '../store/useUIStore';
import { Post, UserRole } from '../types';
import { vi } from '../lang/vi';
import { savePostToStorage } from '../utils/storage';

interface PostFormData {
  content: string;
}

const CreatePostForm: React.FC = () => {
  const { user } = useAuthStore();
  const { addPost, updatePost, removePost } = useFeedStore();
  const { addToast } = useUIStore();
  const t = vi.common;

  const { register, handleSubmit, reset } = useForm<PostFormData>();

  const onSubmit = async (data: PostFormData) => {
    if (!user) {
      addToast({ message: 'Vui lòng đăng nhập để đăng bài', type: 'error' });
      return;
    }

    const tempId = `temp-${Date.now()}`;
    
    // 1. Create Optimistic Post
    const optimisticPost: Post = {
      id: tempId,
      userId: user.id,
      authorName: user.displayName,
      authorAvatar: user.avatarUrl,
      authorRole: user.role,
      content: data.content,
      createdAt: 'Vừa xong',
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      isLiked: false,
      isOptimistic: true // UI flag for pending state
    };

    // 2. Optimistic Update
    addPost(optimisticPost);
    reset();

    try {
      // 3. Simulated API Call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 5% chance of failure for testing rollback
          if (Math.random() < 0.05) reject(new Error('Network failure'));
          else resolve(true);
        }, 800);
      });

      // 4. On Success: Replace with real data
      const finalPost: Post = {
        ...optimisticPost,
        id: `post-${Date.now()}`,
        createdAt: 'Vừa xong',
        isOptimistic: false
      };

      // Persist to mock DB
      savePostToStorage(finalPost);
      
      updatePost(tempId, finalPost);
    } catch (err) {
      // 5. On Failure: Rollback
      removePost(tempId);
      addToast({ message: 'Không thể đăng bài. Vui lòng thử lại.', type: 'error' });
    }
  };

  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm p-4 border border-gray-100 dark:border-border-dark">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
        <div className="shrink-0">
          <img 
            src={user?.avatarUrl || "https://picsum.photos/seed/user/100"} 
            className="size-12 rounded-full border border-border-dark object-cover"
            alt="Avatar"
          />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <textarea 
            {...register('content', { required: true })}
            className="w-full bg-gray-50 dark:bg-[#101723] border border-gray-200 dark:border-border-dark rounded-xl p-3 text-slate-900 dark:text-white placeholder:text-text-secondary focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none resize-none min-h-[80px]" 
            placeholder={t.whatIsOnYourMind}
          ></textarea>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button type="button" className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors" title="Ảnh/Video">
                <span className="material-symbols-outlined block">image</span>
              </button>
              <button type="button" className="p-2 text-green-500 hover:bg-green-500/10 rounded-full transition-colors hidden sm:block" title="Cảm xúc">
                <span className="material-symbols-outlined block">sentiment_satisfied</span>
              </button>
            </div>
            <button 
              type="submit"
              className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/20"
            >
              {t.post}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
