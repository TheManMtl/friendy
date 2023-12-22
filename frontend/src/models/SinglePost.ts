import { PostType } from "./PostTypeEnum";

export interface SinglePost {
  //non-nullable
  id: number;
  authorId: number;
  type: PostType;
  commentCount: number;
  likeCount: number;
  isLocked: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  //nullable
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  albumId?: number | null;
  imageId?: number | null;
  postId?: number | null;
  profileId?: number | null;
  content?: string | null;
}
