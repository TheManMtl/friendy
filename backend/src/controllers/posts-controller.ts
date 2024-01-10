import { Request, Response } from "express";
import models from "../db/models";
import { PostAttributes } from "../db/models/post";
import * as imageController from "./images-controller";
import { Op } from "sequelize";
import { CustomRequest } from "../middleware/auth";
// import Album from "../database/modelsOrig/Album";


const Post = models.Post;
const User = models.User;
const Image = models.Image;
const Comment = models.Comment;
const Like = models.Like;
const Friend = models.Friend;
const Album = models.Album;

interface PostWithUrl extends PostAttributes {
  imageUrl: string | null;
  thumbnailUrl: string | null;
}

// create new post (only one image allowed)
export const createPost = async (req: any, res: Response) => {
  console.log("========this is in the createPost=========");
  const imageFile = req.file;
  let image = null;

  try {

    const user = await User.findByPk(req.id);

    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    if (req.body.profileId) {

      const user = await User.findByPk(req.body.profileId);

      if (!user) {
        return res.status(404).send({ message: "User not found"});
      }
    }

    if (!imageFile && (!req.body.content || (req.body?.content as string).length < 1)) {
      return res.status(400).json({ message: "Post content cannot be empty" });
    }

    if (imageFile) {
      console.log("========there is imageFile=========");
      image = await imageController.addOne(req);
    }
    //FIXME: validate type
    const post = await Post.create({
      authorId: user.id, 
      profileId: req.body.profileId ?? null,
      type: req.body.type,
      content: req.body.content,
      imageId: image ? image.id : null,
    });
    return res.status(201).json({ success: true, post });
  } catch (error) {
    console.error("Error creating post:", error);
    // Handle errors and send an appropriate response
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// create multiple posts
export const createMultiplePosts = async (req: any, res: Response) => {
  const imageFiles = req.files;
  const posts: any[] = [];
  try {
    for (const imageFile of imageFiles) {
      const image = await imageController.addOneImage(req, imageFile);

      const post = await Post.create({
        authorId: req.body.authorId,
        type: req.body.type,
        albumId: req.body.albumId,
        imageId: image ? image.id : null,
      });

      posts.push(post);
    }
    return res.status(201).json(posts);
  } catch (error) {
    console.error("Error creating post:", error);
    // Handle errors and send an appropriate response
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// retrieve single post
export const getPost = async (req: any, res: Response) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        isDeleted: false,
      },
      include: {
        model: Image,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let url = null;
    let thumbnailUrl = null;

    if (post.Image) {
      url = await imageController.getPicUrlFromS3(req, post.Image.fileName);
      thumbnailUrl = await imageController.getPicUrlFromS3(
        req,
        post.Image.thumbnail
      );
    }

    const resData: PostWithUrl = {
      ...post.toJSON(),
      imageUrl: url,
      thumbnailUrl: thumbnailUrl,
    };

    res.json(resData);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// retrieve posts by author on own timeline
// note: using req.params--for retrieving any profile, not only current user
export const getTimeline = async (req: any, res: Response) => {
  try {
    const posts = await Post.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              {
                authorId: req.params.id,
              },
              {
                [Op.or]: [
                  {
                    profileId: req.params.id
                  },
                  {
                    profileId: null
                  },
                ]
              },
            ],
          },
          {
            profileId: req.params.id,
          },
        ],
        type: {
          [Op.not]: "albumImg"
        },
        isDeleted: false,
      },
      include: [
        {
          model: Image,
          attributes: ["id", "fileName", "thumbnail"],
        },
        {
          model: User,
          as: "author",
          attributes: ["id", "name"],
          include: [
            {
              model: Post,
              as: "profileImg",
              attributes: ["id"],
              include: [
                {
                  model: Image,
                  as: "Image",
                  attributes: ["id", "thumbnail"],
                },
              ],
            },
          ],
        },
        {
          model: Comment,
          as: "Comments",
          include: [
            {
              model: User,
              attributes: ["id", "name"],
              include: [
                {
                  model: Post,
                  as: "profileImg",
                  attributes: ["id"],
                  include: [
                    {
                      model: Image,
                      as: "Image",
                      attributes: ["id", "thumbnail"],
                    },
                  ],
                },
              ],
            },
            {
              model: Like,
              as: "Likes",
            },
          ],
        },
        {
          model: Like,
          as: "Likes",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!posts) {
      return res.status(404).json("No posts found");
    }

    const resData: PostWithUrl[] = [];

    // get signed urls for images
    for (let i = 0; i < posts.length; i++) {
      let url = null;
      let thumbnailUrl = null;

      if (posts[i].Image) {
        url = await imageController.getPicUrlFromS3(
          req,
          posts[i].Image.fileName
        );
        thumbnailUrl = await imageController.getPicUrlFromS3(
          req,
          posts[i].Image.thumbnail
        );
      }

      const resPost: PostWithUrl = {
        ...posts[i].toJSON(),
        imageUrl: url,
        thumbnailUrl: thumbnailUrl,
      };

      resData.push(resPost);
    }

    res.json(resData);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

//get image post
export const getPostImageUrl = async (req: Request, res: Response) => {
  try {
    //find all the posts with the authorId as user, and the type is profilePic
    const post = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Image,
          attributes: ["id", "fileName", "thumbnail"],
        },
      ],
    });
    //check if the posts exist
    if (post.length === 0) {
      return res.status(404).json("No posts found");
    }

    let url = null;
    let thumbnailUrl = null;

    if (post.Image) {
      url = await imageController.getPicUrlFromS3(req, post.Image.fileName);
      thumbnailUrl = await imageController.getPicUrlFromS3(
        req,
        post.Image.thumbnail
      );
    }

    const resPost: PostWithUrl = {
      ...post.toJSON(),
      imageUrl: url,
      thumbnailUrl: thumbnailUrl,
    };

    return res.status(200).json(resPost);
  } catch (error) {
    console.error("Error fetching post images:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// edit post content
export const editPostContent = async (req: CustomRequest, res: Response) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        authorId: req.id,
        isDeleted: false,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // validate (only posts with images can have empty content)
    if (
      post.imageId === null &&
      (!req.body.content || (req.body?.content as string).length < 1)
    ) {
      return res.status(400).json({ message: "Post content cannot be empty" });
    }

    if (req.body?.content && (req.body?.content as string).length > 1500) {
      return res.status(400).json({ message: "Post content cannot exceed " });
    }

    // update by id
    await Post.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Successfully updated post" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deletePost = async (req: CustomRequest, res: Response) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        authorId: req.id,
        isDeleted: false,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // else update by id
    await Post.update(
      {
        isDeleted: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

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

export const getNewsfeed = async (req: any, res: Response) => {
  try {
    if (!req.id) {
      return res.status(400).send({ message: "User not logged in." });
    }

    const user = await User.findByPk(req.id, {
      where: {
        isDeleted: false,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const id = user.id;
    const friends = await Friend.findAll({
      where: {
        [Op.or]: [{ requestedById: id }, { requestedToId: id }],
        acceptedAt: {
          [Op.not]: null,
        },
      },
    });

    // list of friends ids
    const authorIds = await Promise.all(friends.map(async (friend: typeof Friend) => {
      //check friend is active
      let friendId;
      if (friend.requestedById == id) {
        await User.findByPk(friend.requestedToId, {
          where: {
            isDeleted: false,
          },
        });
        console.log("===============================");
        console.log("friend: " + friend.requestedToId);
        console.log("===============================");
        friendId = friend.requestedToId;
      }
      if (friend.requestedToId == id) {
        await User.findByPk(friend.requestedById, {
          where: {
            isDeleted: false,
          },
        });
        console.log("===============================");
        console.log("friend: " + friend.requestedById);
        console.log("===============================");
        friendId = friend.requestedById;
      }
      return friendId;
    }));

    //add id to include user's own posts
    authorIds.push(id);

    // post list by authors
    const posts = await Post.findAll({
      where: {
        authorId: authorIds,

        //exclude album single images
        type: {
          [Op.not]: ["albumImg"],
        },
        //include posts by users on their own timelines, by other users on your timeline, by friends or user on friends' timelines
        //exclude posts by friends on non-friend timelines
        profileId: {
          [Op.or]: [null, authorIds],
        },
        isDeleted: false,
      },
      include: [
        {
          model: Image,
          attributes: ["id", "fileName", "thumbnail"],
        },
        {
          model: User,
          as: "author",
          attributes: ["id", "name"],
          include: [
            {
              model: Post,
              as: "profileImg",
              attributes: ["id"],
              include: [
                {
                  model: Image,
                  as: "Image",
                  attributes: ["id", "thumbnail"],
                },
              ],
            },
          ],
        },
        {
          model: Comment,
          as: "Comments",
          include: [
            {
              model: Comment,
              as: "parentComment",
            },
            {
              model: User,
              attributes: ["id", "name"],
              include: [
                {
                  model: Post,
                  as: "profileImg",
                  attributes: ["id"],
                  include: [
                    {
                      model: Image,
                      as: "Image",
                      attributes: ["id", "thumbnail"],
                    },
                  ],
                },
              ],
            },
            {
              model: Like,
              as: "Likes",
            },
          ],
        },
        {
          model: Like,
          as: "Likes",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // append img urls
    const resData: PostWithUrl[] = [];

    for (let i = 0; i < posts.length; i++) {
      let url = null;
      let thumbnailUrl = null;

      if (posts[i].Image) {
        url = await imageController.getPicUrlFromS3(
          req,
          posts[i].Image.fileName
        );
        thumbnailUrl = await imageController.getPicUrlFromS3(
          req,
          posts[i].Image.thumbnail
        );
      }

      const resPost: PostWithUrl = {
        ...posts[i].toJSON(),
        imageUrl: url,
        thumbnailUrl: thumbnailUrl,
      };

      resData.push(resPost);
    }

    res.status(200).send(resData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//update albumId of post (used for adding post to album)
export const moveToAlbum = async (req: any, res: Response) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
        authorId: req.id,
        isDeleted: false,
            },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // update by id
    await post.update({
      albumId: req.body.albumId,
    });
    res.status(200).json({ message: "post is added to album" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
// export const moveToAlbum = async (req: any, res:Response) => {
//   try {
//     const post = await Post.findOne({
//       where: {
//         id: req.params.postId,
//         authorId: req.id,
//         isDeleted: false,
//       },
//     });

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     // Prepare the update object
//     const updateData: { albumId: any; type?: string } = {
//       albumId: req.body.albumId,
//     };

//     // Check if type is provided in the request body and add it to the update object
//     if (req.body.type) {
//       updateData.type = req.body.type;
//     }

//     // Update the post with new data
//     await post.update(updateData);
//     res.status(200).json({ message: "Post updated successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

export const getPostsByAlbumId = async (req: any, res: Response) => {
  try {
    const posts = await Post.findAll({
      where: {
        albumId: req.params.albumId,
        isDeleted: false,
      },
      include: [
        {
          model: Image,
          attributes: ["id", "fileName", "thumbnail"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!posts) {
      return res.status(404).json("No posts found");
    }

    const resData: PostWithUrl[] = [];

    // get signed urls for images
    for (let i = 0; i < posts.length; i++) {
      let url = null;
      let thumbnailUrl = null;

      if (posts[i].Image) {
        url = await imageController.getPicUrlFromS3(
          req,
          posts[i].Image.fileName
        );
        thumbnailUrl = await imageController.getPicUrlFromS3(
          req,
          posts[i].Image.thumbnail
        );
      }

      const resPost: PostWithUrl = {
        ...posts[i].toJSON(),
        imageUrl: url,
        thumbnailUrl: thumbnailUrl,
      };

      resData.push(resPost);
    }

    res.json(resData);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
//get all posts which contain images
export const getPhotosByUserId = async (req: any, res: Response) => {
  try {
    const posts = await Post.findAll({
      where: {
        authorId: req.params.userId,
        imageId: { [Op.ne]: null },
      },
      include: [
        {
          model: Image,
          attributes: ["id", "fileName", "thumbnail"],
        },
      ],
    });
    //check if the posts exist
    if (posts.length === 0) {
      return res.status(404).json("No posts found");
    }
    const resData: PostWithUrl[] = [];
    for (let i = 0; i < posts.length; i++) {
      let url = null;
      let thumbnailUrl = null;

      if (posts[i].Image) {
        url = await imageController.getPicUrlFromS3(
          req,
          posts[i].Image.fileName
        );
        thumbnailUrl = await imageController.getPicUrlFromS3(
          req,
          posts[i].Image.thumbnail
        );
      }

      const resPost: PostWithUrl = {
        ...posts[i].toJSON(),
        imageUrl: url,
        thumbnailUrl: thumbnailUrl,
      };
      resData.push(resPost);
    }
    res.json(resData);
  } catch (error) {
    console.error("Error fetching post images:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
//get the most recent post image from an album
export const getPostFromAlbum = async (req: any, res: Response) => {
  try{
    const posts = await Post.findAll({
      where: {
        
        albumId: req.params.albumId,
        isDeleted: false,
      },
      include: [
        {
          model: Image,
          attributes: ["id", "fileName", "thumbnail"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 1,
    });
    let url = null;
    let thumbnailUrl = null;
    //check if the posts exist
    if (posts.length === 0) {
      thumbnailUrl=(await imageController.getPicUrlFromS3(req, "default.jpg"))
      return res.status(200).json([{ thumbnailUrl }]);
    }
    const post = posts[0];

    const resData: PostWithUrl[] = [];
  
     

      if (post.Image) {
        url = await imageController.getPicUrlFromS3(req, post.Image.fileName);
        thumbnailUrl = await imageController.getPicUrlFromS3(
          req,
          post.Image.thumbnail

        );
      }

      const resPost: PostWithUrl = {
        ...post.toJSON(),
        imageUrl: url,
        thumbnailUrl: thumbnailUrl,
      };
      resData.push(resPost);
    
      res.json(resData);
  } catch (error) {
    console.error("Error fetching post images:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changePostType = async (req: any, res: Response) => {
  try {
    const profileAlbum = await Album.findOne({
      where: {
        profileId: req.body.userId,
        type: "profilePic",
      },
    });

    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });

    if (profileAlbum && post) {
      post.update({
        type: req.body.type,
        albumId: profileAlbum.id,
      });

      const user = await User.findOne({
        where: {
          id: req.body.userId,
        },
      });
  
      switch (req.body.type) {
        case "profilePic":
          user.update({
            profilePostId: post?.id,
          });
          break;
        case "coverPic":
          user.update({
            coverPostId: post?.id,
          });
          break;
        default:
          break;
      }
    }

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
