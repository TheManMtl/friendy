import express from "express";
import * as friends from "../controllers/friends-controller";

const router = express.Router();
// currently hardcoded to send request from user 101 - prior to auth middleware implementation and token use
router.post("/request", friends.createRequest);

// TWO directions - query params sent/received
// active-requests?direction=sent - friend requests you've made
//active-requests?direction=received - friend requests you've received - defaults to this.
router.get("/active-requests/", friends.findAllRequests);

router.get("/all/:id", friends.viewAllFriends);
router.get("/suggested/:id", friends.viewSuggestedFriendsBySchool);
router.put("/accept-request", friends.acceptRequest);
router.delete("/decline-request", friends.deleteFriend);
router.delete("/remove", friends.deleteFriend);

export default router;
