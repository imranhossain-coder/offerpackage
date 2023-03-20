import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  TextInput,
  ToastAndroid,
  Alert,
} from "react-native";
import React from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { useQuery } from "react-query";

import axios from "axios";

const AllorderScreen = () => {
  const Navigation = useNavigation();

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [Ordermodal, setOrdermodal] = useState();
  const [Ordermodal2, setOrdermodal2] = useState();
  const [OrderDetails, setOrderDetails] = useState({});

  const { data: allorderhistory = [] } = useQuery(
    ["orderhistory"],
    () => getData(),
    { refetchInterval: 1500 }
  );

  const [routes] = React.useState([
    { key: "pending", title: "Pending" },
    { key: "successful", title: "Successful" },
    { key: "fail", title: "Fail" },
  ]);

  const getData = async () => {
    let response = await axios({
      method: "get",
      url: "https://offerapp.onrender.com/allorderhistory",
    });

    return response.data;
  };

  const Handleorder = (email, time, status, ammount) => {
    axios({
      method: "post",
      url: "https://offerapp.onrender.com/getUserdata",
      data: {
        phone: OrderDetails?.usernumber,
      },
    })
      .then((response) => {
        axios({
          method: "post",
          url: "https://offerapp.onrender.com/acceptorder",
          data: {
            email,
            time,
            status,
            ammount,
            currentbalance: response.data.balance,
          },
        })
          .then((response) => {
            Alert.alert("Sucessfully added");
            setOrdermodal(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const RenderOrder = ({ item }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={styles.singleoffer}
          onPress={() => {
            if (item.status == "successful" || item.status == "fail") {
              setOrderDetails(item), setOrdermodal2(true);
            } else {
              setOrderDetails(item), setOrdermodal(true);
            }
          }}
        >
          <View style={{ width: "90%" }}>
            <Text
              style={{
                fontSize: 17,
                marginBottom: 2,
                letterSpacing: 1,
                color: "green",
              }}
            >
              OFFER ORDER
            </Text>
            <Text style={{ fontSize: 17, marginBottom: 2, letterSpacing: 1 }}>
              {item.time}
            </Text>
            <Text style={{ fontSize: 17, marginBottom: 2, letterSpacing: 1 }}>
              {item.packagetitle}
            </Text>

            <Text
              style={{
                color:
                  item.status == "successful"
                    ? "green"
                    : item.status == "pending"
                    ? "orange"
                    : item.status == "fail"
                    ? "red"
                    : null,
                fontSize: 17,
              }}
            >
              Status :{item.status}
            </Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 23 }}>{item.packageprice}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const PendingRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#eceeec" }}>
      <FlatList
        data={allorderhistory.filter((elem) => elem.status == "pending")}
        renderItem={RenderOrder}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );

  const SucessfulRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#eceeec" }}>
      <FlatList
        data={allorderhistory.filter((elem) => elem.status == "successful")}
        renderItem={RenderOrder}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );
  const FailRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#eceeec" }}>
      <FlatList
        data={allorderhistory.filter((elem) => elem.status == "fail")}
        renderItem={RenderOrder}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );

  const renderScene = SceneMap({
    pending: PendingRoute,
    successful: SucessfulRoute,
    fail: FailRoute,
  });

  return (
    <>
      <Modal
        isVisible={Ordermodal}
        style={{ alignItems: "center" }}
        onBackdropPress={() => setOrdermodal(false)}
        onBackButtonPress={() => setOrdermodal(false)}
      >
        <View style={styles.addbalanceform}>
          <View style={styles.orderdetailcontainer}>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Gmail</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.orderdetailvalue}>
                  {OrderDetails?.email}
                </Text>
                <TouchableOpacity
                  onPress={async () =>
                    await Clipboard.setStringAsync(
                      `${OrderDetails?.email}`
                    ).finally(() => {
                      ToastAndroid.show(
                        `${OrderDetails?.email} copied successfully`,
                        2000
                      );
                    })
                  }
                >
                  <AntDesign
                    name="copy1"
                    size={25}
                    style={{ marginLeft: 20 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Phone Number</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.orderdetailvalue}>
                  {OrderDetails?.offernumber}
                </Text>
                <TouchableOpacity
                  onPress={async () =>
                    await Clipboard.setStringAsync(
                      `${OrderDetails?.number}`
                    ).finally(() => {
                      ToastAndroid.show(
                        `${OrderDetails?.number} copied successfully`,
                        2000
                      );
                    })
                  }
                >
                  <AntDesign
                    name="copy1"
                    size={25}
                    style={{ marginLeft: 20 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Offer Title</Text>
              <Text style={styles.orderdetailvalue}>
                {OrderDetails?.packagetitle}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Offer Validity</Text>
              <Text style={styles.orderdetailvalue}>
                {OrderDetails?.offervalidity}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Offer Note</Text>
              <Text style={styles.orderdetailvalue}>
                {OrderDetails?.offernote}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Status</Text>
              <Text style={styles.orderdetailvalue}>
                {OrderDetails?.status}
              </Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="black"
              placeholder="Enter Ammount"
              style={styles.input}
              defaultValue={OrderDetails?.packageprice}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#006f2d",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  marginTop: 10,
                }}
                onPress={() =>
                  Handleorder(
                    OrderDetails?.email,
                    OrderDetails?.time,
                    "successful",
                    OrderDetails?.packageprice,
                    OrderDetails?.usernumber
                  )
                }
              >
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 15 }}
                >
                  ACCEPT ORDER
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#006f2d",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                }}
                onPress={() =>
                  Handleorder(
                    OrderDetails?.email,
                    OrderDetails?.time,
                    "fail",
                    OrderDetails?.packageprice,
                    OrderDetails?.usernumber
                  )
                }
              >
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 15 }}
                >
                  CANCEL ORDER
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={Ordermodal2}
        style={{ alignItems: "center" }}
        onBackdropPress={() => setOrdermodal2(false)}
        onBackButtonPress={() => setOrdermodal2(false)}
      >
        <View style={styles.addbalanceform}>
          <View style={styles.orderdetailcontainer}>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Gmail</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.orderdetailvalue}>
                  {OrderDetails?.email}
                </Text>
                <TouchableOpacity
                  onPress={async () =>
                    await Clipboard.setStringAsync(
                      `${OrderDetails?.email}`
                    ).finally(() => {
                      ToastAndroid.show(
                        `${OrderDetails?.email} copied successfully`,
                        2000
                      );
                    })
                  }
                >
                  <AntDesign
                    name="copy1"
                    size={25}
                    style={{ marginLeft: 20 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Phone Number</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.orderdetailvalue}>
                  {OrderDetails?.usernumber}
                </Text>
                <TouchableOpacity
                  onPress={async () =>
                    await Clipboard.setStringAsync(
                      `${OrderDetails?.transactionid}`
                    ).finally(() => {
                      ToastAndroid.show(
                        `${OrderDetails?.transactionid} copied successfully`,
                        2000
                      );
                    })
                  }
                >
                  <AntDesign
                    name="copy1"
                    size={25}
                    style={{ marginLeft: 20 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Date and time</Text>
              <Text style={styles.orderdetailvalue}>{OrderDetails?.time}</Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Offer Tilte</Text>
              <Text style={styles.orderdetailvalue}>
                {OrderDetails?.packagetitle}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Offer Note</Text>
              <Text style={styles.orderdetailvalue}>
                {OrderDetails?.offernote}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Status</Text>
              <Text style={styles.orderdetailvalue}>
                {OrderDetails?.status}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 10,
            zIndex: 9999,
            marginLeft: 10,
          }}
          onPress={() => Navigation.goBack()}
        >
          <AntDesign name="arrowleft" color="white" size={30} />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#096b39",
            height: hp("7%"),
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: wp("5.5%"), color: "white", fontWeight: "400" }}
          >
            Orders
          </Text>
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
};

export default AllorderScreen;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  singleoffer: {
    paddingVertical: 10,
    backgroundColor: "white",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addbalanceform: {
    backgroundColor: "white",
    height: hp("75%"),
    width: "100%",
    justifyContent: "center",
    paddingLeft: 20,
  },
  input: {
    width: "85%",
    paddingVertical: 10,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 17,
    borderColor: "#006f2d",
    borderWidth: 1.5,
  },
  inputContainer: {
    width: "90%",
  },
  orderdetailcontainer: {
    marginBottom: 20,
  },
  orderdetailtitle: {
    fontSize: 17,
    color: "green",
    fontWeight: "bold",
  },
  orderdetailvalue: {
    fontSize: 18,
  },
  singledetailorder: {
    marginVertical: 5,
  },
});
