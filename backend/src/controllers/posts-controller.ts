import models from '../db/models';
const Post = models.Post;
const User = models.User;
import express, { Express, Request, Response } from "express";


// create new post
// NOT IMPLEMENTED
export const createPost = async (req: Request, res: Response) => {

    res.status(500).json({ message: "Not yet implemented!" });
};

// retrieve single post
export const getPost = async (req: Request, res: Response) => {
    try {

        var post = await Post.findOne(
            {
                where: {

                    id: req.params.id,
                    isDeleted: false
                }
            });

        if (!post) {

            return res.status(404).json({ message: "Post not found" })
        }

        res.json(post);

    } catch (err) {

        res.status(500).json({ message: "Something went wrong" });
    }
};

// retrieve posts by author on own timeline
// note: using req.params--for retrieving any profile, not only current user
export const getTimeline = async (req: Request, res: Response) => {

    try {

        var timeline = await Post.findAll({

            where: {

                authorId: req.params.id,
                profileId: null, //excludes posts on other user timelines
                type: 'timeline',
                isDeleted: false

            }
        });

        if (!timeline) {
            return res.status(404).json("No posts found");
        }

        res.json(timeline);

    } catch (err) {

        res.status(500).json({ message: "Something went wrong" });
    }
};

// update
// NOT IMPLEMENTED
export const updatePost = async (req: Request, res: Response) => {

    res.status(500).json({ message: "Not yet implemented!" });
};

export const deletePost = async (req: Request, res: Response) => {

    try {

        var post = await Post.findOne(
            {
                where: {

                    id: req.params.id,
                    //authorId: req.user.id,  //FIXME ADD AUTH MIDDLEWARE & REQ PROP
                    isDeleted: false
                }
            });

        if (!post) {

            return res.status(404).json({ message: "Post not found" })
        }

        // else update by id
        post = await Post.update(
            {
                isDeleted: true
            },
            {
                where: {
                    id: req.params.id
                }
            });

        res.status(200).json({ message: "Successfully deleted post" });

    } catch {

        res.status(500).json({ message: "Something went wrong" });
    }
};