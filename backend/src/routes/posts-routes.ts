import express from "express";
import * as s3Middleware from "../middleware/S3Middleware";
import * as multer from "../middleware/MulterMiddleware";
import * as posts from "../controllers/posts-controller";
import { authUser } from "../middleware/auth";

const router = express.Router();

router.get("/:id([0-9]+)", s3Middleware.attachS3Info, posts.getPost);
router.get("/user/:id([0-9]+)", s3Middleware.attachS3Info, posts.getTimeline);
router.get(
  "/userprofile/:id([0-9]+)",
  s3Middleware.attachS3Info,
  posts.getPostImageUrl
);
router.get("/newsfeed", authUser, s3Middleware.attachS3Info, posts.getNewsfeed);
router.get("/album/:albumId([0-9]+)", s3Middleware.attachS3Info, posts.getPostsByAlbumId);
router.post(
  "/",
  authUser,
  multer.uploadSingleImage,
  s3Middleware.attachS3Info,
  posts.createPost
);
router.post('/multiple', authUser, multer.uploadMultipleImages, s3Middleware.attachS3Info, posts.createMultiplePosts);
router.put("/:id([0-9]+)", authUser, posts.editPostContent);
router.put("/toalbum/:postId([0-9]+)", authUser, posts.moveToAlbum)
router.delete(
  "/:id([0-9]+)",
  authUser,
  s3Middleware.attachS3Info,
  posts.deletePost
);

router.get('/user/:userId([0-9]+)/photos', s3Middleware.attachS3Info, posts.getPhotosByUserId);
export default router;
