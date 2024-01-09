import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/auth";
import models from "../db/models";
import { Op } from "sequelize";
import { getPicUrlFromS3 } from "./images-controller";

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
  coverImgFileName?: string | null;
  relationId?: number;
  relationName?: string;
  isFriend?: boolean;
}

interface searchMap {
  user: browsedProfile;
  value: number;
}

interface browsedProfile {
  id: number;
  name?: string;
  userId?: number;
  thumbnail?: string;
  profilePostId?: number;
  location?: string;
  school?: string;
  workplace?: string;
  isFriend: boolean;
  mutualFriends: number;
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
      return res.status(404).send({ message: "User not found" });
    }

    // image
    let thumbnail: string | null = "";
    let coverPic: string | null;

    if (profile.profileImg) {
      thumbnail = profile.profileImg?.Image?.thumbnail;
      console.log("\n\n\n\nEMILY\n\n\n");
    } else {
      thumbnail = "default_thumbnail.jpg";
    }
    thumbnail = await getPicUrlFromS3(req, thumbnail!);
    // default-cover_thumbnail.jpg

    if (profile.coverImg) {
      coverPic = profile.coverImgId?.Image?.fileName;
    } else {
      coverPic = "default-cover.jpg";
    }
    coverPic = await getPicUrlFromS3(req, coverPic!);
    // coverImgFileName

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
      profileImgThumbnail: thumbnail!,
      coverImgId: profile.coverImg?.id || null,
      coverImgFileName: coverPic,
      relationId: profile.relationshipWith?.id || null,
      relationName: profile.relationshipWith?.name || null,
      isFriend: isFriend,
    };
    res.status(200).send({ profileInfo });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = req.id;
    const request = req.body;
    let updates = 0;
    const user = await User.findByPk(userId, {
      where: {
        isDeleted: false,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User could not be found." });
    }

    if (request.location != null) {
      user.location = request.location;
      updates++;
    }

    if (request.school != null) {
      user.school = request.school;
      updates++;
    }

    if (request.workplace != null) {
      user.workplace = request.workplace;
      updates++;
    }

    if (request.position != null) {
      user.position = request.position;
      updates++;
    }

    if (request.bio != null) {
      user.bio = request.bio;
      updates++;
    }

    //added by Shiyu
    if (request.profilePostId != null) {
      user.profilePostId = request.profilePostId;
      updates++;
    }

    if (request.coverPostId != null) {
      user.coverPostId = request.coverPostId;
      updates++;
    }

    if (request.birthday != null) {
      if (!(request.birthday instanceof Date)) {
        return res
          .status(400)
          .send({ message: "Birthday must be a valid date" });
      }
      const today = new Date();
      const userBirthday = new Date(request.birthday);
      const age = today.getFullYear() - userBirthday.getFullYear();

      if (age < 5 || age > 120) {
        return res
          .status(400)
          .send({ message: "Birthday must be between 5 and 120 years ago" });
      }
      user.birthday = request.birthday;
      updates++;
    }

    if (request.relationshipWithId != null) {
      const relationship = await User.findByPk(request.relationshipWithId, {
        where: {
          isDeleted: false,
        },
      });
      if (!relationship) {
        return res
          .status(400)
          .send({ message: "Relationship with is not a valid user" });
      }

      user.relationshipWithId = request.relationshipWithId;
      user.relationshipUpdatedAt = new Date();
      updates++;
    }

    if (request.relationshipStatus != null) {
      if (
        Object.values(RelationshipStatus).includes(request.relationshipStatus)
      ) {
        user.relationshipStatus = request.relationshipStatus;
        user.relationshipUpdatedAt = new Date();
        updates++;
      } else {
        return res
          .status(400)
          .send({ message: "Not valid relationship status" });
      }
    }

    if (updates > 0) {
      user.profileUpdatedAt = new Date();
      await user.save();
    }

    return res.status(200).send(user);
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
    const currentUserId = req.id;
    if (!currentUserId) {
      return res
        .status(401)
        .send({ message: "You are not authorized to browse profiles" });
    }
    const paramString: string = req.query.search as string;
    console.log(paramString + " \n\n\n ABOVE");
    const theUser = await User.findByPk(currentUserId);
    if (!theUser) {
      return res
        .status(401)
        .send({ message: "You are not authorized to browse profiles" });
    }
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

    const searchResults: browsedProfile[] = await Promise.all(
      returnedUsers.map(async (user: any) => {
        try {
          const isFriend = friendIds.includes(user.id);
          let thumbnail: string;

          if (user.profileImg) {
            thumbnail =
              (await getPicUrlFromS3(req, user.profileImg.Image.thumbnail)) ||
              "";
          } else {
            thumbnail =
              (await getPicUrlFromS3(req, "default_thumbnail.jpg")) || "";
          }

          return {
            id: user.id,
            name: user.name,
            userId: user.id,
            thumbnail: thumbnail,
            profilePostId: user.profileImg?.id || null,
            location: user.location || null,
            school: user.school || null,
            workplace: user.workplace || null,
            isFriend: isFriend,
            mutualFriends: 0,
          };
        } catch (error) {
          // Handle errors here if needed
          console.error("Error processing user:", user.id, error);
          return null; // Return null or handle the error in a different way
        }
      })
    );

    const result = await sortSearch(
      searchResults,
      friendIds,
      paramArray,
      theUser
    );
    res.status(200).send(result);
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
  friends: number[],
  searchParams: string[],
  currentUser: typeof User
): Promise<browsedProfile[]> => {
  const queryParams = searchParams.map((param) => param.toLowerCase());

  for (const user of searchResults) {
    const mutuals = await Friend.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { requestedById: user.id },
              {
                requestedToId: { [Op.in]: friends },
              },
            ],
          },
          {
            [Op.and]: [
              { requestedToId: user.id },
              {
                requestedById: { [Op.in]: friends },
              },
            ],
          },
        ],
        acceptedAt: { [Op.not]: null },
      },
    });
    user.mutualFriends = mutuals.length;
  }
  let userLocationArray: string[];
  let userSchoolArray: string[];
  let userWorkArray: string[];

  if (currentUser.location) {
    const userLocation = currentUser.location.replace(/[^a-zA-Z0-9 ]/g, "");
    userLocationArray = userLocation
      .split(" ")
      .map((str: string) => str.toLowerCase());
  }

  if (currentUser.school) {
    const userSchool = currentUser.school.replace(/[^a-zA-Z0-9 ]/g, "");
    userSchoolArray = userSchool
      .split(" ")
      .map((str: string) => str.toLowerCase());
  }

  if (currentUser.workplace) {
    const userWork = currentUser.workplace.replace(/[^a-zA-Z0-9 ]/g, "");
    userWorkArray = userWork.split(" ").map((str: string) => str.toLowerCase());
  }

  const sortedUsers: searchMap[] = searchResults.map((user: any) => {
    let points = 0;
    const nameArray = user.name!.split(" ");
    for (const name of nameArray) {
      if (queryParams.includes(name.toLowerCase())) {
        points += 1200;
      }
    }
    if (user.location) {
      const location = user.location.replace(/[^a-zA-Z0-9 ]/g, "");
      const locationArray = location.split(" ");
      for (const location of locationArray) {
        if (queryParams.includes(location)) {
          points += 300;
        }
        if (currentUser.location) {
          if (userLocationArray.includes(location)) {
            points += 400;
          }
        }
      }
    }
    if (user.school) {
      const userSchool = user.school.replace(/[^a-zA-Z0-9 ]/g, "");
      const schoolArray = userSchool.split(" ");
      for (const school of schoolArray) {
        if (queryParams.includes(school)) {
          points += 300;
        }
        if (currentUser.school) {
          if (userSchoolArray.includes(school)) {
            points += 450;
          }
        }
      }
    }
    if (user.workplace) {
      const userWork = user.workplace.replace(/[^a-zA-Z0-9 ]/g, "");
      const workArray = userWork.split(" ");
      for (const workplace of workArray) {
        if (queryParams.includes(workplace)) {
          points += 400;
        }
        if (currentUser.workplace) {
          if (userWorkArray.includes(workplace)) {
            points += 475;
          }
        }
      }
    }
    if (user.isFriend) {
      points += 1000;
    }
    points += user.mutualFriends * 75;

    const userEvaluated: searchMap = {
      user: user,
      value: points,
    };
    return userEvaluated;
  });

  sortedUsers.sort((a, b) => b.value - a.value);

  const finalSorting: browsedProfile[] = sortedUsers.map((map: any) => {
    console.log(map.value + " : value \n\n");
    return map.user;
  });
  return finalSorting;
};

//get current user profile pic thumbnail
export const getProfilePicThumbnail = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const post = await Post.findOne({
      where: {
        id: user.profilePostId,
      },
      include: [
        {
          model: Image,
          attributes: ["id", "fileName", "thumbnail"],
        },
      ],
    });
    if (!post || !post.Image) {
      const url = await getPicUrlFromS3(req, "default_thumbnail.jpg");
      console.log("default profile pic thumbnail url: ");
      console.log(url);
      return res.status(200).json(url);
    }

    const url = await getPicUrlFromS3(req, post.Image.thumbnail);
    console.log("profile pic thumbnail url: ");
    console.log(url);
    return res.status(200).json(url);
  } catch (error) {
    console.error("Error fetching post images:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
