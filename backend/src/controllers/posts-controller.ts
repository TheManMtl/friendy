import express, { Express, Request, Response } from "express";
import models from '../db/models';
import { PostAttributes } from '../db/models/post';
import * as imageController from './images-controller';

const Post = models.Post;
const User = models.User;
const Image = models.Image;

interface PostWithUrl extends PostAttributes {
    imageUrl: string | null;
    thumbnailUrl: string | null;
}


// create new post (only one image allowed)
export const createPost = async (req: any, res: Response) => {
    const imageFile = req.file;
    let image = null;
    try {
        if (imageFile) {
            image = await imageController.addOne(req);
        }
        const post = await Post.create({
            authorId: req.id,
            profileId: req.body.profileId,
            type: req.body.type,
            content: req.body.text,
            imageId: image ? image.id : null,

        });
        return res.status(201).json({ success: true, post });
    } catch (error) {
        console.error('Error creating post:', error);
        // Handle errors and send an appropriate response
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

// retrieve single post
export const getPost = async (req: any, res: Response) => {
    try {
        let post = await Post.findOne(
            {
                where: {
                    id: req.params.id,
                    isDeleted: false
                },
                include: {
                    model: Image
                }
            });

        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        let url = null;
        let thumbnailUrl = null;

        if (post.Image) {
            url = await imageController.getPicUrlFromS3(req, post.Image.fileName);
            thumbnailUrl = await imageController.getPicUrlFromS3(req, post.Image.thumbnail);
        }

        const resData: PostWithUrl = {
            ...post.toJSON(),
            imageUrl: url,
            thumbnailUrl: thumbnailUrl
        }

        res.json(resData);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// retrieve posts by author on own timeline
// note: using req.params--for retrieving any profile, not only current user
export const getTimeline = async (req: any, res: Response) => {
    try {
        let posts = await Post.findAll({
            where: {
                authorId: req.params.id,
                profileId: null, //excludes posts on other user timelines
                type: 'timeline',
                isDeleted: false
            },
            include: {
                model: Image,
                attributes: ['id', 'fileName', 'thumbnail']
            }
        });

        if (!posts) {
            return res.status(404).json("No posts found");
        }

        let resData: PostWithUrl[] = [];

        // get signed urls for images
        for (let i = 0; i < posts.length; i++) {
            let url = null;
            let thumbnailUrl = null;

            if (posts[i].Image) {
                url = await imageController.getPicUrlFromS3(req, posts[i].Image.fileName);
                thumbnailUrl = await imageController.getPicUrlFromS3(req, posts[i].Image.thumbnail);
            }

            const resPost: PostWithUrl = {
                ...posts[i].toJSON(),
                imageUrl: url,
                thumbnailUrl: thumbnailUrl
            }

            resData.push(resPost);
        }

        res.json(resData);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// update
// NOT IMPLEMENTED
export const updatePost = async (req: Request, res: Response) => {

    res.status(500).json({ message: "Not yet implemented!" });
};

export const deletePost = async (req: any, res: Response) => {
    try {
        let post = await Post.findOne(
            {
                where: {
                    id: req.params.id,
                    //authorId: req.user.id,  //TODO: FIXME ADD AUTH MIDDLEWARE & REQ PROP
                    isDeleted: false
                }
            });

        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        // else update by id
        await Post.update(
            {
                isDeleted: true
            },
            {
                where: {
                    id: req.params.id
                }
            });

        if (post.imageId) {
            // delete image from database and s3 bucket
            const success = await imageController.remove(req, post.imageId);
            if (!success) {
                return res.status(500).json({ message: "Something went wrong" });
            }
        }

        res.status(200).json({ message: "Successfully deleted post" });

    } catch {
        res.status(500).json({ message: "Something went wrong" });
    }
};