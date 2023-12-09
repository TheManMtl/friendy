//TODO: MODEL ASSOC, GROUPID & EVENTID, CHECK CONSTRAINTS

'use strict';
import {
  Model
} from 'sequelize';

enum PostType {
  Timeline = "timeline",
  ProfilePic = "profilePic",
  CoverPhoto = "coverPhoto",
  AlbumImg = "albumImg"
}

interface PostAttributes {

  //non-nullable
  id: number;
  authorId: number;
  type: PostType;
  commentCount: number;
  likeCount: number;
  isActive: boolean;
  isLocked: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  //nullable
  imageId?: number;
  postId?: number;
  profileId?: number;
  content?: string;
  deletedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Post extends Model<PostAttributes> implements PostAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    //non-nullable
    id!: number;
    authorId!: number;
    type!: PostType;
    commentCount!: number;
    likeCount!: number;
    isActive!: boolean;
    isLocked!: boolean;
    isDeleted!: boolean;
    createdAt!: Date;
    updatedAt!: Date;
  
    //nullable
    imageId?: number;
    postId?: number;
    profileId?: number;
    content?: string;
    deletedAt?: Date;
    static associate(models: any) {
      this.belongsTo(models.User, {
        foreignKey: 'authorId',
      });
      this.hasMany(models.Image, {
        foreignKey: 'imageId',
      });
      //TODO check if this is correct
      this.belongsTo(models.Post, {
        foreignKey: 'postId', 
        as: 'ParentPost' 
      });
      this.hasOne(models.User, {
        foreignKey: 'profileId',
      });

      this.hasOne(models.User,{
        foreignKey:'profilePostId',
      });
      this.hasOne(models.User,{
        foreignKey:'coverPostId',
      });
      this.hasMany(models.Comment,{
        foreignKey:'postId',
      });
      this.belongsToMany(models.Album, {
        through: 'AlbumPost',
        foreignKey: 'postId',
      });
    }
  }
  Post.init({

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },

    type: {
      type: DataTypes.ENUM("timeline", "profilePic", "coverPhoto", "albumImg"),
      allowNull: false,
      defaultValue: "timeline"
    },

    content: {
      type: DataTypes.TEXT,
      validate: {
        len: [1, 1500]
      }
    },

    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts',
        key: 'id'
      }
    },

    profileId: {
      type: DataTypes.INTEGER,
     
    },

    imageId: {
      type: DataTypes.INTEGER,
     
    },

    commentCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },

    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },

    isLocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },

    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
      modelName: 'Post',
      paranoid: true, // Enable soft deletes. This enables the paranoid mode in Sequelize, which automatically handles soft deletes. When a record is deleted, Sequelize will set the deletedAt field to the current timestamp instead of physically removing the record from the database.
    });
  return Post;
};