'use strict';
import {
  Model
} from 'sequelize';


interface CommentAttributes {

  //non-nullable
  id: number;
  userId: number;
  postId: number;
  body: string;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;

  //nullable
  parentId?: number;
  deletedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Comment extends Model<CommentAttributes> implements CommentAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    //non-nullable
    id!: number;
    userId!: number;
    postId!: number;
    body!: string;
    likeCount!: number;
    createdAt!: Date;
    updatedAt!: Date;
  
    //nullable
    parentId?: number;
    deletedAt?: Date;
    static associate(models: any) {
        this.belongsTo(models.User, {
            foreignKey: 'userId',
        });
        this.belongsTo(models.Post, {
            foreignKey: 'postId',
        });
        this.belongsTo(models.Comment, {
            foreignKey: 'parentId',
            as: 'parentComment'
        });
        this.hasMany(models.Like, {
            foreignKey: 'commentId',
        });
    }
  }
 Comment.init({

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    
    },

    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
     
    },
    parentId: {
        type: DataTypes.INTEGER,
       
      },

    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 1500]
      }
    },

    likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.fn('now')
        },
        
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.fn('now')
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true
        }

  },
    {
      sequelize,
      modelName: 'Comment',
      paranoid: true,
    });
  return Comment;
};