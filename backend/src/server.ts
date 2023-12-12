import dotenv from "dotenv";
import app from "./app";
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
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`server running on post ${port}`);
  });
});
