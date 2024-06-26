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

export enum PostType {
  timeline = "timeline",
  profilePic = "profilePic",
  coverPhoto = "coverPhoto",
  albumImg = "albumImg",
}
export interface Post {
  albumId?: number;
  type: PostType;
  authorId: number | undefined;
  commentCount?: number;
  content?: string;
  id?: number;
  imageId?: number | null;
  likeCount?: number;
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

//to retrieve error messages from api
export type apiError = {
  message: string;
};

export type FriendListType = {
  friendId: number;
  name: string;
  userId: number;
  friendsSince: Date;
  thumbnail: string;
};
