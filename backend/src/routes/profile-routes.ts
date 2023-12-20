import express from "express";
import * as profiles from "../controllers/profiles-controller";
import { attachS3Info } from "../middleware/S3Middleware";
//import { decodeUser } from "../middleware/auth";

const router = express.Router();

router.get("/view/:id", profiles.viewProfile);
router.get("/search", attachS3Info, profiles.findPeople);

export default router;
