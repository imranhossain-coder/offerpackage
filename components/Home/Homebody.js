import {
  Image,
  StyleSheet,
  FlatList,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  FontAwesome,
  Fontisto,
  MaterialIcons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectallpendingbalance,
  selectAllpendingorder,
  selectAllpendingrefund,
  selectAllrequestpass,
} from "./Redux/ReduxHome";
const DATA = [
  {
    title: "Add Balance",
    icon: "money",
    screen: "AddbalanceScreen",
  },
  {
    title: "All Order",
    icon: "shopping-bag",
    screen: "AllorderScreen",
  },
  {
    title: "Offer Package",
    screen: "OfferpackageScreen",
  },
  {
    title: "Order Lock",
    screen: "OrderlockScreen",
    icon: "lock",
  },
  {
    title: "Refund",
    screen: "RefundScreen",
  },
  {
    title: "Manual Balance",
    screen: "Manualaddbalance",
    icon: "credit-card",
  },
  {
    title: "Forget Pasword",
    screen: "Forgetpassword",
    icon: "key",
  },
  {
    title: "Slider Add",
    screen: "AddsliderScreen",
    icon: "sliders",
  },
  {
    title: "Total User",
    icon: "user",
    screen: "UserDetailsScreen",
  },
  {
    title: "Add Info",
    screen: "AddinfoScreen",
  },
  {
    title: "Notice Add",
    screen: "NoticeaddScreen",
  },
  {
    title: "Send Notification",
    screen: "SendnotificaionScreen",
  },
];

const Homebody = () => {
  const navigation = useNavigation();

  const allpendingbalance = useSelector(selectallpendingbalance);
  const Allpendingorder = useSelector(selectAllpendingorder);
  const Allpendingrefund = useSelector(selectAllpendingrefund);
  const Allrequestpass = useSelector(selectAllrequestpass);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.singlebox}
        onPress={() => navigation.navigate(item.screen)}
      >
        {allpendingbalance && item.title == "Add Balance" ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "orange",
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Text>{allpendingbalance}</Text>
          </View>
        ) : Allpendingorder && item.title == "All Order" ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "orange",
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Text>{Allpendingorder}</Text>
          </View>
        ) : Allpendingrefund && item.title == "Refund" ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "orange",
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Text>{Allpendingrefund}</Text>
          </View>
        ) : Allrequestpass && item.title == "Forget Pasword" ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "orange",
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Text>{Allrequestpass}</Text>
          </View>
        ) : null}

        {item.title == "Offer Package" ? (
          <Fontisto
            name="shopping-package"
            style={{ fontSize: wp("6%"), color: "#006f2d" }}
          />
        ) : item.title == "Add Info" ? (
          <MaterialIcons
            name="payment"
            style={{ fontSize: wp("6%"), color: "#006f2d" }}
          />
        ) : item.title == "Notice Add" ? (
          <Entypo
            name="blackboard"
            style={{ fontSize: wp("6%"), color: "#006f2d" }}
          />
        ) : item.title == "Send Notification" ? (
          <AntDesign
            name="notification"
            style={{ fontSize: wp("6%"), color: "#006f2d" }}
          />
        ) : item.title == "Refund" ? (
          <MaterialCommunityIcons
            name="cash-refund"
            style={{ fontSize: wp("6%"), color: "#006f2d" }}
          />
        ) : (
          <FontAwesome
            name={item.icon}
            style={{ fontSize: wp("6%"), color: "#006f2d" }}
          />
        )}

        <Text
          style={{ fontSize: wp("3.5%"), marginTop: 10, fontWeight: "500" }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={{ marginTop: 20, flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-around",
        }}
      />
    </ScrollView>
  );
};

export default Homebody;

const styles = StyleSheet.create({
  singlebox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1faf5",
    height: hp("14%"),
    width: wp("25%"),
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  singlesuggest: {
    backgroundColor: "#f1faf5",
    width: wp("22%"),
    paddingVertical: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
