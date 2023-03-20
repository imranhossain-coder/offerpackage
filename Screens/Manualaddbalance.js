import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import axios from "axios";

const Manualaddbalance = () => {
  const Navigation = useNavigation();
  const [email, setemail] = useState("");
  const [ammount, setammount] = useState("");
  console.log(ammount);
  const ManualBalance = () => {
    axios({
      method: "post",
      url: "https://offerapp.onrender.com/manualaddbalance",
      data: {
        email,
        ammount,
      },
    })
      .then((response) => {
        Alert.alert("Successfully Added");
        // axios({
        //   method: "post",
        //   url: "https://offerapp.onrender.com/addrefund",
        //   data: {
        //     email,
        //     ammount,
        //     status: "successful",
        //   },
        // })
        //   .then((res) => {
        //     console.log("history added succesfully");
        //   })
        //   .catch((error) => {
        //     Alert.alert("History not added");
        //   });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f4f5" }}>
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
          Manual Add balance
        </Text>
      </View>
      <View style={styles.refundform}>
        <View style={styles.inputcontainer}>
          <View style={styles.singleinput}>
            <Text style={styles.inputtext}>Enter Add balance Email</Text>
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={(text) => setemail(text)}
            />
          </View>
          <View style={styles.singleinput}>
            <Text style={styles.inputtext}>Enter Ammount</Text>
            <TextInput
              onChangeText={(text) => setammount(text)}
              placeholder="Ammount"
              style={styles.input}
              keyboardType="decimal-pad"
            />
          </View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#006f2d",
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => ManualBalance()}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
              Add balance
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Manualaddbalance;

const styles = StyleSheet.create({
  refundform: {
    width: "100%",
    alignItems: "center",
    height: "80%",
    justifyContent: "center",
  },
  inputcontainer: {
    backgroundColor: "white",
    width: "80%",
    paddingTop: 20,
    paddingBottom: 20,
  },
  input: {
    width: "80%",
    paddingVertical: 10,
    marginBottom: 10,
    paddingLeft: 15,
    fontSize: 15,
    borderColor: "#006f2d",
    borderWidth: 1.5,
  },
  inputtext: {
    fontSize: 18,
    marginBottom: 10,
    letterSpacing: 1,
  },
  singleinput: {
    marginBottom: 15,
    marginLeft: 10,
  },
});
