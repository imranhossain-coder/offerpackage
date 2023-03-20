import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Navigation from "./Navigation";

import axios from "axios";

import { useQuery } from "react-query";

import { useDispatch } from "react-redux";
import {
  setallpendingbalance,
  setAllpendingorder,
  setAllpendingrefund,
  setAllrequestpass,
} from "./components/Home/Redux/ReduxHome";
const App = () => {
  const { data: balanceData = 0 } = useQuery(
    ["balance"],
    () => getBalanceNumber(),
    { refetchInterval: 1500 }
  );
  const { data: Allpendingorder = 0 } = useQuery(
    ["pendingorder"],
    () => getpendingorder(),
    { refetchInterval: 1500 }
  );
  const { data: Allpendingrefund = 0 } = useQuery(
    ["pendingrefund"],
    () => getpendingrefund(),
    { refetchInterval: 1500 }
  );
  const { data: Allrequestpass = 0 } = useQuery(
    ["allrequestpass"],
    () => getallreqestpass(),
    { refetchInterval: 1500 }
  );

  const dispatch = useDispatch();

  const getBalanceNumber = async () => {
    let response = await axios({
      method: "get",
      url: "https://offerapp.onrender.com/getpendingaddbalance",
    });

    dispatch(setallpendingbalance(response.data));

    return response.data;
  };
  const getallreqestpass = async () => {
    let response = await axios({
      method: "get",
      url: "https://offerapp.onrender.com/getpendingpassrequest",
    });

    dispatch(setAllrequestpass(response.data));

    return response.data;
  };

  const getpendingorder = async () => {
    const response = await axios({
      method: "get",
      url: "https://offerapp.onrender.com/getpendingorder",
    });

    dispatch(setAllpendingorder(response.data));
    return response.data;
  };
  const getpendingrefund = async () => {
    const response = await axios({
      method: "get",
      url: "https://offerapp.onrender.com/getpendingrefund",
    });

    dispatch(setAllpendingrefund(response.data));
    return response.data;
  };

  return <Navigation />;
};

export default App;
