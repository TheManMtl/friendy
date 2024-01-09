import express from "express";
import * as profiles from "../controllers/profiles-controller";
import { attachS3Info } from "../middleware/S3Middleware";
import { authUser } from "../middleware/auth";

const router = express.Router();

router.get("/view/:id", attachS3Info, profiles.viewProfile);
router.get("/search", authUser, attachS3Info, profiles.findPeople);
router.get(
  "/thumbnail/:id([0-9]+)",
  authUser,
  attachS3Info,
  profiles.getProfilePicThumbnail
);
router.put("/update", authUser, profiles.updateProfile);

export default router;
