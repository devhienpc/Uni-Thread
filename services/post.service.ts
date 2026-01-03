
import { Post } from '../types';
import { apiClient } from './apiClient';
import { getStoredPosts } from '../utils/storage';

export const postService = {
  async createPost(post: Post): Promise<Post> {
    const posts = getStoredPosts();
    localStorage.setItem('app_posts', JSON.stringify([post, ...posts]));
    
    return await apiClient.post<Post>('content', '/posts', post);
  },

  async updatePost(postId: string, content: string): Promise<void> {
    const posts = getStoredPosts();
    const index = posts.findIndex(p => p.id === postId);
    if (index !== -1) {
      posts[index].content = content;
      localStorage.setItem('app_posts', JSON.stringify(posts));
    }
    
    await apiClient.patch('content', `/posts/${postId}`, { content });
  },

  async deletePost(postId: string): Promise<void> {
    const posts = getStoredPosts();
    const filtered = posts.filter(p => p.id !== postId);
    localStorage.setItem('app_posts', JSON.stringify(filtered));
    
    await apiClient.delete('content', `/posts/${postId}`);
  }
};
