import express from "express";
import * as s3Middleware from "../middleware/S3Middleware";
import * as multer from "../middleware/MulterMiddleware";
import * as images from "../controllers/images-controller";


const router = express.Router();

router.post("/", multer.uploadTwoImages, s3Middleware.attachS3Info, images.add);
router.get("/:id", images.getOne);
router.delete("/:id", images.remove);
export default router;