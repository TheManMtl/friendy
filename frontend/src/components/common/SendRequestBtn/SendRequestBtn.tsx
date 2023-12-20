import React, { useEffect, useState } from "react";

import "./SendRequestBtn.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { axiosToken } from "../../../services/api/axios";

type SendRequestBtnProps = {
  styles: string;
  request: () => void;
  userId: number;
};

const SendRequestBtn: React.FC<SendRequestBtnProps> = ({
  styles,
  request,
  userId,
}) => {
  const axiosToken = useAxiosToken();
  const sendRequest = () => {
    const body = { id: userId };
    axiosToken
      .post(`${process.env.REACT_APP_HOST_URL}/friends/request`, body)
      .then((response: any) => {
        request();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <button className={`${styles}`} onClick={sendRequest}>
      Add Friend
    </button>
  );
};

export default SendRequestBtn;
