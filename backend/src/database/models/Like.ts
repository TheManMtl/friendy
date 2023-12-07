import User from './User';
import Post from './Post';
import Comment from './Comment';

import{
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo
    
} from 'sequelize-typescript';  

@Table({
    timestamps: true,
    tableName: 'like',
    })
 class Like extends Model{

    @Column({
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    postId?: number;

    @ForeignKey(() => Comment)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    commentId?: number;

    //model associations

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Post)
    post?: Post;

    @BelongsTo(() => Comment)
    comment?: Comment;  
 }  

 export default Like;