import express from "express";
import * as posts from "../controllers/posts-controller";

const router = express.Router();

router.get('/:id([0-9]+)', posts.getPost);
router.get('/user/:id([0-9]+)', posts.getTimeline);
router.post('/', posts.createPost);
router.put('/:id([0-9]+)', posts.updatePost);
router.delete('/:id([0-9]+)', posts.deletePost);


export default router;
