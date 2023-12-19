import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto';
import sharp from 'sharp';
import models from "../db/models";

const randomFileName = (byte = 32) => crypto.randomBytes(byte).toString('hex');

export const addOne = async (req: any): Promise<any> => {
    const imageFile = req.file;

    try {
        const originalFileBuffer = await sharp(imageFile.buffer).toBuffer();
        const resizedFileBuffer = await sharp(imageFile.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer();
        const fileName = randomFileName();

        const uploadOriginalParams = {
            Bucket: req.bucketName,
            Body: originalFileBuffer,
            Key: fileName,
            ContentType: imageFile.mimetype
        };

        const uploadResizedParams = {
            Bucket: req.bucketName,
            Body: resizedFileBuffer,
            Key: fileName + "-resized",
            ContentType: imageFile.mimetype
        };

        // send the image to the s3 bucket
        await req.s3.send(new PutObjectCommand(uploadOriginalParams));
        await req.s3.send(new PutObjectCommand(uploadResizedParams));

        // save the image filename to the database
        const image = await models.Image.create({
            fileName: fileName,
            thumbnail: fileName + "-resized"
        });

        return image;
    } catch (err) {
        console.log("Error", err);
        return null;
    }
};

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

export const getOne = async (req: any, res: any) => {
    const image = await models.Image.findOne({
        where: {
            id: req.body.imageId
        }
    });
    const GetObjectParams = {
        Bucket: req.bucketName,
        Key: image.fileName
    }
    const GetThumbnailParams = {
        Bucket: req.bucketName,
        Key: image.thumbnail
    }
    const command = new GetObjectCommand(GetObjectParams);
    const thumbnailCommand = new GetObjectCommand(GetThumbnailParams);
    const url = await getSignedUrl(req.s3, command, { expiresIn: 3600 });
    const thumbnailUrl = await getSignedUrl(req.s3, thumbnailCommand, { expiresIn: 3600 });
    image.imageUrl = url;
    image.thumbnailUrl = thumbnailUrl;
    res.send(image);
};

export const getbyUser = async (req: any, res: any) => {
    const images = await models.Image.findAll({
        where: {
            userId: req.params.id
        }
    });
    res.send(images);
}

export const remove = async (req: any, imageId: number) : Promise<boolean> => {
    try {
        const image = await models.Image.findOne({
            where: {
                id: imageId
            }
        });
        const deleteObjectParams = {
            Bucket: req.bucketName,
            Key: image.fileName
        }
        const deleteThumbnailParams = {
            Bucket: req.bucketName,
            Key: image.thumbnail
        }
        const command = new DeleteObjectCommand(deleteObjectParams);
        const thumbnailCommand = new DeleteObjectCommand(deleteThumbnailParams);
        await req.s3.send(command);
        await req.s3.send(thumbnailCommand);
        await image.destroy();
        return true;
    } catch (error) {
        console.log("Error when removing image: ", error);
        return false;
    }
}

export const getPicUrlFromS3 = async (req: any, imageName: string) => {
    const getObjectParams = {
        Bucket: req.bucketName,
        Key: imageName,
    };
    const command = new GetObjectCommand(getObjectParams);

    try {
        const url = await getSignedUrl(req.s3, command, {
            expiresIn: 3600,
        });
        return url;
    } catch (error) {
        console.error("=====Error generating signed URL:=====", error);
    }
}

