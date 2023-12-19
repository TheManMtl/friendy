import express from "express";
import * as profiles from "../controllers/profiles-controller";
//import { decodeUser } from "../middleware/auth";

const router = express.Router();

router.get("/view/:id", profiles.viewProfile);
router.get("/search", profiles.findPeople);

export default router;
