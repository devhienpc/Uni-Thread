
import { create } from 'zustand';
import { Post } from '../types';

interface FeedState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (tempId: string, updatedPost: Post) => void;
  removePost: (postId: string) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (tempId, updatedPost) => set((state) => ({
    posts: state.posts.map((p) => (p.id === tempId ? updatedPost : p))
  })),
  removePost: (postId) => set((state) => ({
    posts: state.posts.filter((p) => p.id !== postId)
  })),
}));
