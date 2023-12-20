import express from "express";
import * as comments from "../controllers/comment-controller";
import { authUser } from "../middleware/auth";
const router = express.Router();


router.post("/post/:id([0-9]+)", authUser, comments.commentOnPost);
router.post("/comment/:id([0-9]+)", authUser, comments.commentOnComment);

//coming soon
//router.delete("/:id([0-9]+)", authUser, comments.deleteComment);

export default router;
