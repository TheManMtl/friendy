//TODO: MODEL ASSOCIATIONS

'use strict';
import {
  Model
} from 'sequelize';

interface UserAttributes {

  //non-nullable
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  role: Enumerator;

  //nullable
  location?: string;
  school?: string;
  workplace?: string;
  position?: string;
  birthday?: Date;
  relationshipStatus?: Enumerator;
  relationshipWithId?: number;
  profilePostId?: number;
  coverPostId?: number;
  relationshipUpdatedAt?: Date;
  profileUpdatedAt?: Date;
  sellerRating?: number;

}
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    //non-nullable
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    isActive!: boolean;
    role!: Enumerator;

    //nullable
    location?: string;
    school?: string;
    workplace?: string;
    position?: string;
    birthday?: Date;
    relationshipStatus?: Enumerator;
    relationshipWithId?: number;
    profilePostId?: number;
    coverPostId?: number;
    relationshipUpdatedAt?: Date;
    profileUpdatedAt?: Date;
    sellerRating?: number;

    static associate(models: any) {
  
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 100],
      },
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        len: [7, 100],
      },
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 100],
      },
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },

    role: {
      type: DataTypes.ENUM("User", "Admin"),
      allowNull: false,
      defaultValue: "User"
    },

    location: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 100],
      }
    },

    school: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 50],
      }
    },

    workplace: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 50],
      }
    },

    position: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 50],
      }
    },

    birthday: {
      type: DataTypes.DATEONLY
    },

    relationshipStatus: {
      type: DataTypes.ENUM("Single", "In a relationship", "Dating", "Engaged", "Married")
    },

    relationshipWithId: {
      type: DataTypes.INTEGER
    },

    profilePostId: {
      type: DataTypes.INTEGER
    },

    coverPostId: {
      type: DataTypes.INTEGER
    },

    relationshipUpdatedAt: {
      type: DataTypes.DATE
    },

    profileUpdatedAt: {
      type: DataTypes.DATE
    },

    sellerRating: {
      type: DataTypes.DOUBLE
    }
  },
    {
      sequelize,
      modelName: 'User',
    });
  return User;
};