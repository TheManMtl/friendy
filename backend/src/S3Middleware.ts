import { Request, Response, NextFunction } from "express";
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

console.log("bucketRegion", bucketRegion);
console.log("accessKey", accessKey);
console.log("bucketName", bucketName);

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion,
});

export const attachS3Info = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    // Attach S3 client and bucketName to the request object
    req.s3 = s3;
    req.bucketName = bucketName;

    next();
};