import express from "express";
import * as UserController from "../controllers/Users-controller";
import * as auth from "../middleware/auth";

const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.delete("/logout", auth.authUser, auth.logout);
router.get("/refresh", UserController.refresh);

export default router;
