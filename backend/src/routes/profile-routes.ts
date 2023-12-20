import express from "express";
import * as profiles from "../controllers/profiles-controller";
import { attachS3Info } from "../middleware/S3Middleware";
import { authUser } from "../middleware/auth";

const router = express.Router();

router.get("/view/:id", authUser, profiles.viewProfile);
router.get("/search", authUser, attachS3Info, profiles.findPeople);

export default router;
