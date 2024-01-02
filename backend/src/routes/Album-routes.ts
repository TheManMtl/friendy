import express from "express";
import * as s3Middleware from "../middleware/S3Middleware";
import * as multer from "../middleware/MulterMiddleware";
import * as albums from "../controllers/album-controller";
import { authUser } from "../middleware/auth";
const router=express.Router();
router.post("/", authUser, albums.createAlbum);
router.get('/user/:userId([0-9]+)', s3Middleware.attachS3Info, albums.getAlbumsByUserId);

router.get("/:albumId([0-9]+)", s3Middleware.attachS3Info, albums.getAlbumById);
router.post("/addPostToAlbum", authUser, albums.addPostToAlbum);
router.delete("/:albumId([0-9]+)", authUser, s3Middleware.attachS3Info, albums.deleteAlbum);
router.put("/:albumId([0-9]+)", authUser, albums.updateAlbum);
// router.post("/album/:id", multer.uploadTwoImages, s3Middleware.attachS3Info, albums.addToAlbum);
export default router;