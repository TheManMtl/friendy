export interface SearchProfile {
  id: number;
  name?: string;
  userId?: number;
  thumbnail?: string;
  profilePostId?: number;
  location?: string;
  school?: string;
  workplace?: string;
  isFriend: boolean;
  mutualFriends: number;
}
