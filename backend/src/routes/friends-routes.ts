import express from "express";
import * as friends from "../controllers/friends-controller";

const router = express.Router();
// currently hardcoded to send request from user 101 - prior to auth middleware implementation and token use
router.post("/request", friends.createRequest);
router.get("/active-requests", friends.findAllRequests);

export default router;
