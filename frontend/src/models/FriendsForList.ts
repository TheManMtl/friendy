export interface FriendsForList {
  friendId: number;
  name: string;
  userId: number;
  friendsSince: Date;
  thumbnail?: string | null;
  profilePostId?: number | null;
}
