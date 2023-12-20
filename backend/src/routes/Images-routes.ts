import express from "express";
import * as s3Middleware from "../middleware/S3Middleware";
import * as multer from "../middleware/MulterMiddleware";
import * as images from "../controllers/images-controller";
import { authUser } from "../middleware/auth";

const router = express.Router();

router.post("/", authUser, multer.uploadTwoImages, s3Middleware.attachS3Info, images.add);
router.get("/:id([0-9]+)", authUser, images.getOne);
router.get("/userphotos/:id([0-9]+)", authUser, images.getbyUser)
router.get("/:fileName", authUser, images.getUrlByFileName);

// router.delete("/:id", images.remove);
export default router;