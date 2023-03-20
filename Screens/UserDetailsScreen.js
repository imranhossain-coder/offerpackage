import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { EvilIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import { useEffect } from "react";
import axios from "axios";

const UserDetailsScreen = () => {
  const [usermodals, setusermodals] = useState(false);
  const [UserDetails, setUserDetails] = useState();
  const [Userdata, setUserdata] = useState([]);
  const [phone, setphone] = useState(null);

  const getAlluserdata = () => {
    axios({
      method: "get",
      url: "https://offerapp.onrender.com/getalluser",
    })
      .then((response) => {
        setUserdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlesearch = () => {
    if (phone.length == 0) {
      getAlluserdata();
    } else {
      axios({
        method: "post",
        url: "https://offerapp.onrender.com/searchuser",
        data: {
          phone,
        },
      })
        .then((response) => {
          setUserdata(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const Renderuserdetail = ({ item }) => {
    return (
      <View style={styles.singleuser}>
        <TouchableOpacity
          style={{
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 4,
            position: "absolute",
            right: 10,
            top: 10,
            backgroundColor: "#f4f5f4",
            borderRadius: 50,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setUserDetails(item);
            setusermodals(true);
          }}
        >
          <AntDesign name="right" color="green" size={25} />
        </TouchableOpacity>

        <View style={styles.leftside}>
          <View style={styles.singledata}>
            <Text style={styles.ptag}>Name:</Text>
            <Text style={styles.pval}>{item.name}</Text>
          </View>

          <View style={styles.singledata}>
            <Text style={styles.ptag}>Phone Number: </Text>
            <Text style={styles.pval}>{item.phone}</Text>
          </View>
          <View style={styles.singledata}>
            <Text style={styles.ptag}>Available Balance:</Text>
            <Text style={styles.pval}>{item.balance}</Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getAlluserdata();
  }, []);
  const initialValue = 0;

  const total = Userdata?.reduce(
    (accumulator, current) => accumulator + +current.balance,
    initialValue
  );

  return (
    <>
      <Modal
        isVisible={usermodals}
        style={{ alignItems: "center" }}
        onBackdropPress={() => setusermodals(false)}
      >
        <View
          style={{ backgroundColor: "white", height: hp("55%"), width: "95%" }}
        >
          <View style={styles.orderdetailcontainer}>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Name</Text>
              <Text style={styles.orderdetailvalue}>{UserDetails?.name}</Text>
            </View>

            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Email</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: 10,
                }}
              >
                <Text style={styles.orderdetailvalue}>
                  {UserDetails?.email}
                </Text>
                <TouchableOpacity
                  onPress={async () =>
                    await Clipboard.setStringAsync(
                      `${UserDetails?.email}`
                    ).finally(() => {
                      ToastAndroid.show(
                        `${UserDetails?.email} copied successfully`,
                        2000
                      );
                    })
                  }
                >
                  <AntDesign name="copy1" size={30} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Phone Number</Text>
              <Text style={styles.orderdetailvalue}>{UserDetails?.phone}</Text>
            </View>

            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Available Money</Text>
              <Text style={styles.orderdetailvalue}>
                {UserDetails?.balance}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Password</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: 10,
                }}
              >
                <Text style={styles.orderdetailvalue}>
                  {UserDetails?.password}
                </Text>
                <TouchableOpacity
                  onPress={async () =>
                    await Clipboard.setStringAsync(
                      `${UserDetails?.password}`
                    ).finally(() => {
                      ToastAndroid.show(
                        `${UserDetails?.password} copied successfully`,
                        2000
                      );
                    })
                  }
                >
                  <AntDesign name="copy1" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: wp("4.5%") }}>Total Available User</Text>
            <View style={{ flexDirection: "row" }}>
              <EvilIcons name="user" size={40} color="#006f2d" />
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              >
                {Userdata.length}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: wp("4.5%") }}>Total Available Coin</Text>
            <View style={{ flexDirection: "row" }}>
              <EvilIcons name="credit-card" size={40} color="#006f2d" />
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              >
                {total}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "100%", marginTop: 10, alignItems: "center" }}>
          <Text style={{ marginBottom: 10, fontSize: 16 }}>
            Search User from Bottom Search
          </Text>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <TextInput
              placeholder="Enter User Phone"
              style={{
                width: "70%",
                paddingVertical: 8,
                paddingLeft: 15,
                backgroundColor: "#006f2d",
                borderColor: "gray",
                borderWidth: 1,
                fontSize: 15,
                color: "white",
              }}
              placeholderTextColor="white"
              onChangeText={(text) => setphone(text)}
            />
            <TouchableOpacity
              style={{
                width: "10%",
                backgroundColor: "#006f2d",
                paddingVertical: 14,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => handlesearch()}
            >
              <FontAwesome
                name="search"
                style={{ fontSize: 17, color: "white" }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 0,
            paddingHorizontal: 5,
          }}
        >
          <FlatList
            data={Userdata}
            renderItem={Renderuserdetail}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ marginTop: 10 }}
          />
        </View>
      </View>
    </>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    paddingVertical: hp("2%"),
    justifyContent: "space-around",
    backgroundColor: "#f1faf5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: "row",
  },
  singleuser: {
    paddingVertical: 5,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: 15,
  },
  leftside: {
    paddingVertical: 5,
  },

  ptag: {
    fontSize: 17,
    marginRight: 5,
    color: "black",
  },
  singledata: {
    flexDirection: "row",
    marginBottom: 5,

    alignItems: "center",
    paddingLeft: 20,
  },
  pval: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  orderdetailcontainer: {
    justifyContent: "center",
    height: "100%",
    paddingLeft: 20,
  },
  orderdetailtitle: {
    fontSize: 17,
    color: "green",
    fontWeight: "bold",
  },
  orderdetailvalue: {
    fontSize: 16,
  },
  singledetailorder: {
    marginVertical: 5,
  },
});
