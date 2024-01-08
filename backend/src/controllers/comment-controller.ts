import { Response } from "express";
import { CustomRequest } from "../middleware/auth";
import models from "../db/models";
import { getPicUrlFromS3 } from "./images-controller";

const sequelize = models.sequelize;
const User = models.User;
const Comment = models.Comment;
const Post = models.Post;
const Image = models.Image;

interface CommentResponse {
  name: string;
  profileImg?: string | null;
  body: string;
  childCount: number;
  createdAt: Date;
  deleteAt?: Date | null;
  id: number;
  isDeleted: boolean;
  likeCount: number;
  parentId?: number | null;
  postId: number;
  updatedAt?: Date | null;
  userId: number;
}

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
    console.log("comment body: " + req.body.body);
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
            id: parent.postId,
          },
        },
        { transaction: t }
      );

      await t.commit();

      await Comment.create(
        {
          userId: user.id,
          postId: parent.postId,
          parent: parent.id,
          body: req.body.body,
        },
        { transaction: t }
      );
    } catch (error) {
      await t.rollback();
      console.log("ERROR" + error);
      return res.status(500).send({ message: "Something went wrong" });
    }

    return res.status(201).send({ message: "Comment successfully posted" });
  } catch (error) {
    console.log("\n\n\n\n" + error);
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
        let thumbnail: string | null = "";

        if (child.User.profileImg === null) {
          console.log("profile is null");
          thumbnail = "default.jpg";
        } else {
          thumbnail = child.User.profileImg.Image.thumbnail;
        }

        thumbnail = await getPicUrlFromS3(req, thumbnail!);
        console.log(child.User.name + " NAME");
        console.log(child.User.profileImg + " IMG");
        const comment: CommentResponse = {
          name: child.User.name,
          profileImg: thumbnail,
          body: child.body,
          childCount: child.childCount,
          createdAt: child.createdAt,
          deleteAt: child.deleteAt || null,
          id: child.id,
          isDeleted: child.isDeleted,
          likeCount: child.likeCount,
          parentId: child.parentId || null,
          postId: child.postId,
          updatedAt: child.updatedAt || null,
          userId: child.userId,
        };

        return comment;
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
        let thumbnail: string | null = "";

        if (comment.User.profileImg === null) {
          console.log("profile is null");
          thumbnail = "default.jpg";
        } else {
          thumbnail = comment.User.profileImg.Image.thumbnail;
        }

        thumbnail = await getPicUrlFromS3(req, thumbnail!);
        const returnComment: CommentResponse = {
          name: comment.User.name,
          profileImg: thumbnail,
          body: comment.body,
          childCount: comment.childCount,
          createdAt: comment.createdAt,
          deleteAt: comment.deleteAt || null,
          id: comment.id,
          isDeleted: comment.isDeleted,
          likeCount: comment.likeCount,
          parentId: comment.parentId || null,
          postId: comment.postId,
          updatedAt: comment.updatedAt || null,
          userId: comment.userId,
        };

        return returnComment;
      })
    );
    return res.status(200).send(updatedComments);
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

export const deleteCommentOnPost = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    //get post and user
    const user = await User.findByPk(req.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const comment = await Comment.findByPk(req.params.id, {
      where: {
        isDeleted: false,
        authorId: user.id,
      },
    });

    if (!(comment && comment.postId)) {
      return res.status(404).send({ message: "Comment not found" });
    }

    const post = await Post.findByPk(comment.postId);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    //transaction to delete comment and update post accordingly
    const t = await sequelize.transaction();

    try {
      await Post.decrement(
        "commentCount",
        {
          where: {
            id: comment.postId,
          },
        },
        { transaction: t }
      );

      await Comment.update(
        {
          isDeleted: true,
        },
        {
          where: {
            id: comment.id,
          },
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
    return res.status(200).send({ message: "Comment successfully deleted" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong: " + error });
  }
};

export const deleteCommentOnComment = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    //get post and user
    const user = await User.findByPk(req.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const comment = await Comment.findByPk(req.params.id, {
      where: {
        isDeleted: false,
        authorId: user.id,
      },
    });

    if (!(comment && comment.parentId && comment.postId)) {
      return res.status(404).send({ message: "Comment not found" });
    }

    const parent = await Comment.findByPk(comment.parentId);

    if (!parent) {
      return res.status(404).send({ message: "Parent comment not found" });
    }

    const post = await Post.findByPk(comment.postId);

    if (!post) {
      return res.status(404).send({ message: "Original post not found" });
    }

    //transaction to delete comment and update parent and post accordingly
    const t = await sequelize.transaction();

    try {
      await Comment.decrement(
        "childCount",
        {
          where: {
            id: parent.id,
          },
        },
        { transaction: t }
      );

      await Post.decrement(
        "commentCount",
        {
          where: {
            id: comment.postId,
          },
        },
        { transaction: t }
      );

      await t.commit();

      await Comment.update(
        {
          isDeleted: true,
        },
        {
          where: {
            id: comment.id,
          },
        },
        { transaction: t }
      );
    } catch (error) {
      await t.rollback();
      return res.status(500).send({ message: "Something went wrong" });
    }

    return res.status(200).send({ message: "Comment successfully deleted" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

export const updateComment = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    //get post and user
    const user = await User.findByPk(req.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const comment = await Comment.findByPk(req.params.id, {
      where: {
        isDeleted: false,
        authorId: user.id,
      },
    });

    if (!comment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    if (!req.body.body) {
      return res.status(404).send({ message: "Comment body cannot be null." });
    }

    if ((req.body.body as string).length > 1500) {
      return res
        .status(404)
        .send({ message: "Comment body cannot exceed 1500 characters." });
    }

    await Comment.update(
      {
        body: req.body.body,
      },
      {
        where: {
          id: comment.id,
        },
      }
    );

    return res.status(201).send({ message: "Comment successfully updated" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong: " + error });
  }
};
