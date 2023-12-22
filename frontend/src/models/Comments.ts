export interface Comments {
  User: { name: string; profileImg: string };
  body: string;
  childCount: number;
  createdAt: Date;
  deleteAt?: Date | null;
  id: number;
  isDeleted: boolean;
  likeCount: number;
  parentId?: number | null;
  postId: number;
  updatedAt?: Date | null;
  userId: number;
}
