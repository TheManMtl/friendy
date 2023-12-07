import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = Number(process.env.DB_PORT);

if (!dbName || !dbUsername || !dbPassword || !dbHost || isNaN(dbPort)) {
  throw new Error(
    "One or more required environment variables are undefined or invalid."
  );
}

console.log(dbHost + " \n \n \n db host above");
const sequelize = new Sequelize({
  database: dbName,
  dialect: "mysql",
  username: dbUsername,
  password: dbPassword,
  host: dbHost,
  port: dbPort,
  models: [__dirname + "/models"],
  logging: console.log,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
