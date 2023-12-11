import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/auth";
import models from "../db/models";
import { Op } from "sequelize";

const User = models.User;
const Friend = models.Friend;
const Image = models.Image;
const Post = models.Post;

interface requestProfile {
  id?: number;
  name?: string;
  userId?: number;
  requestedAt?: Date;
  thumbnail?: string;
  profilePostId: number;
}

interface friendProfile {
  id?: number;
  name?: string;
  userId?: number;
  acceptedAt?: Date;
  thumbnail?: string;
  profilePostId: number;
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
    const direction = req.query.direction || "received";
    let whereCondition;
    let attributeCondition;

    if (direction == "sent") {
      whereCondition = {
        requestedById: userId,
        acceptedAt: null,
      };
      attributeCondition = ["id", "requestedToId", "requestedAt"];
    } else {
      whereCondition = {
        requestedToId: userId,
        acceptedAt: null,
      };
      attributeCondition = ["id", "requestedById", "requestedAt"];
    }

    const allRequests = await Friend.findAll({
      where: whereCondition,
      attributes: attributeCondition,
      include: [
        {
          model: User,
          as: direction === "received" ? "RequestedBy" : "RequestedTo",
          attributes: ["name", "id"],
          include: [
            {
              model: Post,
              as: "profileImg",
              attributes: ["id"],
              include: [
                {
                  model: Image,
                  as: "image",
                  attributes: ["id", "thumbnail"],
                },
              ],
            },
          ],
        },
      ],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requests: requestProfile[] = allRequests.map((item: any) => ({
      id: item.id,
      name:
        direction === "received"
          ? item.RequestedBy.name
          : item.RequestedTo.name,
      userId:
        direction === "received" ? item.RequestedBy.id : item.RequestedTo.id,
      requestedAt: item.requestedAt,
      thumbnail:
        (direction === "received" ? item.RequestedBy : item.RequestedTo)
          ?.profileImg?.image?.thumbnail || null,
      profilePostId:
        (direction === "received" ? item.RequestedBy : item.RequestedTo)
          ?.profileImg?.id || null,
    }));

    return res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

export const acceptRequest = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // const requesterId = req.id;
    const requestedId = 101;
    const requesterId = req.body.id;
    const request = await Friend.findOne({
      where: {
        requestedById: requesterId,
        requestedToId: requestedId,
      },
    });

    if (!request) {
      return res.status(400).send({ message: "request does not exist" });
    }

    request.acceptedAt = new Date();
    await request.save();

    return res.status(200).send({ request: request });
  } catch (error) {
    next(error);
  }
};

export const deleteFriend = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // const userA = req.id;
    const userA = 61;
    const userB = req.body.id;

    let friendship = await Friend.findOne({
      where: {
        requestedById: userB,
        requestedToId: userA,
      },
    });

    if (!friendship) {
      friendship = await Friend.findOne({
        where: {
          requestedById: userA,
          requestedToId: userB,
        },
      });
    }

    if (!friendship) {
      return res.status(400).send({ message: "friendship doesn't exist" });
    }

    await friendship.destroy();
    return res.status(200).send({ isDeleted: true });
  } catch (error) {
    next(error);
  }
};

export const viewAllFriends = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  try {
    const primaryUser = 101;

    const users = await User.findByPk(primaryUser, {
      plain: true,
      include: [
        {
          model: User,
          attributes: ["id", "name"],
          as: "friendsA",
          // where: { acceptedAt: { [Op.not]: null } },
        },
        {
          model: User,
          attributes: ["id", "name"],
          as: "friendsB",
          // where: { acceptedAt: { [Op.not]: null } },
        },
      ],
      nest: true,
    });
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};
