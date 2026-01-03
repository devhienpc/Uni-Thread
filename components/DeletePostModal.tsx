
import React, { useState } from 'react';
import { useUIStore } from '../store/useUIStore';
import { useFeedStore } from '../store/useFeedStore';
import { postService } from '../services/post.service';
import { vi } from '../lang/vi';

const DeletePostModal: React.FC = () => {
  const { modalProps, closeModal, addToast } = useUIStore();
  const { removePost } = useFeedStore();
  const t = vi.common;
  const postId = modalProps?.postId;

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!postId) return;
    
    setIsDeleting(true);
    try {
      await postService.deletePost(postId);
      removePost(postId);
      addToast({ message: t.deleteSuccess, type: 'success' });
      closeModal();
    } catch (error) {
      addToast({ message: t.deleteError, type: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeModal}></div>
      <div className="relative bg-white dark:bg-surface-dark w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 flex flex-col items-center text-center gap-4">
          <div className="size-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-500">
            <span className="material-symbols-outlined text-[32px]">delete_forever</span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.confirmDeleteTitle}</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t.confirmDeleteMessage}
            </p>
          </div>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-[#131b2b] flex gap-3">
          <button 
            onClick={closeModal} 
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {t.cancel}
          </button>
          <button 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              t.delete
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;