'use strict';
import {
    Model
} from 'sequelize';

enum AlbumType {

    ProfilePic = "profilePic",
    CoverPhoto = "coverPhoto",
    Custom = "custom"
}
interface AlbumAttributes {

    //non-nullable
    id: number;
    type: AlbumType;
    title: string;


    //nullable
    profileId?: number;
    deletedAt?: Date;
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

        //nullable
        profileId?: number;
        deletedAt?: Date;

        static associate(models: any) {
            this.belongsTo(models.User, {
                foreignKey: 'profileId',
            });
            
            this.belongsToMany(models.Post, {
                through: 'AlbumPost',
                foreignKey: 'albumId',
              });

        }
    }
    Album.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        profileId: {
            type: DataTypes.INTEGER,
        },

        type: {
            type: DataTypes.ENUM("profilePic", "coverPhoto", "custom"),
            allowNull: false,
            defaultValue: "profilePic"
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

          deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
          }


    },
        {
            sequelize,
            modelName: 'Album',
            paranoid: true,
        });
    return Album;
};