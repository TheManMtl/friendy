import express from "express";
import * as s3Middleware from "../middleware/S3Middleware";
import * as multer from "../middleware/MulterMiddleware";
import * as posts from "../controllers/posts-controller";


const router = express.Router();

router.get('/:id([0-9]+)', s3Middleware.attachS3Info, posts.getPost);
router.get('/user/:id([0-9]+)', s3Middleware.attachS3Info, posts.getTimeline);
router.post('/', multer.uploadSingleImage, s3Middleware.attachS3Info, posts.createPost);
router.put('/:id([0-9]+)', posts.updatePost);
router.delete('/:id([0-9]+)', s3Middleware.attachS3Info, posts.deletePost);


export default router;
