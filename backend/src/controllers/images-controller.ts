import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'crypto';
import sharp from 'sharp';
import models from "../db/models";

const randomFileName = (byte = 32) => crypto.randomBytes(byte).toString('hex');

export const add = async (req: any, res: any) => {
    let originalImages = req.files["originalImages"];
    let resizedImages = req.files["resizedImages"];
    let images = [];

    try {
        for (let i = 0; i < originalImages.length; i++) {
            let originalImage = originalImages[i];
            let resizedImage = resizedImages[i];
            let originalFileBuffer = await sharp(originalImage.buffer).toBuffer()
            let resizedFileBuffer = await sharp(resizedImage.buffer).toBuffer()
            let fileName = randomFileName();
            let uploadOriginalParams = {
                Bucket: req.bucketName,
                Body: originalFileBuffer,
                Key: fileName,
                ContentType: originalImage.mimetype
            };

            let uploadResizedParams = {
                Bucket: req.bucketName,
                Body: resizedFileBuffer,
                Key: fileName + "-resized",
                ContentType: resizedImage.mimetype
            };

            // send the image to the s3 bucket
            await req.s3.send(new PutObjectCommand(uploadOriginalParams));
            await req.s3.send(new PutObjectCommand(uploadResizedParams));

            // save the image filename to the database
            let image = await models.Image.create({
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


