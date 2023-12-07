import{
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import Album from './Album';
import Post from './Post';
@Table({
    timestamps: true,
    tableName: 'albumPost',
})
class AlbumPost extends Model{
@Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
})
id!: number;

@ForeignKey(() => Album)
@Column({
    type: DataType.INTEGER,
    allowNull: false,
})
albumId!: number;

@ForeignKey(() => Post)
@Column({
    type: DataType.INTEGER,
    allowNull: false,
})
postId!: number;

@BelongsTo(() => Album)
album!: Album;

@BelongsTo(() => Post)
post!: Post;

}
export default AlbumPost;