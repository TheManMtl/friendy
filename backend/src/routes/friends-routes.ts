import express from "express";
import * as friends from "../controllers/friends-controller";
import { attachS3Info } from "../middleware/S3Middleware";

const router = express.Router();
// currently hardcoded to send request from user 101 - prior to auth middleware implementation and token use
router.post("/request", friends.createRequest);

// TWO directions - query params sent/received
// active-requests?direction=sent - friend requests you've made
//active-requests?direction=received - friend requests you've received - defaults to this.
router.get("/active-requests/", attachS3Info, friends.findAllRequests);

router.get("/all/:id", attachS3Info, friends.viewAllFriends);
router.get("/suggested-school/:id", friends.viewSuggestedFriendsBySchool);
router.get("/suggested-location/:id", friends.viewSuggestedFriendsByLocation);
router.put("/accept-request", friends.acceptRequest);
router.delete("/decline-request", friends.deleteFriend);
router.delete("/remove", friends.deleteFriend);

export default router;
