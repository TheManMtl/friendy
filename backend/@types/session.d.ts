import sequelize from "sequelize";

declare module "express-session" {
  interface SessionData {
    userId: sequelize.Types.ObjectId;
    name: sequelize.DataTypes.StringDataType;
  }
}
