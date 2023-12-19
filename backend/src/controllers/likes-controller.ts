import { Response } from "express";
import { CustomRequest } from "../middleware/auth";
import models from "../db/models";

const sequelize = models.sequelize;
const User = models.User;
const Comment = models.Comment;
const Post = models.Post;
const Like = models.Like;

export const likePostToggle = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    //get post and user
    const user = await User.findByPk(req.id);
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    //if like exists, unlike, else new like
    const likeExists = await Like.findOne({
      where: {
        userId: user.id,
        postId: post.id
      },
    });

    //transaction to add/delete like and update post accordingly
    const t = await sequelize.transaction();

    if (likeExists) {

      try {
        await Like.destroy({
          userId: user.id,
          postId: post.id
        }, { transaction: t });

        await Post.decrement(
          'likeCount',
          {
            where: {
              id: post.id
            }
          }, { transaction: t });

        await t.commit();

      } catch (error) {

        await t.rollback();
        return res.status(500).send({ message: "Something went wrong" });
      }

      return res.status(200).send({ message: "post successfully unliked" });
    }

    try {

      await Like.create({
        userId: user.id,
        postId: post.id
      }, { transaction: t });

      await Post.increment(
        'likeCount',
        {
          where: {
            id: post.id
          }
        }, { transaction: t });

      await t.commit();

    } catch (error) {
      await t.rollback();
      return res.status(500).send({ message: "Something went wrong" });
    }

    return res.status(201).send({ message: "post successfully liked" });

  } catch (error) {

    return res.status(500).send({ message: "Something went wrong" });
  }
};


export const likeCommentToggle = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {

    const user = await User.findByPk(req.id);
    const comment = await Comment.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (!comment) {
      return res.status(404).send({ message: "comment not found" });
    }

    const likeExists = await Like.findOne({
      where: {
        userId: user.id,
        commentId: comment.id
      },
    });

    //transaction to add/delete like and update comment accordingly
    const t = await sequelize.transaction();

    if (likeExists) {

      try {
        await Like.destroy({
          userId: user.id,
          commentId: comment.id
        }, { transaction: t });

        await Comment.decrement(
          'likeCount',
          {
            where: {
              id: comment.id
            }
          }, { transaction: t });

        await t.commit();

      } catch (error) {

        await t.rollback();
        return res.status(500).send({ message: "Something went wrong" });
      }

      return res.status(200).send({ message: "comment successfully unliked" });
    }

    try {

      await Like.create({
        userId: user.id,
        commentId: comment.id
      }, { transaction: t });

      await Comment.increment(
        'likeCount',
        {
          where: {
            id: comment.id
          }
        }, { transaction: t });

      await t.commit();

    } catch (error) {
      await t.rollback();
      return res.status(500).send({ message: "Something went wrong" });
    }

    return res.status(201).send({ message: "comment successfully liked" });

  } catch (error) {

    return res.status(500).send({ message: "Something went wrong" });
  }
};


