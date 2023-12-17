import express from "express";
import * as UserController from "../controllers/Users-controller";
import * as auth from "../middleware/auth";

const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.delete("/logout", auth.checkDeadTokens, auth.authUser, auth.logout);

export default router;
