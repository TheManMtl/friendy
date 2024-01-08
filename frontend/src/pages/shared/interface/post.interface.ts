import { IImage } from "./image.interface";
import { Comment } from "../../../types/common";

export interface IPost {
  id: number;
  authorId: number;
  type: string;
  content: string;
  postId?: number;
  profileId?: number;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  albumId?: number;
  Image: IImage;
  imageUrl?: string;
  thumbnailUrl?: string;
  author: IPostAuthor;
  comments: Comment[];
}

interface IPostAuthor {
  id: number;
  name: string;
  profileImg?: IPost;
  defaultAvatarUrl?: string;
}
