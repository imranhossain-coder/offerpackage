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
import axios from "axios";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { useEffect } from "react";

const RefundScreen = ({ route, navigation }) => {
  const Navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [Addblacemodal, setAddblacemodal] = useState();
  const [Addblacemodal2, setAddblacemodal2] = useState();
  const [addbalanceDetails, setaddbalanceDetails] = useState();
  const [Addbalancehistory, setAddbalancehistory] = useState([]);

  const [routes] = React.useState([
    { key: "pending", title: "Pending" },
    { key: "successful", title: "Successful" },
    { key: "fail", title: "Fail" },
  ]);

  const getData = () => {
    axios({
      method: "get",
      url: "https://offerapp.onrender.com/allrefundhistory",
    })
      .then((response) => {
        setAddbalancehistory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Handlerefund = (email, ammount, status, usernumber, time) => {
    axios({
      method: "post",
      url: "https://offerapp.onrender.com/getUserdata",
      data: {
        phone: usernumber,
      },
    })
      .then((response) => {
        axios({
          method: "post",
          url: "https://offerapp.onrender.com/addrefund",
          data: {
            email,
            ammount,
            status,
            currentbalance: response.data.balance,
            time,
          },
        })
          .then(async (res) => {
            Alert.alert("Sucessfully added");
            setAddblacemodal(false);
            getData();
          })
          .catch((error) => {
            Alert.alert("Package not Added");
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const RenderOffer = ({ item }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={styles.singleoffer}
          onPress={() => {
            if (item.status == "successful" || item.status == "fail") {
              setAddblacemodal2(true), setaddbalanceDetails(item);
            } else {
              setaddbalanceDetails(item), setAddblacemodal(true);
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
              REFUND
            </Text>
            <Text style={{ fontSize: 17, marginBottom: 2, letterSpacing: 1 }}>
              {item.time}
            </Text>
            <Text style={{ fontSize: 17, marginBottom: 2, letterSpacing: 1 }}>
              Number: {item.number}
            </Text>

            <Text style={{ fontSize: 17, marginBottom: 2, letterSpacing: 1 }}>
              Status :
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
                }}
              >
                {item.status}
              </Text>
            </Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 23 }}>{item.ammount}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const PendingRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#eceeec" }}>
      <FlatList
        data={Addbalancehistory.filter((elem) => elem.status == "pending")}
        renderItem={RenderOffer}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );

  const SucessfulRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#eceeec" }}>
      <FlatList
        data={Addbalancehistory.filter((elem) => elem.status == "successful")}
        renderItem={RenderOffer}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );
  const FailRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#eceeec" }}>
      <FlatList
        data={Addbalancehistory.filter((elem) => elem.status == "fail")}
        renderItem={RenderOffer}
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Modal
        isVisible={Addblacemodal}
        style={{ alignItems: "center" }}
        onBackdropPress={() => setAddblacemodal(false)}
        onBackButtonPress={() => setAddblacemodal(false)}
      >
        <View style={styles.addbalanceform}>
          <View style={styles.orderdetailcontainer}>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Gmail</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.orderdetailvalue}>
                  {addbalanceDetails?.email}
                </Text>
                <TouchableOpacity
                  onPress={async () =>
                    await Clipboard.setStringAsync(
                      `${addbalanceDetails?.email}`
                    ).finally(() => {
                      ToastAndroid.show(
                        `${addbalanceDetails?.email} copied successfully`,
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
              <Text style={styles.orderdetailvalue}>
                {addbalanceDetails?.paymentnumber}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Time and Date</Text>
              <Text style={styles.orderdetailvalue}>
                {addbalanceDetails?.time}
              </Text>
            </View>

            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Status</Text>
              <Text style={styles.orderdetailvalue}>
                {addbalanceDetails?.status}
              </Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="black"
              placeholder="Enter Ammount"
              style={styles.input}
              defaultValue={addbalanceDetails?.ammount}
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
                  paddingHorizontal: 20,
                  marginTop: 10,
                }}
                onPress={() =>
                  Handlerefund(
                    addbalanceDetails?.email,
                    addbalanceDetails?.ammount,
                    "successful",
                    addbalanceDetails?.usernumber,
                    addbalanceDetails?.time
                  )
                }
              >
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 16 }}
                >
                  Refund
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
                  Handlerefund(
                    addbalanceDetails?.email,
                    addbalanceDetails?.ammount,
                    "fail",
                    addbalanceDetails?.usernumber,
                    addbalanceDetails?.time
                  )
                }
              >
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 16 }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={Addblacemodal2}
        style={{ alignItems: "center" }}
        onBackdropPress={() => setAddblacemodal2(false)}
        onBackButtonPress={() => setAddblacemodal2(false)}
      >
        <View style={[styles.addbalanceform, { height: hp("50%") }]}>
          <View style={styles.orderdetailcontainer}>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Gmail</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.orderdetailvalue}>
                  {addbalanceDetails?.email}
                </Text>
                <TouchableOpacity
                  onPress={async () =>
                    await Clipboard.setStringAsync(
                      `${addbalanceDetails?.email}`
                    ).finally(() => {
                      ToastAndroid.show(
                        `${addbalanceDetails?.email} copied successfully`,
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
              <Text style={styles.orderdetailvalue}>
                {addbalanceDetails?.paymentnumber}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Ammount</Text>
              <Text style={styles.orderdetailvalue}>
                {addbalanceDetails?.ammount}
              </Text>
            </View>

            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Date and time</Text>
              <Text style={styles.orderdetailvalue}>
                {addbalanceDetails?.time}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Status</Text>
              <Text style={styles.orderdetailvalue}>
                {addbalanceDetails?.status}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ flex: 1 }}>
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
            style={{ fontSize: wp("6%"), color: "white", fontWeight: "400" }}
          >
            Refund
          </Text>
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </>
  );
};

export default RefundScreen;

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
    height: hp("70%"),
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
