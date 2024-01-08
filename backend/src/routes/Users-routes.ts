import express from "express";
import * as UserController from "../controllers/Users-controller";
import * as auth from "../middleware/auth";
import cookieParser from "cookie-parser";

const router = express.Router();
router.use(cookieParser());

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.delete("/logout", auth.authUser, auth.logout);
router.get("/refresh", UserController.refresh);
router.get("/admin", UserController.all);
router.put("/password", auth.authUser, UserController.changedPassword);

export default router;
