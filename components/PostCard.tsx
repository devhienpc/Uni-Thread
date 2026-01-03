
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { vi } from '../lang/vi';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';
import { useFeedStore } from '../store/useFeedStore';
import { updatePostInStorage } from '../utils/storage';

interface PostCardProps {
  post: Post;
  isOwner?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const t = vi.common;
  const { user } = useAuthStore();
  const { openModal, addToast } = useUIStore();
  const { updatePost } = useFeedStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOwner = user?.id === post.userId;

  const handleDelete = () => {
    openModal('deletePostConfirmation', { postId: post.id });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(post.content);
  };

  const handleUpdatePost = async () => {
    if (!editedContent.trim() || editedContent === post.content) {
      setIsEditing(false);
      return;
    }

    const originalContent = post.content;
    setIsSubmitting(true);

    // 1. Optimistic Update (Client-Side)
    updatePost(post.id, { ...post, content: editedContent });
    setIsEditing(false);

    try {
      // 2. Mock API Call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 3. Persist to localStorage
      updatePostInStorage(post.id, editedContent);
      
      addToast({ message: 'Cập nhật bài viết thành công!', type: 'success' });
    } catch (error) {
      // 4. Rollback on failure
      updatePost(post.id, { ...post, content: originalContent });
      addToast({ message: 'Lỗi khi cập nhật bài viết. Vui lòng thử lại.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className={`bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-border-dark overflow-hidden transition-all ${post.isOptimistic ? 'opacity-60 cursor-wait' : 'hover:border-gray-200 dark:hover:border-slate-700'}`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.authorName.toLowerCase().replace(/\s/g, '')}`}>
            <img 
              src={post.authorAvatar} 
              className="size-10 rounded-full border border-border-dark cursor-pointer object-cover" 
              alt={post.authorName}
            />
          </Link>
          <div className="flex flex-col">
            <Link to={`/profile/${post.authorName.toLowerCase().replace(/\s/g, '')}`} className="text-slate-900 dark:text-white text-sm font-bold hover:underline">
              {post.authorName}
              {post.authorRole === 'admin' && (
                <span className="ml-2 bg-primary/20 text-primary text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">Admin</span>
              )}
            </Link>
            <div className="flex items-center gap-2">
              <p className="text-text-secondary text-xs">{post.createdAt} • {post.location || 'Công khai'}</p>
              {post.isOptimistic && (
                 <div className="size-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {isOwner && !post.isOptimistic && !isEditing && (
            <>
              <button 
                onClick={handleEdit}
                className="text-text-secondary hover:text-primary p-2 rounded-full hover:bg-primary/10 transition-colors"
                title={t.edit}
              >
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
              <button 
                onClick={handleDelete}
                className="text-text-secondary hover:text-red-500 p-2 rounded-full hover:bg-red-500/10 transition-colors"
                title={t.delete}
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </>
          )}
          <button className="text-text-secondary hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 pb-3">
        {isEditing ? (
          <div className="flex flex-col gap-3 animate-in fade-in duration-200">
            <textarea
              className="w-full bg-slate-50 dark:bg-[#101722] border border-slate-200 dark:border-border-dark rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all min-h-[100px] resize-none"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-1.5 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                disabled={isSubmitting}
              >
                {t.cancel}
              </button>
              <button
                onClick={handleUpdatePost}
                className="bg-primary hover:bg-blue-600 text-white px-5 py-1.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
                disabled={isSubmitting || !editedContent.trim()}
              >
                {isSubmitting ? '...' : t.save}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-slate-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
        )}
      </div>

      {/* Media */}
      {post.imageUrl && (
        <Link to={`/post/${post.id}`}>
          <div className="w-full bg-black/50 aspect-video overflow-hidden">
            <img 
              src={post.imageUrl} 
              className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity" 
              alt="Post content"
            />
          </div>
        </Link>
      )}

      {/* Stats */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-border-dark">
        <div className="flex items-center gap-1">
          <div className="bg-primary rounded-full p-0.5 shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-[10px] text-white block filled">thumb_up</span>
          </div>
          <span className="text-text-secondary text-xs hover:underline cursor-pointer ml-1">{post.likeCount}</span>
        </div>
        <div className="flex gap-3 text-xs text-text-secondary">
          <Link to={`/post/${post.id}`} className="hover:underline">{post.commentCount} {t.comment.toLowerCase()}</Link>
          <span className="hover:underline cursor-pointer">{post.shareCount} {t.share.toLowerCase()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-2 py-1 flex items-center justify-between">
        <button disabled={post.isOptimistic || isEditing} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors group ${post.isLiked ? 'text-primary' : 'text-text-secondary hover:bg-gray-100 dark:hover:bg-[#223149] disabled:opacity-30'}`}>
          <span className={`material-symbols-outlined group-hover:text-red-500 transition-colors ${post.isLiked ? 'filled text-red-500' : ''}`}>favorite</span>
          <span className="text-sm font-medium group-hover:text-red-500">{t.like}</span>
        </button>
        <Link to={(post.isOptimistic || isEditing) ? '#' : `/post/${post.id}`} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#223149] text-text-secondary transition-colors group ${(post.isOptimistic || isEditing) ? 'pointer-events-none opacity-30' : ''}`}>
          <span className="material-symbols-outlined group-hover:text-primary">chat_bubble</span>
          <span className="text-sm font-medium group-hover:text-primary">{t.comment}</span>
        </Link>
        <button disabled={post.isOptimistic || isEditing} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#223149] text-text-secondary transition-colors group disabled:opacity-30">
          <span className="material-symbols-outlined group-hover:text-green-500">share</span>
          <span className="text-sm font-medium group-hover:text-green-500">{t.share}</span>
        </button>
      </div>
    </article>
  );
};

export default PostCard;
