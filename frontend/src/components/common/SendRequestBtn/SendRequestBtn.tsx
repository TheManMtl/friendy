import React, { useEffect, useState } from "react";

import "./SendRequestBtn.css";
import useAxiosToken from "../../../hooks/useAxiosToken";

type SendRequestBtnProps = {};

const SendRequestBtn: React.FC<SendRequestBtnProps> = ({}) => {
  const axiosToken = useAxiosToken();

  return <button>clickme</button>;
};

export default SendRequestBtn;
