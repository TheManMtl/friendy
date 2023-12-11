"use strict";
import { Model } from "sequelize";

interface ImageAttributes {
  id: number;
  fileName: string;
  thumbnail: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Image extends Model<ImageAttributes> implements ImageAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    fileName!: string;
    thumbnail!: string;

    static associate(models: any) {
      this.hasOne(models.Post, {
        foreignKey: "imageId",
        as: "image",
      });
    }
  }
  Image.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 200],
        },
      },

      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 200],
        },
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
