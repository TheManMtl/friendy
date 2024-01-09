import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/auth";
import models from "../db/models";
import { Op, Sequelize } from "sequelize";
import { getPicUrlFromS3 } from "./images-controller";

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
  mutualFriends?: number;
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
    const requesterId = req.id;
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
    const userId = req.id;
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
    const requests: requestProfile[] = await Promise.all(
      allRequests.map(async (item: any) => {
        const mutuals: number = await findMutualFriends(userId!, item.id);
        let thumbnail: string =
          (direction === "received" ? item.RequestedBy : item.RequestedTo)
            ?.profileImg?.image?.thumbnail || null;
        const doesExist: any = (
          direction === "received" ? item.RequestedBy : item.RequestedTo
        ).profileImg;

        if (doesExist != null) {
          thumbnail = (await getPicUrlFromS3(req, thumbnail)) || "";
        } else {
          thumbnail = (await getPicUrlFromS3(req, "default.jpg")) || "";
        }
        return {
          id: item.id,
          name:
            direction === "received"
              ? item.RequestedBy.name
              : item.RequestedTo.name,
          userId:
            direction === "received"
              ? item.RequestedBy.id
              : item.RequestedTo.id,
          requestedAt: item.requestedAt,
          thumbnail: thumbnail || null,
          profilePostId:
            (direction === "received" ? item.RequestedBy : item.RequestedTo)
              ?.profileImg?.id || null,
          mutualFriends: mutuals,
        };
      })
    );

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
    const requestedId = req.id;
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
    const userA = req.id;
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

    console.log("friend: " + userB + "user: " + userA);

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
                  attributes: ["id", "fileName", "thumbnail"],
                },
              ],
            },
          ],
        });
        let thumbnail: string;

        if (theFriends.profileImg != null) {
          thumbnail = theFriends.profileImg.Image.thumbnail;
        } else {
          thumbnail = "default.jpg";
        }
        thumbnail = (await getPicUrlFromS3(req, thumbnail!)) || "";
        // frontend/src/pages/common/ProfilePage/ProfilePageHome.tsx around line 60
        return {
          friendId: friend.id,
          name: theFriends.name,
          userId: userId,
          friendsSince: friend.acceptedAt,
          thumbnail: thumbnail,
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
      return res
        .status(400)
        .send({ message: "Invalid user ID in request parameters." });
    }

    const currentUser = await User.findByPk(currentUserId, {
      attributes: ["school"],
    });

    if (!currentUser) {
      return res.status(400).send({ message: "Current user not found." });
    }

    if (!currentUser.school) {
      return res
        .status(400)
        .send({ message: "User school information not available." });
    }

    const school = currentUser.school;
    const primaryUserFriendRequests = await Friend.findAll({
      where: {
        [Op.or]: [
          { requestedById: currentUserId },
          { requestedToId: currentUserId },
        ],
        acceptedAt: null,
      },
    });

    const primaryUserFriendIdsSet = new Set<number>();
    primaryUserFriendRequests.forEach((friendRequest: typeof Friend) => {
      if (friendRequest.requestedById == currentUserId) {
        primaryUserFriendIdsSet.add(friendRequest.requestedToId);
      } else {
        primaryUserFriendIdsSet.add(friendRequest.requestedById);
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
    });

    const processedSuggestedFriends = suggestedFriends.map(
      async (friend: typeof User) => {
        const thumbnail =
          (await getPicUrlFromS3(
            req,
            friend.profileImg?.Image?.thumbnail || "default.jpg"
          )) || "";

        return {
          userId: friend.id,
          name: friend.name,
          school: friend.school || null,
          thumbnail: thumbnail,
          profileImgId: friend.profileImg?.id || null,
        };
      }
    );

    const result = await Promise.all(processedSuggestedFriends);
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const viewSuggestedFriendsByLocation = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const currentUserId = parseInt(req.params.id, 10);
    if (isNaN(currentUserId)) {
      return res
        .status(400)
        .send({ message: "Invalid user ID in request parameters." });
    }

    const currentUser = await User.findByPk(currentUserId, {
      attributes: ["location"],
    });

    if (!currentUser) {
      return res.status(400).send({ message: "Current user not found." });
    }

    if (!currentUser.location) {
      return res
        .status(400)
        .send({ message: "User location information not available." });
    }

    const location = currentUser.location;
    const primaryUserFriendRequests = await Friend.findAll({
      where: {
        [Op.or]: [
          { requestedById: currentUserId },
          { requestedToId: currentUserId },
        ],
        acceptedAt: null,
      },
    });

    const primaryUserFriendIdsSet = new Set<number>();
    primaryUserFriendRequests.forEach((friendRequest: typeof Friend) => {
      if (friendRequest.requestedById == currentUserId) {
        primaryUserFriendIdsSet.add(friendRequest.requestedToId);
      } else {
        primaryUserFriendIdsSet.add(friendRequest.requestedById);
      }
    });

    const primaryUserFriendIds = Array.from(primaryUserFriendIdsSet);
    const suggestedFriends = await User.findAll({
      where: {
        id: {
          [Op.not]: [...primaryUserFriendIds, currentUserId],
        },
        location: location,
      },
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
    });

    const processedSuggestedFriends = suggestedFriends.map(
      async (friend: typeof User) => {
        const thumbnail =
          (await getPicUrlFromS3(
            req,
            friend.profileImg?.Image?.thumbnail || "default.jpg"
          )) || "";

        return {
          userId: friend.id,
          name: friend.name,
          location: friend.location || null,
          thumbnail: thumbnail,
          profileImgId: friend.profileImg?.id || null,
        };
      }
    );

    const result = await Promise.all(processedSuggestedFriends);
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const findMutualFriends = async (
  user1id: number,
  user2id: number
): Promise<number> => {
  try {
    const user1friends = await Friend.findAll({
      where: {
        [Op.or]: [{ requestedById: user1id }, { requestedToId: user1id }],
        acceptedAt: { [Op.not]: null },
      },
      attributes: ["requestedToId", "requestedById"],
    });

    const user1friendIds = user1friends.map(
      (user: { requestedById: number; requestedToId: any }) => {
        if (user.requestedById == user1id) {
          return user.requestedToId;
        } else {
          return user.requestedById;
          return null;
        }
      }
    );

    for (const friend of user1friendIds) {
      console.log(friend);
    }

    const mutuals = await Friend.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { requestedById: user2id },
              {
                requestedToId: { [Op.in]: user1friendIds },
              },
            ],
          },
          {
            [Op.and]: [
              { requestedToId: user2id },
              {
                requestedById: { [Op.in]: user1friendIds },
              },
            ],
          },
        ],
        acceptedAt: { [Op.not]: null },
      },
    });
    console.log("MUTUAAAAAAALZ" + mutuals.length);
    return mutuals.length;
  } catch (error) {
    console.error("Error finding mutual friends:", error);
    throw error;
  }
};
