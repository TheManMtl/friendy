import dotenv from "dotenv";
import app from "./app";
dotenv.config();

//const app = express();
const port = process.env.PORT || 8181;
import db from "./db/models";

//for seeding:
/*
import users from './db/seeders/users';

const createUsers = () => {
  users.map((user: any) => {
    db.User.create(user)
  })
}
createUsers();
*/

// {force: true}    {alter: true}     <-- use as needed
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`server running on post ${port}`);
  });
});
