import { Response, NextFunction } from "express";
import multer from "multer";

export const uploadImageMemory = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const upload = multer({
        storage: multer.memoryStorage()
    });

    upload.array("images")(req, res, (err: any) => {
        if (err) {
            console.log("Multer error: " + err);
            res.status(500).json({ error: "Multer error: " + err });
        } else {
            next();
        }
    });
};

export const uploadTwoImages = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const upload = multer({
        storage: multer.memoryStorage()
    });

    upload.fields([{ name: "originalImages" }, { name: "resizedImages" }])(
        req,
        res,
        (err: any) => {
            if (err) {
                console.log("Multer error: " + err);
                res.status(500).json({ error: "Multer error: " + err});
            } else {
                next();
            }
        }
    );
};