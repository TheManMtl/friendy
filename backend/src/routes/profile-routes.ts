import express from "express";
import * as profiles from "../controllers/profiles-controller";
import { decodeUser } from "../middleware/auth";

const router = express.Router();

router.get("/view/:id", decodeUser, profiles.viewProfile);

export default router;
