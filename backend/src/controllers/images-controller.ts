import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'crypto';
import sharp from 'sharp';
import models from "../db/models";

const randomFileName = (byte = 32) => crypto.randomBytes(byte).toString('hex');

export const add = async (req: any, res: any) => {
    const originalImages = req.files["originalImages"];
    const resizedImages = req.files["resizedImages"];
    const images = [];

    try {
        for (let i = 0; i < originalImages.length; i++) {
            const originalImage = originalImages[i];
            const resizedImage = resizedImages[i];
            const originalFileBuffer = await sharp(originalImage.buffer).toBuffer()
            const resizedFileBuffer = await sharp(resizedImage.buffer).toBuffer()
            const fileName = randomFileName();
            const uploadOriginalParams = {
                Bucket: req.bucketName,
                Body: originalFileBuffer,
                Key: fileName,
                ContentType: originalImage.mimetype
            };

            const uploadResizedParams = {
                Bucket: req.bucketName,
                Body: resizedFileBuffer,
                Key: fileName + "-resized",
                ContentType: resizedImage.mimetype
            };

            // send the image to the s3 bucket
            await req.s3.send(new PutObjectCommand(uploadOriginalParams));
            await req.s3.send(new PutObjectCommand(uploadResizedParams));

            // save the image filename to the database
            const image = await models.Image.create({
                fileName: fileName,
                thumbnail: fileName + "-resized"
            });
            images.push(image);
        }
        res.status(201).json(images);
    } catch (err) {
        console.log("Error", err);
    }
};


