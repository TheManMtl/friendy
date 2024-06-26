import models from "../db/models";
import * as PostController from "./posts-controller";
import * as ImageController from "./images-controller";
const Album = models.Album;

const Image = models.Image;
const User = models.User;
const Post = models.Post;

import express from "express";
import exp from "constants";

export const createAlbum = async (req: any, res: any) => {
  const { profileId, title } = req.body;
  try {
    const album = await Album.create({
      profileId: profileId,
      title: title,
      type: "custom",
    });
    res.status(200).json(album);
  } catch (err) {
    console.log("Error", err);
  }
};

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
};

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
};

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
};

export const deleteAlbum = async (req: any, res: any) => {
  try {
    // find the album
    const album = await Album.findOne({
      where: {
        id: req.params.albumId,
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
        albumId: req.params.albumId,
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
};
export const updateAlbum = async (req: any, res: any) => {
  try {
    const album = await Album.findOne({
      where: {
        id: req.params.albumId,
      },
    });

    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }

    album.title = req.body.title;
    await album.save();

    res.status(200).json(album);
  } catch (err) {
    console.log("Error", err);
  }
};
export const getAlbumById = async (req: any, res: any) => {
  try {
    const album = await Album.findOne({
      where: {
        id: req.params.albumId,
      },
    });

    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }

    res.status(200).json(album);
  } catch (err) {
    console.log("Error", err);
  }
};

export const getCoverAlbumByUserId = async (req: any, res: any) => {
  try {
    const album = await Album.findOne({
      where: {
        profileId: req.params.userId,
        type: "coverPhoto",
        isDeleted: 0,
      },
    });
    if (album == null) {
      try {
        const newAlbum = await Album.create({
          profileId: req.params.userId,
          title: "Cover Photo",
          type: "coverPhoto",
        });
        res.status(200).json(newAlbum);
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      res.status(200).json(album);
    }
  } catch (err) {
    console.log("Error", err);
  }
};

export const getProfileAlbumByUserId = async (req: any, res: any) => {
  try {
    const album = await Album.findOne({
      where: {
        profileId: req.params.userId,
        type: "profilePic",
        isDeleted: 0,
      },
    });
    if (album == null) {
      try {
        const newAlbum = await Album.create({
          profileId: req.params.userId,
          title: "Profile image",
          type: "profilePic",
        });
        res.status(200).json(newAlbum);
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      res.status(200).json(album);
    }
  } catch (err) {
    console.log("Error", err);
  }
};
