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
} from "sequelize-typescript";

import Post from "./Post";

@Table({
  timestamps: true,
})
class User extends Model {
  @Column({
    type: DataType.INTEGER,
  })
  @PrimaryKey
  id!: number;

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
  })
  @Unique
  @IsEmail
  email!: string;

  @Column({
    type: DataType.STRING,
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  @Default(true)
  isActive!: string;

  @Column({
    type: DataType.ENUM("User", "Admin"),
  })
  @Default("User")
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
}

export default User;
