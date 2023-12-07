import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  Default,
  BelongsTo,
} from "sequelize-typescript";

import User from "./User";

@Table({
  timestamps: false,
})
class Friend extends Model {
  @Column({
    type: DataType.INTEGER,
  })
  @PrimaryKey
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  RequestedById!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  RequestedToId!: number;

  @Column({
    type: DataType.DATE,
  })
  @Default(() => new Date())
  requestedAt!: Date;

  @Column({
    type: DataType.DATE,
  })
  acceptedAt?: Date;

  @BelongsTo(() => User)
  RequestedBy!: User;
  @BelongsTo(() => User)
  RequestedTo!: User;
}

export default Friend;
