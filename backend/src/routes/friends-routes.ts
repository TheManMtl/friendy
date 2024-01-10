import express from "express";
import * as friends from "../controllers/friends-controller";
import { attachS3Info } from "../middleware/S3Middleware";
import { authUser } from "../middleware/auth";
const router = express.Router();
// currently hardcoded to send request from user 101 - prior to auth middleware implementation and token use
router.post("/request", authUser, friends.createRequest);

// TWO directions - query params sent/received
// active-requests?direction=sent - friend requests you've made
//active-requests?direction=received - friend requests you've received - defaults to this.
router.get(
  "/active-requests/",
  authUser,
  attachS3Info,
  friends.findAllRequests
);

router.get("/all/:id", authUser, attachS3Info, friends.viewAllFriends);
router.get(
  "/suggested-school/:id",
  attachS3Info,
  authUser,
  friends.viewSuggestedFriendsBySchool
);
router.get(
  "/suggested-location/:id",
  attachS3Info,
  authUser,
  friends.viewSuggestedFriendsByLocation
);
router.put("/accept-request", authUser, friends.acceptRequest);
router.delete("/decline-request", authUser, friends.deleteFriend);
router.delete("/remove", authUser, friends.deleteFriend);

export default router;
