import express from "express";
import * as comments from "../controllers/comment-controller";
import { authUser } from "../middleware/auth";
import { attachS3Info } from "../middleware/S3Middleware";
const router = express.Router();

router.get(
  "/comment/:id([0-9]+)",
  authUser,
  attachS3Info,
  comments.getCommentChildren
);
router.get(
  "/post/:id([0-9]+)",
  authUser,
  attachS3Info,
  comments.getPostComments
);

router.post("/post/:id([0-9]+)", authUser, comments.commentOnPost);
router.post("/comment/:id([0-9]+)", authUser, comments.commentOnComment);

//coming soon
//router.delete("/:id([0-9]+)", authUser, comments.deleteComment);

export default router;
