import dotenv from "dotenv";
import app from "./app";
dotenv.config();

//const app = express();
const port = process.env.PORT || 8181;
import db from "./db/models";

//for seeding:
/* users
import saveUsers from './db/seeders/users';
async function seedUsers() { return await saveUsers(); }
seedUsers();
*/
/* posts
import savePosts from './db/seeders/posts';
async function seedPosts() { return await savePosts(); }
seedPosts();
*/
/* friends
import saveFriends from './db/seeders/friends';
async function seedFriends() { return await saveFriends(); }
seedFriends();
*/

// {force: true}    {alter: true}     <-- use as needed
db.sequelize.authenticate().then(() => {
  app.listen(port, () => {
    console.log(`server running on post ${port}`);
  });
});
