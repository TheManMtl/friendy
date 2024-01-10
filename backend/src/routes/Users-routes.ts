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
router.put("/password", auth.authUser, UserController.changedPassword);

//admin routes
router.get("/admin", auth.authUser, auth.authAdmin, UserController.all);
router.get("/admin/:id", auth.authUser, auth.authAdmin, UserController.findByUserId);
router.put("/admin/disable/:id", auth.authUser, auth.authAdmin, UserController.disableUser);
router.put("/admin/reactivate/:id", auth.authUser, auth.authAdmin, UserController.reactivateUser);

export default router;
