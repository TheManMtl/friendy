import express from "express";
import * as s3Middleware from "../middleware/S3Middleware";
import * as multer from "../middleware/MulterMiddleware";
import * as albums from "../controllers/album-controller";
import { authUser } from "../middleware/auth";
const router=express.Router();
router.post("/album", authUser, multer.uploadTwoImages, s3Middleware.attachS3Info, albums.createAlbum);
// router.post("/album/:id", multer.uploadTwoImages, s3Middleware.attachS3Info, albums.addToAlbum);
export default router;