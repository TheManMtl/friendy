'use strict';
import {
    Model
} from 'sequelize';


interface LikeAttributes {

    //non-nullable
    id: number;
    userId: number;
    createdAt: Date;

    //nullable
    postId?: number;
    commentId?: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Like extends Model<LikeAttributes> implements LikeAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        //non-nullable
        id!: number;
        userId!: number;
        createdAt!: Date;
        //nullable
        postId?: number;
        commentId?: number;
    

        static associate(models: any) {

        this.belongsTo(models.User, {
            foreignKey: 'userId',
        });

        this.belongsTo(models.Post, {
            foreignKey: 'postId',
        });
        this.hasMany(models.Comment, {
            foreignKey: 'commentId',
        });
    }
}
Like.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    postId: {
        type: DataTypes.INTEGER,
        
    },
    commentId: {
        type: DataTypes.INTEGER,
        
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now')
    },
},
    {
        sequelize,
        modelName: 'Like',

    });
return Like;
};