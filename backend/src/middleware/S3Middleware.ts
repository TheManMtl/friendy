import { Response, NextFunction } from "express";
import { CustomRequest } from "./auth";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const bucketName: string = process.env.BUCKET_NAME as string;
const bucketRegion: string = process.env.BUCKET_REGION as string;
const accessKey: string = process.env.ACCESS_KEY as string;
const secretAccessKey: string = process.env.SECRET_ACCESS_KEY as string;

console.log("bucketRegion", bucketRegion);
console.log("accessKey", accessKey);
console.log("bucketName", bucketName);

export const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

export const attachS3Info = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Attach S3 client and bucketName to the request object
  req.s3 = s3;
  req.bucketName = bucketName;

  next();
};
