import{
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import User from './User';
enum AlbumType {
    Timeline = 'timeline',
    ProfilePic = 'profilePic',
    CoverPhoto = 'coverPhoto',
    AlbumImg = 'albumImg',
}
@Table({
    timestamps: true,
    tableName: 'album',
})
class Album extends Model{
@Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
})
id!: number;

@ForeignKey(() => User)
@Column({
    type: DataType.INTEGER,
})
profileId?: number;
@Column({
    type: DataType.ENUM('profilePic', 'coverPhoto', 'custom'),
    allowNull: false,
})
type!: AlbumType; 
@Column({
    type: DataType.STRING,
    allowNull: false,
})
title!: string;
@CreatedAt
createdAt!: Date;
@BelongsTo(() => User)
profile!: User;
}

export default Album;