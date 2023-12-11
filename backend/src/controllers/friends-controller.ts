import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/auth";
import models from "../db/models";

const User = models.User;
const Friend = models.Friend;
const Image = models.Image;
const Post = models.Post;

interface requestProfile {
  id?: number;
  name?: string;
  requestedAt?: Date;
  thumbnail?: string;
}

export const createRequest = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    console.log("friend request");
    // hard coded user 101 prior to token creation and use of auth middleware
    // const requesterId = req.id;
    const requesterId = 12;
    const requestedId = req.body.id;

    const userExists = await User.findOne({
      where: {
        id: requestedId,
        isDeleted: false,
      },
    });

    if (!userExists) {
      return res.status(400).send({ message: "user doesn't exist" });
    }
    const friendExists1 = await Friend.findOne({
      where: {
        requestedById: requesterId,
        requestedToId: requestedId,
      },
    });

    if (friendExists1) {
      return res
        .status(400)
        .send({ message: "there is an active request or friendship" });
    }

    const friendExists2 = await Friend.findOne({
      where: {
        requestedById: requestedId,
        requestedToId: requesterId,
      },
    });

    if (friendExists2) {
      return res
        .status(400)
        .send({ message: "there is an active request or friendship" });
    }

    const friendRequest = await Friend.create({
      requestedById: requesterId,
      requestedToId: requestedId,
      requestedAt: new Date(),
    });

    return res.status(201).send({
      message: "friend request created",
      friendRequest: friendRequest,
    });
  } catch (error) {
    next(error);
  }
};

export const findAllRequests = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    //const userId = req.id;
    const userId = 101;
    const allRequests = await Friend.findAll({
      where: {
        requestedId: userId,
      },
      include: [
        {
          model: User,
          as: "requestedBy",
          attributes: ["name"],
          include: [
            {
              model: Post,
              as: "profilePostId",
              include: [
                {
                  model: Image,
                  as: "imageId",
                  attributes: ["thumbnail"],
                },
              ],
            },
          ],
        },
      ],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requests: requestProfile[] = allRequests.map(
      (request: {
        id?: any;
        requestedAt?: any;
        requestedBy?: any;
        requestedTo?: any;
      }) => {
        const { requestedBy, requestedTo } = request;
        const { name: requestedByName } = requestedBy;
        const { profilePostId } = requestedBy;
        const { imageId } = profilePostId;
        const { thumbnail } = imageId;

        return {
          id: request.id,
          name: requestedByName,
          requestedAt: request.requestedAt,
          thumbnail,
        };
      }
    );
    return res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};
