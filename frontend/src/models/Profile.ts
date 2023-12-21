import { RelationshipStatus } from "./RelationshipEnum";

export interface Profile {
  name?: string;
  email?: string;
  location?: string;
  school?: string;
  workplace?: string;
  position?: string;
  bio?: string;
  birthday?: string;
  relationshipStatus?: RelationshipStatus;
  profileImgId?: number;
  profileImgThumbnail?: string;
  coverImgId?: number;
  coverImgFileName?: string;
  relationId?: number;
  relationName?: string;
  isFriend?: boolean;
}
