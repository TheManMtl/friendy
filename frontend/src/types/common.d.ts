export interface User {
  bio?: string;
  birthday?: Date;
  coverPostId?: number;
  createdAt: Date;
  email: string;
  location?: string;
  name: string;
  password: string;
  position?: string;
  profilePostId?: number;
  school?: string;
  workplace?: string;
}

export interface Post {
  albumId?: number;
  authorId: number;
  commentCount: number;
  content?: string;
  id: number;
  imageId?: number;
  likeCount: number;
  postId?: number;
  profileId?: number;
}

export interface Comment {
  id: number;
  authorId: number;
  authorName: string;
  authorPic: string;
  postId: number;
  body: string;
  likeCount: number;
  createdAt: string;
}