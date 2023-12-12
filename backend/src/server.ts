import dotenv from "dotenv";
import multer from "multer";
import app from "./app";
import { S3Client } from "@aws-sdk/client-s3";
dotenv.config();
// const bucketName=process.env.BUCKET_NAME
// const bucketRegion=process.env.BUCKET_REGION
// const accessKey=process.env.ACCESS_KEY
// const secretAccessKey=process.env.SECRET_ACCESS_KEY
// const s3 = new S3Client({
//   region: bucketRegion,
//   credentials: {
//     accessKeyId: accessKey,
//     secretAccessKey: secretAccessKey }

//    });
//const app = express();
const port = process.env.PORT || 8181;
import db from "./db/models";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post;
upload.array("images", 9);

// app.post('/posts', async (req, res) => {
//   const file = req.file
//   const caption = req.body.caption

//   const fileBuffer = await sharp(file.buffer)
//     .resize({ height: 1920, width: 1080, fit: "contain" })
//     .toBuffer()

//   // ...
// })

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
