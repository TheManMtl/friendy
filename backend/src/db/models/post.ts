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
  type: Enumerator;
  commentCount: number;
  likeCount: number;
  isActive: boolean;
  isLocked: boolean;
  isDeleted: boolean;

  //nullable
  imageId?: number;
  postId?: number;
  profileId?: number;
  content?: string;

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
    type!: Enumerator;
    commentCount!: number;
    likeCount!: number;
    isActive!: boolean;
    isLocked!: boolean;
    isDeleted!: boolean;
  
    //nullable
    imageId?: number;
    postId?: number;
    profileId?: number;
    content?: string;

    static associate(models: any) {
  
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
      references: {
        model: 'Users',
        key: 'id'
      }
    },

    imageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Images',
        key: 'id'
      }
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

  },
    {
      sequelize,
      modelName: 'Post',
    });
  return Post;
};