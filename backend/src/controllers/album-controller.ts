import models from '../db/models';
import * as PostController from "./posts-controller";
import * as ImageController from "./images-controller";
const Album = models.Album;

const Image = models.Image;
const User = models.User;
const Post = models.Post;

import express from "express";
//TODO: create album
// export const createAlbum = async (req: any, res: any) => {
//     const { userId, title, posts, images } = req.body;
//     try {
        
//     } catch (err) {
//         console.log("Error", err);
//     }
// }

export const getAlbumsByUserId = async (req: any, res: any) => {
    try {
        const albums = await Album.findAll({
            where: {
                profileId: req.params.userId,
            },
        });
        res.status(200).json(albums);
    } catch (err) {
        console.log("Error", err);
    }
}

export const addPostToAlbum = async (req: any, res: any) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.body.postId,
            },
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        post.albumId = req.body.albumId;
        await post.save();
        
    } catch (err) {
        console.log("Error when adding post to album", err);
    }
}

export const removePostFromAlbum = async (req: any, res: any) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.body.postId,
            },
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        post.albumId = null;
        await post.save();
        
    } catch (err) {
        console.log("Error when removing post from album", err);
    }
}

export const deleteAlbum = async (req: any, res: any) => {
    try {
        // find the album
        const album = await Album.findOne({
            where: {
                id: req.body.albumId,
            },
        });

        if (!album) {
            return res.status(404).json({ error: "Album not found" });
        }
        
        // delete the album
        await album.destroy();

        // find all posts in the album
        const posts = await Post.findAll({
            where: {
                albumId: req.body.albumId,
            },
        });

        // remove the albumId from each post
        posts.forEach(async (post: any) => {
            post.albumId = null;
            await post.save();
        });

        res.status(200).json({ message: "Album deleted" });
    } catch (err) {
        console.log("Error", err);
    }
}