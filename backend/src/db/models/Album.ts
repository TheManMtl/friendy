"use strict";
import { Model } from "sequelize";

enum AlbumType {
  ProfilePic = "profilePic",
  CoverPhoto = "coverPhoto",
  Custom = "custom",
}
interface AlbumAttributes {
  //non-nullable
  id: number;
  type: AlbumType;
  title: string;
  isDeleted: boolean;

  //nullable
  profileId?: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Album extends Model<AlbumAttributes> implements AlbumAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    //non-nullable
    id!: number;
    type!: AlbumType;
    title!: string;
    isDeleted!: boolean;

    //nullable
    profileId?: number;

    static associate(models: any) {
      this.belongsTo(models.User, {
        foreignKey: "profileId",
      });

      this.hasMany(models.Post,{
        foreignKey: "albumId",
      })
    }
  }
  Album.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      profileId: {
        type: DataTypes.INTEGER,
      },

      type: {
        type: DataTypes.ENUM("profilePic", "coverPhoto", "custom"),
        allowNull: false,
        defaultValue: "profilePic",
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Album",
      paranoid: true,
    }
  );
  return Album;
};
