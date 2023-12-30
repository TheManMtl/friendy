import exp from "constants";
import { Response, NextFunction } from "express";
import multer from "multer";

export const uploadSingleImage = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const upload = multer({
        storage: multer.memoryStorage()
    });

    upload.single("image")(req, res, (err: any) => {
        if (err) {
            console.log("Multer error: " + err);
            res.status(500).json({ error: "Multer error: " + err });
        } else {
            next();
        }
    });
};

export const uploadMultipleImages = async (req: any, res: Response, next: NextFunction): Promise<void> => {
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
}

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