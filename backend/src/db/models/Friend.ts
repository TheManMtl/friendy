'use strict';
import {
  Model
} from 'sequelize';


interface FriendAttributes {

  //non-nullable
  id: number;
  requestedById: number;
  requestedToId: number;
  requestedAt: Date;
  
  

  //nullable

  acceptedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Friend extends Model<FriendAttributes> implements FriendAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    //non-nullable
    id!: number;
    requestedById!: number;
    requestedToId!: number;
    requestedAt!: Date;
  
    //nullable
    acceptedAt?: Date;

    static associate(models: any) {
        this.belongsTo(models.User, {
            foreignKey: 'requestedById',
        });
        this.belongsTo(models.User, {
            foreignKey: 'requestedToId',
        });
       
    }
  }
 Friend.init({

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    requestedById: {
      type: DataTypes.INTEGER,
      allowNull: false,
    
    },

    requestedToId: {
        type: DataTypes.INTEGER,
        allowNull: false,
     
    },
    requestedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },

    acceptedAt: {
        type: DataTypes.DATE,
    
    },


  },
    {
      sequelize,
      modelName: 'Friend',
    });
  return Friend;
};