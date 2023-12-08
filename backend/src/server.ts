import express from "express";
require("dotenv").config();

// import "./database/connection";
// import Image from "./database/models/Image";
// import Post from "./database/models/Post";

const app = express();
const port = process.env.PORT || 8181;
import db from "./db/models";

app.get("/", async (req, res) => {
  res.send("Hello there, world");
});

//later, for seeding:

/*
import {users} from './db/seeders/users';

const createUsers = () => {
  users.map(user => {
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

// app.get("/images", async (req, res) => {
//   try {
//     const images = await Image.findAll(); // Fetch all images from the database
//     res.json(images);
//   } catch (error) {
//     console.error("Error fetching images:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
