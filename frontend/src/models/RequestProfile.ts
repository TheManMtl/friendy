export interface RequestProfile {
  id?: number;
  name?: string;
  userId?: number;
  requestedAt?: Date;
  thumbnail?: string;
  profilePostId: number;
  mutualFriends?: number;
}
