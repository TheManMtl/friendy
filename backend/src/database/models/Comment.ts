import User from "./User";
import Post from "./Post";
import Like from "./Like";

import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "comment",
})
class Comment extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  // author of comment
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  // top-level post
  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  postId!: number;

  // parent comment if nested
  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  parentId?: number;

  // comment body
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  body!: string;

  // like count
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  likeCount!: number;

  //model associations

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Post)
  post!: Post;

  @BelongsTo(() => Comment)
  comment?: Comment;

  @HasMany(() => Like)
  likes?: Like[];
}

export default Comment;
