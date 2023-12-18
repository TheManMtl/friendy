import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/auth";
import models from "../db/models";
import { Op } from "sequelize";

const User = models.User;
const Friend = models.Friend;
const Image = models.Image;
const Post = models.Post;

enum RelationshipStatus {
  Single = "Single",
  InARelationship = "In a relationship",
  Dating = "Dating",
  Engaged = "Engaged",
  Married = "Married",
}

interface userProfile {
  name?: string;
  email?: string;
  location?: string;
  school?: string;
  workplace?: string;
  position?: string;
  bio?: string;
  birthday?: string;
  relationshipStatus?: RelationshipStatus;
  profileImgId?: number;
  profileImgThumbnail?: string;
  coverImgId?: number;
  coverImgFileName?: string;
  relationId?: number;
  relationName?: string;
  isFriend?: boolean;
}

interface browsedProfile {
  name?: string;
  userId?: number;
  thumbnail?: string;
  profilePostId?: number;
  location?: string;
  school?: string;
  workplace?: string;
  isFriend: boolean;
}

export const dummyHandler = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    console.log("dummy handler");
  } catch (error) {
    next(error);
  }
};

export const viewProfile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let isFriend;
    const currentUserId = req.id;
    // const currentUserId = 101;
    const profileId = req.params.id;
    if (!currentUserId) {
      isFriend = false;
    } else {
      const friend = await Friend.findOne({
        where: {
          [Op.or]: [
            {
              requestedById: currentUserId,
              requestedToId: profileId,
            },
            {
              requestedById: profileId,
              requestedToId: currentUserId,
            },
          ],
          acceptedAt: { [Op.not]: null },
        },
      });
      if (friend) isFriend = true;
    }

    const profile = await User.findByPk(profileId, {
      where: {
        isDeleted: false,
      },
      attributes: [
        "name",
        "email",
        "location",
        "school",
        "workplace",
        "position",
        "bio",
        "birthday",
        "relationshipStatus",
      ],
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
        {
          //relationshipWith
          model: Post,
          as: "coverImg",
          attributes: ["id"],
          include: [
            {
              model: Image,
              as: "Image",
              attributes: ["id", "fileName"],
            },
          ],
        },
        {
          model: User,
          as: "relationshipWith",
          attributes: ["id", "name"],
        },
      ],
    });
    if (!profile) {
      return res.status(400).send({ message: "user does not exist" });
    }
    const profileInfo: userProfile = {
      name: profile.name,
      email: profile.email,
      location: profile.location || null,
      school: profile.school || null,
      workplace: profile.workplace || null,
      position: profile.position || null,
      bio: profile.bio || null,
      birthday: profile.birthday || null,
      relationshipStatus: profile.relationshipStatus || null,
      profileImgId: profile.profileImg?.id || null,
      profileImgThumbnail: profile.profileImg?.Image?.thumbnail || null,
      coverImgId: profile.coverImg?.id || null,
      coverImgFileName: profile.coverImg?.Image?.fileName || null,
      relationId: profile.relationshipWith?.id || null,
      relationName: profile.relationshipWith?.name || null,
      isFriend: isFriend,
    };
    res.status(200).send({ profileInfo });
  } catch (error) {
    next(error);
  }
};

export const findPeople = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const currentUserId = 89;
    // const currentUserId = req.id;
    if (!currentUserId) {
      return res
        .status(401)
        .send({ message: "You are not authorized to browse profiles" });
    }
    const paramString: string = req.query.search as string;
    console.log(paramString + " \n\n\n ABOVE");

    const friends = await Friend.findAll({
      where: {
        [Op.or]: [
          { requestedById: currentUserId },
          { requestedToId: currentUserId },
        ],
        acceptedAt: { [Op.not]: null },
      },
    });

    const friendIds = friends.reduce((acc: number[], friend: typeof Friend) => {
      if (friend.requestedById == currentUserId) {
        acc.push(friend.requestedToId);
      } else {
        acc.push(friend.requestedById);
      }

      return acc;
    }, []);
    console.log(friendIds + " = friend ids\n\n\n");
    if (!paramString) {
      return res.status(400).send({ message: "Please send params" });
    }
    const paramArray = paramString!.split(",");

    const searchFor = paramArray.map((str) => {
      const value: string = "%" + sanitizeString(str) + "%";
      return { [Op.like]: value };
    });

    const returnedUsers = await User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.or]: searchFor } },
          { email: { [Op.or]: searchFor } },
          { location: { [Op.or]: searchFor } },
          { school: { [Op.or]: searchFor } },
          { workplace: { [Op.or]: searchFor } },
        ],
        isDeleted: false,
      },
      attributes: [
        "id",
        "name",
        "email",
        "location",
        "school",
        "workplace",
        "position",
        "bio",
        "birthday",
        "relationshipStatus",
      ],
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
        {
          //relationshipWith
          model: Post,
          as: "coverImg",
          attributes: ["id"],
          include: [
            {
              model: Image,
              as: "Image",
              attributes: ["id", "fileName"],
            },
          ],
        },
        {
          model: User,
          as: "relationshipWith",
          attributes: ["id", "name"],
        },
      ],
    });

    const searchResults: browsedProfile[] = returnedUsers.map((user: any) => {
      const isFriend = friendIds.includes(user.id);

      return {
        id: user.id,
        name: user.name,
        userId: user.id,
        thumbnail: user.profileImg?.Image?.thumbnail || null,
        profilePostId: user.profileImg?.id || null,
        location: user.location || null,
        school: user.school || null,
        workplace: user.workplace || null,
        isFriend: isFriend,
      };
    });
    res.status(200).send(searchResults);
  } catch (error) {
    next(error);
  }
};

function sanitizeString(str: string) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str.trim();
}

const sortSearch = async (
  searchResults: browsedProfile[],
  friends: number[]
): Promise<browsedProfile[]> => {
  return searchResults;
};
