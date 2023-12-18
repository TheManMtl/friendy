import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/auth";
import models from "../db/models";
import { Op, Sequelize } from "sequelize";

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
  friendId?: number;
  name?: string;
  userId?: number;
  friendsSince?: Date;
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
                  as: "Image",
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
    console.log(requests);
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
    const requestedId = 6;
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
    const primaryUser = req.params.id;
    console.log(primaryUser);
    //  const primaryUser = 101;

    const friends = await Friend.findAll({
      where: {
        [Op.or]: [
          { requestedById: primaryUser },
          { requestedToId: primaryUser },
        ],
        acceptedAt: { [Op.not]: null },
      },
    });

    const processedFriends: friendProfile[] = await Promise.all(
      friends.map(async (friend: typeof Friend) => {
        let userId;
        if (friend.requestedById == primaryUser) {
          userId = friend.requestedToId;
        } else {
          userId = friend.requestedById;
        }

        const theFriends = await User.findByPk(userId, {
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
                  attributes: ["id", "fileName"],
                },
              ],
            },
          ],
        });
        return {
          friendId: friend.id,
          name: theFriends.name,
          userId: userId,
          friendsSince: friend.acceptedAt,
          thumbnail: theFriends.profileImg?.image?.thumbnail || null,
          profilePostId: theFriends.profileImg?.id || null,
        };
      })
    );
    // console.log(processedFriends);
    return res.status(200).send(processedFriends);
  } catch (error) {
    next(error);
  }
};

export const viewSuggestedFriendsBySchool = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {

    const currentUserId = parseInt(req.params.id, 10);
    if (isNaN(currentUserId)) {
      return res.status(400).send({ message: 'Invalid user ID in request parameters.' });
    }

    const currentUser = await User.findByPk(currentUserId, {
      attributes: ['school'],
    });

    if (!currentUser) {
      return res.status(400).send({ message: 'Current user not found.' });
    }

    if (!currentUser.school) {
      return res.status(400).send({ message: 'User school information not available.' });
    }

    const school = currentUser.school;

    const primaryUserFriends = await Friend.findAll({
      where: {
        [Op.or]: [
          { requestedById: currentUserId },
          { requestedToId: currentUserId },
        ],
        acceptedAt: { [Op.not]: null },
      },
    });

    const primaryUserFriendIdsSet = new Set<number>();
    primaryUserFriends.forEach((friend: typeof Friend) => {
      if (friend.requestedById == currentUserId) {
        primaryUserFriendIdsSet.add(friend.requestedToId);
      } else {
        primaryUserFriendIdsSet.add(friend.requestedById);
      }
    });

    const primaryUserFriendIds = Array.from(primaryUserFriendIdsSet);

    const suggestedFriends = await User.findAll({
      where: {
        id: {
          [Op.not]: [...primaryUserFriendIds, currentUserId],
        },
        school: school,
      },
      include: [
        {
          model: Post,
          as: 'profileImg',
          attributes: ['id'],
          include: [
            {
              model: Image,
              as: 'Image',
              attributes: ['id', 'thumbnail'],
            },
          ],
        },
      ],
    });

    const processedSuggestedFriends = suggestedFriends.map((friend: typeof User) => ({
      userId: friend.id,
      name: friend.name,
      school: friend.school || null,
      thumbnail: friend.profileImg?.image?.thumbnail || null,
      profileImgId: friend.profileImg?.id || null,
    }));

    return res.status(200).send(processedSuggestedFriends);
  } catch (error) {
    console.error(error);
    next(error);
  }
};




