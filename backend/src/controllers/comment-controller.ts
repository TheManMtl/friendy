import { Response } from "express";
import { CustomRequest } from "../middleware/auth";
import models from "../db/models";
import { getPicUrlFromS3 } from "./images-controller";

const sequelize = models.sequelize;
const User = models.User;
const Comment = models.Comment;
const Post = models.Post;
const Image = models.Image;

export const commentOnPost = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    //get post and user
    const user = await User.findByPk(req.id);
    const post = await Post.findByPk(req.params.id, {
      where: {
        isDeleted: false,
      },
    });

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!req.body.body) {
      return res.status(404).send({ message: "Comment body cannot be null." });
    }

    if ((req.body.body as string).length > 1500) {
      return res
        .status(404)
        .send({ message: "Comment body cannot exceed 1500 characters." });
    }

    //transaction to add comment and update post accordingly
    const t = await sequelize.transaction();

    try {
      await Post.increment(
        "commentCount",
        {
          where: {
            id: req.params.id,
            isDeleted: false,
          },
        },
        { transaction: t }
      );

      await Comment.create(
        {
          userId: req.id,
          postId: req.params.id,
          body: req.body.body,
        },
        { transaction: t }
      );

      await t.commit();
    } catch (error) {
      await t.rollback();
      return res
        .status(500)
        .send({ message: "Something went wrong in transaction: " + error });
    }

    return res.status(201).send({ message: "Comment successfully posted" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong: " + error });
  }
};

export const commentOnComment = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    //get post and user
    const user = await User.findByPk(req.id);
    const parent = await Comment.findByPk(req.params.id, {
      where: {
        isDeleted: false,
      },
    });

    if (!parent) {
      return res.status(404).send({ message: "Parent comment not found" });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!req.body.body) {
      return res.status(404).send({ message: "Comment body cannot be null." });
    }

    if (req.body.body.length > 1500) {
      return res
        .status(404)
        .send({ message: "Comment body cannot exceed 1500 characters." });
    }

    //transaction to add comment and update post accordingly
    const t = await sequelize.transaction();

    try {
      await Comment.increment(
        "childCount",
        {
          where: {
            id: parent.id,
          },
        },
        { transaction: t }
      );

      await Post.increment(
        //is this right? comment children included in original post comment count?
        "commentCount",
        {
          where: {
            id: parent.post.id,
          },
        },
        { transaction: t }
      );

      await t.commit();

      await Comment.create(
        {
          userId: user.id,
          postId: parent.post.id,
          parent: parent.id,
          body: req.body.body,
        },
        { transaction: t }
      );
    } catch (error) {
      await t.rollback();
      return res.status(500).send({ message: "Something went wrong" });
    }

    return res.status(201).send({ message: "Comment successfully posted" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

export const getCommentChildren = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    //get parent comment
    const parent = await Comment.findByPk(req.params.id, {
      where: {
        isDeleted: false,
      },
    });

    if (!parent) {
      return res.status(404).send({ message: "Parent comment not found" });
    }

    const children = await Comment.findAll({
      where: {
        parentId: parent.id,
        isDeleted: false,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
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
      ],
    });
    const updatedChildren = await Promise.all(
      children.map(async (child: any) => {
        let thumbnail = "";

        if (child.User.profileImg === null) {
          console.log("profile is null");
          thumbnail = "default.jpg";
        } else {
          thumbnail = child.User.profileImg.Image.thumbnail;
        }

        child.User.profileImg = await getPicUrlFromS3(req, thumbnail);
        console.log(child.User.name + " NAME");
        console.log(child.User.profileImg + " IMG");

        return child;
      })
    );
    return res.status(200).send(updatedChildren);
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

export const getPostComments = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    //get parent comment
    const post = await Post.findByPk(req.params.id, {
      where: {
        isDeleted: false,
      },
    });

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    const comments = await Comment.findAll({
      where: {
        postId: post.id,
        parentId: null,
        isDeleted: false,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
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
      ],
    });
    const updatedComments = await Promise.all(
      comments.map(async (comment: any) => {
        let thumbnail = "";

        if (comment.User.profileImg === null) {
          console.log("profile is null");
          thumbnail = "default.jpg";
        } else {
          thumbnail = comment.User.profileImg.Image.thumbnail;
        }

        comment.User.thumbnail = await getPicUrlFromS3(req, thumbnail);
        console.log(comment.User.name + " NAME");
        console.log(comment.User.profileImg + " IMG");

        return comment;
      })
    );
    return res.status(200).send(updatedComments);
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};
