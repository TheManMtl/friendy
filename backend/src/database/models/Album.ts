import{
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import UserProfile from './UserProfile';
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

@ForeignKey(() => UserProfile)
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
@BelongsTo(() => UserProfile)
profile!: UserProfile;
}

export default Album;