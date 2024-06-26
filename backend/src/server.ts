import dotenv from "dotenv";
// import app from "./app";
import server from "./app";
dotenv.config();

//const app = express();
const port = process.env.PORT || 8181;
import db from "./db/models";

//for seeding:


// import users from './db/seeders/users';

// const createUsers = () => {
//   users.map((user: any) => {
//     db.User.create(user)
//   })
// }
// createUsers();

// import createPosts from './db/seeders/posts';

// const savePosts = async () => {

//   await createPosts().then( (posts) => {

//     console.log(posts);

//     posts.map((post: any) => {
//       db.Post.create(post);
//     })
//   })
// }
// savePosts();

// {force: true}    {alter: true}     <-- use as needed
 //db.sequelize.sync({ alter: true });
// db.sequelize.authenticate().then(() => {
//   app.listen(port, () => {
//     console.log(`server running on post ${port}`);
//   });
// });

db.sequelize.authenticate().then(() => {
  server.listen(port, () => {
    console.log(`server running on post ${port}`);
  });
});
