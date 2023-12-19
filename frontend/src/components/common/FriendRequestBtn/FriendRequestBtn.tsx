import React, { useEffect, useState } from "react";

import "./FriendRequestBtn.css";
import { RequestProfile } from "../../../models/RequestProfile";
import axios from "axios";

type FriendRequestBtnProps = {
  value: boolean;
  returnNewFriend: (friend: RequestProfile | null) => void;
  friendId: number;
};

const FriendRequestBtn: React.FC<FriendRequestBtnProps> = ({
  value,
  returnNewFriend,
  friendId,
}) => {
  const handleRequest = (result: boolean) => {
    const body = {
      id: friendId,
    };
    if (value) {
      try {
        axios
          //  router.put("/accept-request", friends.acceptRequest);
          .put(`${process.env.REACT_APP_HOST_URL}/friends/accept-request`, body)
          .then((response: any) => {
            returnNewFriend(null);
          });
      } catch (error: any) {
        console.error("Error during login:", error.message);
        alert("An error occurred during login. Please try again.");
      }
    } else {
      try {
        axios
          .delete(`${process.env.REACT_APP_HOST_URL}/friends/decline-request`, {
            data: body,
          })
          .then((response: any) => {
            returnNewFriend(null);
          });
      } catch (error: any) {
        console.error("Error during login:", error.message);
        alert("An error occurred during login. Please try again.");
      }
    }
  };
  //accept
  // const requestedId = 101;
  // const requesterId = req.body.id;
  // router.put("/accept-request", friends.acceptRequest);
  // router.delete("/decline-request", friends.deleteFriend);

  //delete
  // const userA = 101;
  // const userB = req.body.id;

  // let friendship = await Friend.findOne({
  //   where: {
  //     requestedById: userB,
  //     requestedToId: userA,
  //   },
  // });
  useEffect(() => {
    console.log("use effect");
  }, []);

  return (
    <button
      className={`btn btn-${value}`}
      onClick={() => {
        handleRequest(value);
      }}
    >
      {value ? "Confirm" : "Delete"}
    </button>
  );
};

export default FriendRequestBtn;