import models from '../db/models';
import * as PostController from "./posts-controller";
import * as ImageController from "./images-controller";
const Album = models.Album;

const Image = models.Image;
const User = models.User;
const Post = models.Post;

import express from "express";
export const createAlbum = async (req: any, res: any) => {
    const { userId, title, posts, images } = req.body;
    try {
        const album = await Album.create({
            title : title,
            profileId : userId,
        });

        if (posts) {
            // await AlbumPost.bulkCreate(posts.map((post: any) => ({
            //     albumId: Album.id,
            //     postId: Post.id,
            // })));
        } else if (images) {
            // TODO: need to refine this
            await ImageController.add(req, res);
            await PostController.createPost(req, res);
            // await AlbumPost.bulkCreate(posts.map((post: any) => ({
            //     albumId: Album.id,
            //     postId: Post.id,
            // })));
        }
        res.status(201).json(album);
    }
}
// export const createAlbumPost = async (req: any, res: any) => {
   
//     try {
//         const albumId = req.body.albumId; 
//         const posts = req.body.posts; 

//         // Create an array of objects for bulkCreate
//         const albumPostRecords = posts.map((post : any) => ({
//             albumId: albumId,
//             postId: post.id,
//         }));

//         // Use bulkCreate to insert records into the AlbumPost table
//         const createdAssociations = await AlbumPost.bulkCreate(albumPostRecords);

//         res.status(201).json(createdAssociations);
//     } catch (error) {
//         console.error('Error creating AlbumPost associations:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// export const updateAlbum = async (req: any, res: any) => {
//     const { title, posts } = req.body;
//     try {
//         const album = await Album.findOne({
//             where: {
//                 id: req.params.id,
//             },
//         });
//         if (!album) {
//             return res.status(404).json({ error: "Album not found" });
//         }
//         await album.update({
//             title: title,
//         });
        
//         res.status(200).json(album);
//     } catch (err) {
//         console.log("Error", err);
//     }

// }