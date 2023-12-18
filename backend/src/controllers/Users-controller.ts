import { RequestHandler } from "express";
//import {User} from "../db/models";
//const {User} = require("../db/models")
import models from "../db/models";
import bcrypt from "bcrypt";
import validator from "validator";
// import session from "express-session";
import jwt from "jsonwebtoken";
import { DecodedToken } from "../middleware/auth";

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
      res
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
      res.status(400).send({
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
    return res.status(200).send(theUser).cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });
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

    res.status(200).send(theUser);
  } catch (error) {
    next(error);
  }
};
