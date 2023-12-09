'use strict';
import {
    Model
} from 'sequelize';


interface AlbumPostAttributes {

    //non-nullable
    id: number;
    albumId: number;
    postId: number;

}

module.exports = (sequelize: any, DataTypes: any) => {
    class AlbumPost extends Model<AlbumPostAttributes> implements AlbumPostAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        //non-nullable
        id!: number;
        albumId!: number;
        postId!: number;
    

        static associate(models: any) {


        }
    }
    AlbumPost.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        albumId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Album',
                key: 'id',
              },
        },

       postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Post',
                key: 'id',
              },
        },
    },
        {
            sequelize,
            modelName: 'AlbumPost',
           
        });
    return AlbumPost;
};