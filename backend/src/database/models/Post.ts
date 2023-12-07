import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import Image from "./Image";
import User from "./User";

enum ImageType {
  Timeline = "timeline",
  ProfilePic = "profilePic",
  CoverPhoto = "coverPhoto",
  AlbumImg = "albumImg",
}

@Table({
  timestamps: true,
  tableName: "post",
})
class Post extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Image)
  @Column({
    type: DataType.INTEGER,
  })
  imageId?: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  authorId!: number;
  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
  })
  postId?: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  profileId?: number;

  @Column({
    type: DataType.ENUM("timeline", "profilePic", "coverPhoto", "albumImg"),
    allowNull: false,
  })
  type!: ImageType;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  commentCount!: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  likeCount!: number;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isActive!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isLocked!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isDeleted!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;

  @BelongsTo(() => Image)
  image?: Image;

  @BelongsTo(() => User)
  author!: User;
  @BelongsTo(() => Post)
  post?: Post;
  @BelongsTo(() => User)
  profile?: User;
}
export default Post;
