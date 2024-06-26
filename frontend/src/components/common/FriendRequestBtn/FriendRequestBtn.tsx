import React, { useEffect, useState } from "react";

import "./FriendRequestBtn.css";
import { RequestProfile } from "../../../models/RequestProfile";
import axios from "axios";
import useAxiosToken from "../../../hooks/useAxiosToken";

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
  const axiosToken = useAxiosToken();
  const handleRequest = (result: boolean) => {
    const body = {
      id: friendId,
    };
    if (value) {
      try {
        axiosToken
          //  router.put("/accept-request", friends.acceptRequest);
          .put(`${process.env.REACT_APP_HOST_URL}/friends/accept-request`, body)
          .then((response: any) => {
            returnNewFriend(null);
          })
          .catch((error: any) => {
            console.log(error);
          });
      } catch (error: any) {
        console.error("Error during login:", error.message);
        alert("An error occurred during login. Please try again.");
      }
    } else {
      try {
        axiosToken
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
