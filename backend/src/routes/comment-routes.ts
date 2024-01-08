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
router.get(
  "/single/:id([0-9]+)",
  authUser,
  attachS3Info,
  comments.getSingleComment
);
router.post("/post/:id([0-9]+)", authUser, comments.commentOnPost);
router.post("/comment/:id([0-9]+)", authUser, comments.commentOnComment);

router.patch("/:id([0-9]+)", authUser, comments.updateComment);

router.delete("/post/:id([0-9]+)", authUser, comments.deleteCommentOnPost);
router.delete(
  "/comment/:id([0-9]+)",
  authUser,
  comments.deleteCommentOnComment
);

export default router;
