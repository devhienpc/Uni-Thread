
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { vi } from '../../lang/vi';
import { Post, UserRole, Comment, Notification } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';
import { useNotificationStore } from '../../store/useNotificationStore';

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();
  const { addNotification } = useNotificationStore();
  const t = vi.common;

  const [post, setPost] = useState<Post>({
    id: id || 'post-detail-1',
    userId: 'user-admin',
    authorName: 'Nguyen Van A',
    authorAvatar: 'https://picsum.photos/seed/nguyenvana/100',
    authorRole: UserRole.ADMIN,
    content: 'Exploring the new features of Tailwind CSS 3.4. The dark mode integration is seamless! It really helps with eye strain during long coding sessions. The new container queries are also a game changer for component-based design. 🚀 #webdev #tailwindcss #frontend',
    imageUrl: 'https://picsum.photos/seed/code-screen/800/500',
    createdAt: 'Oct 24, 2023 • 14:30',
    likeCount: 124,
    commentCount: 42,
    shareCount: 12,
    isLiked: false
  });

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      postId: post.id,
      userId: 'user-s',
      authorName: 'Sarah Miller',
      authorAvatar: 'https://picsum.photos/seed/sarah/80',
      content: 'Totally agree! The configuration file makes it so easy to customize the entire design system in one place.',
      createdAt: '2 hours ago',
      likeCount: 5
    },
    {
      id: 'c2',
      postId: post.id,
      userId: 'user-d',
      authorName: 'David Chen',
      authorAvatar: 'https://picsum.photos/seed/david/80',
      content: 'Can you share the full config gist? I\'m struggling with the dark mode toggle implementation.',
      createdAt: '5 hours ago',
      likeCount: 1,
      replies: [
        {
          id: 'c2-r1',
          postId: post.id,
          userId: post.userId,
          authorName: post.authorName,
          authorAvatar: post.authorAvatar,
          content: 'Sure! I\'ll update the post with a link to the GitHub repo shortly.',
          createdAt: '1 hour ago',
          likeCount: 0,
          isAuthor: true
        }
      ]
    }
  ]);

  // Simulate real-time incoming comment
  useEffect(() => {
    const timer = setTimeout(() => {
      const incomingComment: Comment = {
        id: `c-realtime-${Date.now()}`,
        postId: post.id,
        userId: 'user-realtime',
        authorName: 'Alex Johnson',
        authorAvatar: 'https://picsum.photos/seed/alex/80',
        content: 'Wow, I just tried this out and it works perfectly! Thanks for sharing this detailed post.',
        createdAt: 'Vừa xong',
        likeCount: 0
      };

      // 1. Add comment to UI
      setComments(prev => [incomingComment, ...prev]);
      
      // 2. Update post comment count
      setPost(prev => ({ ...prev, commentCount: prev.commentCount + 1 }));

      // 3. Trigger Global Notification
      const notification: Notification = {
        id: `notif-${Date.now()}`,
        type: 'comment',
        message: 'đã bình luận về bài viết của bạn.',
        fromUser: {
          name: 'Alex Johnson',
          avatar: 'https://picsum.photos/seed/alex/80'
        },
        postId: post.id,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      
      addNotification(notification);

      // 4. Show Toast
      addToast({ 
        message: `${notification.fromUser.name} ${notification.message}`, 
        type: 'info' 
      });

    }, 5000); // Receive a "real-time" comment after 5 seconds

    return () => clearTimeout(timer);
  }, [id, addNotification, addToast, post.id]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased min-h-screen flex">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0b1019]">
        <div className="max-w-3xl mx-auto px-4 py-6 md:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link className="text-text-secondary hover:text-primary transition-colors" to="/">Feed</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 dark:text-white font-medium">{t.postDetails}</span>
          </div>

          <article className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-border-dark overflow-hidden mb-8">
            <div className="p-5 flex justify-between items-start">
              <div className="flex gap-4">
                <img src={post.authorAvatar} className="size-12 rounded-full border border-border-dark object-cover" alt="Author" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight">{post.authorName}</h3>
                    {post.authorRole === 'admin' && (
                      <span className="bg-primary/20 text-primary text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">Admin</span>
                    )}
                  </div>
                  <span className="text-text-secondary text-sm">{post.createdAt}</span>
                </div>
              </div>
              <button className="text-text-secondary hover:text-white rounded-full p-1 hover:bg-slate-100 dark:hover:bg-border-dark transition-colors">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>

            <div className="px-5 pb-3">
              <p className="text-slate-800 dark:text-slate-200 text-base leading-relaxed mb-4">{post.content}</p>
              {post.imageUrl && (
                <div className="w-full rounded-lg overflow-hidden border border-slate-100 dark:border-border-dark mt-2 bg-slate-100 dark:bg-black/20">
                  <img src={post.imageUrl} className="w-full h-auto object-cover max-h-[500px]" alt="Post Content" />
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-b border-slate-100 dark:border-border-dark flex items-center justify-between text-sm text-text-secondary">
              <div className="flex gap-4">
                <span><strong className="text-slate-900 dark:text-white">{post.likeCount}</strong> {t.like}s</span>
                <span><strong className="text-slate-900 dark:text-white">{post.commentCount}</strong> {t.comment}s</span>
              </div>
              <span><strong className="text-slate-900 dark:text-white">{post.shareCount}</strong> {t.share}s</span>
            </div>

            <div className="flex border-b border-slate-100 dark:border-border-dark">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-slate-50 dark:hover:bg-[#1e293b] transition-colors text-text-secondary font-medium">
                <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                {t.like}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-slate-50 dark:hover:bg-[#1e293b] transition-colors text-primary font-medium">
                <span className="material-symbols-outlined text-[20px] filled">mode_comment</span>
                {t.comment}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-slate-50 dark:hover:bg-[#1e293b] transition-colors text-text-secondary font-medium">
                <span className="material-symbols-outlined text-[20px]">share</span>
                {t.share}
              </button>
            </div>

            <div className="bg-slate-50/50 dark:bg-[#131b2b]">
              <div className="p-5 flex gap-4 items-start">
                <img src={user?.avatarUrl} className="size-10 rounded-full flex-shrink-0" alt="My Avatar" />
                <div className="flex-1">
                  <textarea 
                    className="w-full bg-white dark:bg-surface-dark border border-slate-300 dark:border-border-dark rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-text-secondary focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none min-h-[80px]" 
                    placeholder={t.writeComment}
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button className="bg-primary hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
                      {t.post} {t.comment}
                      <span className="material-symbols-outlined text-[16px]">send</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 flex flex-col gap-6">
                {comments.map(comment => (
                  <div key={comment.id} className="flex gap-3 animate-in slide-in-from-top-2 duration-300">
                    <img src={comment.authorAvatar} className="size-8 rounded-full flex-shrink-0 mt-1" alt="Avatar" />
                    <div className="flex flex-col flex-1 gap-1">
                      <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-slate-900 dark:text-white text-sm font-bold">{comment.authorName}</h4>
                          <span className="text-xs text-text-secondary">{comment.createdAt}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-sm">{comment.content}</p>
                      </div>
                      <div className="flex items-center gap-4 px-2">
                        <button className="text-xs font-medium text-text-secondary hover:text-primary transition-colors">Like</button>
                        <button className="text-xs font-medium text-text-secondary hover:text-primary transition-colors">Reply</button>
                        {comment.likeCount > 0 && (
                          <>
                            <span className="text-xs text-text-secondary/50">•</span>
                            <span className="text-xs text-text-secondary">{comment.likeCount} likes</span>
                          </>
                        )}
                      </div>

                      {/* Replies */}
                      {comment.replies?.map(reply => (
                        <div key={reply.id} className="flex gap-3 mt-2">
                          <img src={reply.authorAvatar} className="size-6 rounded-full flex-shrink-0 mt-1" alt="Reply Avatar" />
                          <div className="flex flex-col flex-1 gap-1">
                            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-2xl rounded-tl-none px-4 py-2">
                              <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-slate-900 dark:text-white text-sm font-bold">{reply.authorName}</h4>
                                  {reply.isAuthor && <span className="bg-primary text-white text-[9px] uppercase font-bold px-1 rounded-sm">Author</span>}
                                </div>
                                <span className="text-xs text-text-secondary">{reply.createdAt}</span>
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 text-sm">{reply.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
