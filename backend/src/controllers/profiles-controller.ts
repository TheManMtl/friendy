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
              as: "image",
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
              as: "image",
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
      profileImgThumbnail: profile.profileImg?.image?.thumbnail || null,
      coverImgId: profile.coverImg?.id || null,
      coverImgFileName: profile.coverImg?.image?.fileName || null,
      relationId: profile.relationshipWith?.id || null,
      relationName: profile.relationshipWith?.name || null,
      isFriend: isFriend,
    };
    res.status(200).send({ profileInfo });
  } catch (error) {
    next(error);
  }
};
