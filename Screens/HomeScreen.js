import { Alert, StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import Header from "../components/Home/Header";
import Homebody from "../components/Home/Homebody";

const HomeScreen = ({ route, navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Header />
      <Homebody
      // allpendingbalance={balanceData}
      // Allpendingorder={Allpendingorder}
      // Allpendingrefund={Allpendingrefund}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
