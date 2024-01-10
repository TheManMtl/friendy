import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  Unique,
  IsEmail,
  Default,
  BelongsTo,
} from "sequelize-typescript";

import Post from "./Post";

@Table({
  timestamps: true,
})
class User extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    validate: {
      len: [5, 100],
    },
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    validate: {
      len: [7, 100],
    },
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  isDeleted!: boolean;

  @Column({
    type: DataType.ENUM("User", "Admin"),
    defaultValue: "User",
  })
  role!: string;

  @Column({
    type: DataType.STRING,
    validate: {
      len: [5, 100],
    },
  })
  location?: string;

  @Column({
    type: DataType.STRING,
    validate: {
      len: [5, 50],
    },
  })
  school?: string;

  @Column({
    type: DataType.STRING,
    validate: {
      len: [5, 50],
    },
  })
  workplace?: string;

  @Column({
    type: DataType.STRING,
    validate: {
      len: [5, 50],
    },
  })
  position?: string;

  @Column({
    type: DataType.DATEONLY,
  })
  birthday?: Date;

  @Column({
    type: DataType.ENUM("Single", "Dating", "Engaged", "Married"),
  })
  relationshipStatus?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  inRelationWithId?: number;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
  })
  profilePostId?: number;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
  })
  coverPostId?: number;

  @Column({
    type: DataType.DATEONLY,
  })
  relationshipUpdatedAt?: Date;

  @Column({
    type: DataType.DATEONLY,
  })
  profileUpdatedAt?: Date;

  @Column({
    type: DataType.DOUBLE,
  })
  sellerRating?: number;

  @BelongsTo(() => User)
  inRelationWith?: User;
  @BelongsTo(() => Post)
  profilePost?: Post;
  @BelongsTo(() => Post)
  profileCover?: Post;
}

export default User;
