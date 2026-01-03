
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  bio?: string;
  role: UserRole;
  location?: string;
  website?: string;
  joinedDate: string;
  followingCount: number;
  followerCount: number;
}

export interface Post {
  id: string;
  userId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  location?: string;
  isLiked?: boolean;
  isOptimistic?: boolean; // New: For optimistic updates
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likeCount: number;
  replies?: Comment[];
  isAuthor?: boolean;
}
