import { Request, Response, NextFunction } from "express";
import { read } from "fs";
import jwt from "jsonwebtoken";

export interface DecodedToken {
  id?: number;
  role?: string;
}

export interface CustomRequest extends Request {
  id?: number;
  role?: string;
  accessToken?: string | undefined;
}

interface ReadToken {
  decoded?: DecodedToken | undefined;
  newToken: boolean;
  token?: string | undefined;
}

const verifyToken = (token: string, secret: string): DecodedToken | null => {
  try {
    return jwt.verify(token, secret) as DecodedToken;
  } catch (error) {
    return null;
  }
};

const createNewToken = (token: string, secret: string): string => {
  const oldToken = verifyToken(token, secret);
  return jwt.sign(
    { id: oldToken!.id, role: oldToken!.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};

const processTokens = (
  token: string | undefined,
  refreshToken: string | undefined,
  secret: string
): ReadToken => {
  let newToken = false;
  if (!token) {
    return {
      decoded: undefined,
      newToken: newToken,
      token: undefined,
    };
  }
  let decoded = verifyToken(token!, secret);
  if (!decoded) {
    if (!refreshToken) {
      return {
        decoded: undefined,
        newToken: newToken,
        token: undefined,
      };
    }
    token = createNewToken(refreshToken!, secret);
    decoded = verifyToken(token!, secret);
    newToken = true;
  }
  if (!decoded) {
    return {
      decoded: undefined,
      newToken: newToken,
      token: undefined,
    };
  }
  const decodedToken = decoded as DecodedToken;
  return {
    decoded: decodedToken,
    newToken: newToken,
    token: token,
  };
};

export const authUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = req.headers["x-access-token"] as string | undefined;
  const refreshToken = req.cookies["refreshToken"] as string | undefined;
  const readToken = processTokens(token, refreshToken, jwtSecret);

  if (!readToken.decoded) {
    return res.status(401).send({ auth: false, message: "not authenticated." });
  }
  req.id = readToken.decoded!.id;
  req.role = readToken.decoded!.role;
  req.accessToken = readToken.newToken ? readToken.token : undefined;

  next();
};

export const authAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = req.headers["x-access-token"] as string | undefined;
  const refreshToken = req.cookies["refreshToken"] as string | undefined;
  const readToken = processTokens(token, refreshToken, jwtSecret);

  if (!readToken.decoded) {
    return res.status(401).send({ auth: false, message: "not authenticated." });
  }
  if (readToken.decoded.role != "Admin") {
    return res.status(401).send({ auth: false, message: "not authenticated." });
  }
  req.id = readToken.decoded!.id;
  req.role = readToken.decoded!.role;
  req.accessToken = readToken.newToken ? readToken.token : undefined;
  next();
};

export const decodeUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = req.headers["x-access-token"] as string | undefined;
  const refreshToken = req.cookies["refreshToken"] as string | undefined;
  const readToken = processTokens(token, refreshToken, jwtSecret);

  req.id = readToken.decoded?.id || undefined;
  req.role = readToken.decoded?.role || undefined;
  req.accessToken = readToken.newToken ? readToken.token : undefined;
  next();
};
