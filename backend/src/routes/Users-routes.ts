import { RequestHandler } from "express";
import Users from "../db/models";
import bcrypt from "bcrypt";

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

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  try {
    const username = req.body.username;
    const passwordRaw = req.body.password;
    const passwordCopy = req.body.passwordCopy;
    if (!username || !passwordRaw || !passwordCopy) {
      res.status(400).send({ message: "missing parameters" });
    }
    if (passwordCopy != passwordRaw) {
      res.status(400).send({ message: "passwords do not match" });
    }
    if (username!.length < 5 || username!.length > 15) {
      res
        .status(400)
        .send({ message: "usernames must be between 5 and 15 characters" });
    }
    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec();
    if (existingUsername) {
      res.status(400).send({ message: "username already taken" });
    }
    const passwordHashed = await bcrypt.hash(passwordRaw!, 10);
    const newUser = await UserModel.create({
      username: username,
      password: passwordHashed,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
