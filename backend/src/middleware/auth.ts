import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  role: string;
}

interface CustomRequest extends Request {
  id?: string;
  role?: string;
}

export const authUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["x-access-token"] as string | undefined;
  if (!token) {
    res.status(401).send({ auth: false, message: "not authenticated." });
    console.log("no token?");
  } else {
    const jwtSecret = process.env.JWT_SECRET as string;
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({
          auth: false,
          message: "failed to authenticate",
          error: err,
        });
      } else {
        const decodedToken = decoded as DecodedToken;
        console.log("this worked - server");
        req.id = decodedToken!.id;
        req.role = decodedToken!.role;

        next();
      }
    });
  }
};

export const authAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["x-access-token"] as string | undefined;
  if (!token) {
    res.status(401).send({ auth: false, message: "not authenticated." });
  } else {
    const jwtSecret = process.env.JWT_SECRET as string;
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({
          auth: false,
          message: "failed to authenticate",
          error: err,
        });
      } else {
        const decodedToken = decoded as DecodedToken;
        if (decodedToken!.role != "Admin") {
          res.status(401).send({ auth: false, message: "not authenticated." });
        } else {
          req.id = decodedToken!.id;
          req.role = decodedToken!.role;
          next();
        }
      }
    });
  }
};
