enum Role {
  User = "User",
  Admin = "Admin",
}

enum RelationshipStatus {
  Single = "Single",
  InARelationship = "In a relationship",
  Dating = "Dating",
  Engaged = "Engaged",
  Married = "Married",
}

interface UserProfileDTO {
  id: number;
  name: string;
  email: string;
  role: Role;

  //nullable
  location?: string;
  school?: string;
  workplace?: string;
  position?: string;
  bio?: string;
  birthday?: Date;
  relationshipStatus?: RelationshipStatus;
  relationshipWithId?: number;
  relationshipWithName?: string;
  profilePostId?: number;
  coverPostId?: number;
  relationshipUpdatedAt?: Date;
}

interface UserDTO {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export { UserProfileDTO, UserDTO };
