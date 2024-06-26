import { NextFunction, RequestHandler, Response } from "express";
import models from "../db/models";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import { CustomRequest, DecodedToken } from "../middleware/auth";

const User = models.User;

interface SignUpBody {
  name?: string;
  password?: string;
  passwordCopy?: string;
  email?: string;
}

interface LoginBody {
  email?: string;
  password?: string;
}

interface ReturnedUser {
  token: string;
  name: string;
  email: string;
  id: number;
  role: string;
}

interface ChangedPassword {
  oldPassword: string;
  newPassword: string;
  newPasswordCopy: string;
}

// token: accessToken,
// name: user.name,
// email: user.email,
// id: user.id,
// role: user.role,

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  try {
    const name = req.body.name;
    const passwordRaw = req.body.password;
    const passwordCopy = req.body.passwordCopy;
    const email = req.body.email;
    if (!name || !passwordRaw || !passwordCopy || !email) {
      return res.status(400).send({ message: "missing parameters" });
    }
    if (passwordCopy != passwordRaw) {
      return res.status(400).send({ message: "passwords do not match" });
    }
    if (name!.length < 4 || name!.length > 25) {
      return res
        .status(400)
        .send({ message: "name must be between 4 and 25 characters" });
    }
    if (
      validator.isStrongPassword(passwordRaw, {
        returnScore: true,
        pointsPerRepeat: 0,
        pointsPerUnique: 0,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 5,
        pointsForContainingSymbol: 5,
      }) < 25
    ) {
      return res.status(400).send({
        message:
          "Password must contain at least one uppercase letter, one lower case letter, and one number or special character.",
      });
    }

    if (!validator.isLength(passwordRaw, { min: 6, max: 100 })) {
      return res.status(400).send({
        message: "Password must be between 6 and 100 characters long.",
      });
    }

    if (!validator.isEmail(email!)) {
      return res
        .status(400)
        .send({ message: "you must register with a valid email" });
    }

    const existingUsername = await User.findOne({
      where: {
        email: email!,
      },
    });

    if (existingUsername) {
      return res.status(400).send({ message: "username already taken" });
    }
    const passwordHashed = await bcrypt.hash(passwordRaw!, 10);
    const newUser = await User.create({
      name: name,
      password: passwordHashed,
      email: email,
    });
    newUser.password = null;
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const email = req.body.email;
  const passwordRaw = req.body.password;

  if (!email || !passwordRaw) {
    return res
      .status(400)
      .send({ message: "Please provide email and password." });
  }
  try {
    const user = await User.findOne({
      where: {
        email: email!,
        isDeleted: false,
      },
    });

    if (!user) {
      console.log("email wrong");
      return res.status(400).send({ message: "Invalid credentials." });
    }

    const passwordMatch = await bcrypt.compare(passwordRaw!, user!.password);

    if (!passwordMatch) {
      console.log("password wrong");
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const id = user.id;
    const role = user.role;
    const accessToken = jwt.sign({ id, role }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id, role }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    req.session.userId = user.id;
    req.session.name = user.name;
    // ReturnedUser
    const theUser: ReturnedUser = {
      token: accessToken,
      name: user.name,
      email: user.email,
      id: user.id,
      role: user.role,
    };
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        //sameSite: "strict",
      })
      .status(200)
      .send(theUser);
  } catch (error) {
    next(error);
  }
};

export const refresh: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    return res.status(401).send("Access Denied. No refresh token provided.");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!);
    const decodedToken = decoded as DecodedToken;
    const accessToken = jwt.sign(
      { id: decodedToken.id, role: decodedToken.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      return res.status(403).send({ message: "No such user" });
    }

    const theUser: ReturnedUser = {
      token: accessToken,
      name: user.name,
      email: user.email,
      id: user.id,
      role: user.role,
    };
    req.session.userId = user.id;
    req.session.name = user.name;
    return res.status(200).send(theUser);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send({
        message: "You have been logged out. Please login to continue.",
      });
    }
    next(error);
  }
};

export const all: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all users
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude the password field from the response
    });

    // Return the list of users
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const changedPassword = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (!req.id) {
    return res.status(400).send({ message: "not authorized" });
  }
  if (
    !req.body.oldPassword ||
    !req.body.newPassword ||
    !req.body.newPasswordCopy
  ) {
    return res.status(400).send({ message: "please provide all parameters" });
  }
  if (req.body.newPassword != req.body.newPasswordCopy) {
    return res.status(400).send({ message: "new passwords must match" });
  }
  if (
    validator.isStrongPassword(req.body.newPassword, {
      returnScore: true,
      pointsPerRepeat: 0,
      pointsPerUnique: 0,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 5,
      pointsForContainingSymbol: 5,
    }) < 25
  ) {
    return res.status(400).send({
      message:
        "Password must contain at least one uppercase letter, one lower case letter, and one number or special character.",
    });
  }

  try {
    const user = await User.findByPk(req.id);

    const passwordMatch = await bcrypt.compare(
      req.body.oldPassword!,
      user!.password
    );

    if (!passwordMatch) {
      console.log("password wrong");
      return res.status(401).send({ message: "Invalid credentials" });
    }
    user.password = await bcrypt.hash(req.body.newPassword!, 10);
    await user.save();
    return res.status(200).send({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

export const findByUserId: RequestHandler = async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).send({ message: "User ID is required." });
  }

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] } // Exclude the password field
    });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const disableUser: RequestHandler = async (req, res, next) => {
  const userId = req.params.id; // Assuming the user ID is passed as a URL parameter
  
  try {
    // Find the user by ID
    const user = await User.findByPk(userId,
      {
        where: {
          isDeleted: false,
        }
      });

    // Check if user exists
    if (!user) {
      return res.status(404).send({ message: "User not found or already deactivated." });
    }

    // Set isActive to false to disable the user
    //temporary: use isDeleted
    user.isDeleted = true;

    // Save the updated user
    await user.save();

    // Respond back
    res.status(200).send({ message: "User disabled successfully." });
  } catch (error) {
    // Handle possible errors
    console.error("Error disabling user:", error);
    next(error);
  }
};

export const reactivateUser: RequestHandler = async (req, res, next) => {
  const userId = req.params.id; // Assuming the user ID is passed as a URL parameter
  
  try {
    // Find the user by ID
    const user = await User.findByPk(userId,
      {
        where: {
          isDeleted: true,
        }
      });

    // Check if user exists
    if (!user) {
      return res.status(404).send({ message: "User not found or already active." });
    }

    // Set isActive to false to disable the user
    //temporary: use isDeleted
    user.isDeleted = false;

    // Save the updated user
    await user.save();

    // Respond back
    res.status(200).send({ message: "User disabled successfully." });
  } catch (error) {
    // Handle possible errors
    console.error("Error disabling user:", error);
    next(error);
  }
};
