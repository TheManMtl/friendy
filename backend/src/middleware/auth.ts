import { Request, Response, NextFunction } from "express";
//import { read } from "fs";
import jwt from "jsonwebtoken";
import { s3 } from "./S3Middleware";

export interface DecodedToken {
  id?: number;
  role?: string;
}

export interface CustomRequest extends Request {
  id?: number;
  role?: string;
  refreshTokem?: string;
  s3?: typeof s3;
  bucketName?: string;
}

/*
 Cache for tokens after logout
 */
const deadTokens: string[] = [];
const deadRefreshTokens: string[] = [];

// const verifyToken = (token: string, secret: string): DecodedToken | null => {
//   try {
//     return jwt.verify(token, secret) as DecodedToken;
//   } catch (error) {
//     return null;
//   }
// };

export const authUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers["x-access-token"] as string;
  const refreshToken = req.cookies["refreshToken"] as string;
  const jwtSecret = process.env.JWT_SECRET as string;
  //check if tokens exist
  if (!token || !refreshToken) {
    return res.status(401).send({ message: "Failed to authenticate request." });
  }

  //check if tokens have been invalidated
  if (deadTokens.includes(token) || deadRefreshTokens.includes(refreshToken)) {
    return res.status(401).send({
      message: "You have been logged out. Please log back in to continue.",
    });
  }

  try {
    const readToken = jwt.verify(token, jwtSecret) as DecodedToken;
    req.id = readToken!.id;
    req.role = readToken!.role;
  } catch (error) {
    return res.status(401).send({
      message: "You are not authenticated",
    });
  }

  next();
};

export const authAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (!req.role || req.role != "Admin") {
    return res.status(401).send({ auth: false, message: "not authorized." });
  }
  next();
};

/*
Logout
Verify login, cache tokens
*/
export const logout = async (req: CustomRequest, res: Response) => {
  try {
    // const jwtSecret = process.env.JWT_SECRET as string;
    const token = req.headers["x-access-token"] as string;
    const refreshToken = req.cookies["refreshToken"] as string;

    deadTokens.push(token);
    deadRefreshTokens.push(refreshToken);
    console.log("deadtokens " + (deadTokens.length > 0 ? deadTokens[0] : 'empty'));
    //clear cookies
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" });
    return res.status(200).json({ message: "Successfully logged out" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/*
Check dead tokens to enforce logout
*/

/*
export const validateTokens = async (
  req: CustomRequest,
  res: Response
): Promise<DecodedToken | Response> => {
  const token = req.headers["x-access-token"] as string;
  const refreshToken = req.cookies["refreshToken"] as string;
  const jwtSecret = process.env.JWT_SECRET as string;
  //check if tokens exist
  if (!token || !refreshToken) {
    return res.status(401).send({ message: "Failed to authenticate request." });
  }

  //check if tokens have been invalidated
  if (deadTokens.includes(token) || deadRefreshTokens.includes(refreshToken)) {
    return res.status(401).send({
      message: "You have been logged out. Please log back in to continue.",
    });
  }

  try {
    return jwt.verify(token, jwtSecret) as DecodedToken;
  } catch (error) {
    return res.status(401).send({
      message: "You are not authenticated",
    });
  }
};
*/
// export const checkDeadTokens = async (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<any> => {
//   const token = req.headers["x-access-token"] as string;
//   const refreshToken = req.cookies["refreshToken"] as string;

//   //check if tokens exist
//   if (!token || !refreshToken) {
//     return res.status(401).send({ message: "Failed to authenticate request." });
//   }

//   //check if tokens have been invalidated
//   if (deadTokens.includes(token) || deadRefreshTokens.includes(refreshToken)) {
//     return res.status(401).send({
//       message: "You have been logged out. Please log back in to continue.",
//     });
//   }

//   next();
// };
