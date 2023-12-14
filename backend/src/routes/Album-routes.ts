import express from "express";
import * as s3Middleware from "../middleware/S3Middleware";
import * as multer from "../middleware/MulterMiddleware";
import * as albums from "../controllers/album-controller";

const router=express.Router();
router.post("/album", multer.uploadTwoImages, s3Middleware.attachS3Info, albums.createAlbum);
export default router;