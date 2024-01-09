import express from "express";
import * as likes from "../controllers/likes-controller";
import { authUser } from "../middleware/auth";

const router = express.Router();
/*
 * The like and unlike methods share the same function--it is designed as a toggle. Not sure what http method to use so I'm allowing post and delete for now even though they do the same thing
 */

//like
router.post("/post/:id([0-9]+)", authUser, likes.likePostToggle);
router.post("/comment/:id([0-9]+)", authUser, likes.likeCommentToggle);

//unlike
router.delete("/post/:id([0-9]+)", authUser, likes.likePostToggle);
router.delete("/comment/:id([0-9]+)", authUser, likes.likeCommentToggle);

router.get("/post/:id([0-9]+)", authUser, likes.userLikedPost);
router.get("/comment/:id([0-9]+)", authUser, likes.userLikedComment);

export default router;
