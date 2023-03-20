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
import { useEffect } from "react";
import { Fontisto } from "@expo/vector-icons";

const OrderlockScreen = () => {
  const Navigation = useNavigation();
  const [locknote, setlocknote] = useState(null);
  const [orderlockstatus, setorderlockstatus] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const Getorderlock = async () => {
    axios({
      method: "get",
      url: "https://offerapp.onrender.com/getorderlock",
    })
      .then((response) => {
        setorderlockstatus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const LockOrder = () => {
    axios({
      method: "post",
      url: "https://offerapp.onrender.com/orderlock",
      data: {
        lockstatus: toggleCheckBox,
        locknote,
      },
    })
      .then((response) => {
        Alert.alert("Order Lock changed Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Getorderlock();
  }, []);

  return (
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
          Order Lock
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          height: "90%",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => {
              setToggleCheckBox(!toggleCheckBox);
            }}
          >
            <Fontisto
              name={
                toggleCheckBox == true ? "checkbox-active" : "checkbox-passive"
              }
              size={30}
              color="green"
            />
          </TouchableOpacity>

          <Text style={{ fontSize: 18, width: "70%" }}>
            Lock/Unlock Offer Package For Break Time
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            width: "100%",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {orderlockstatus?.lockstatus == "true" ? "Activated" : "Deactivated"}
        </Text>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            placeholder="Offer Lock Note"
            style={{
              width: 300,
              height: 50,
              paddingLeft: 10,
              borderColor: "green",
              borderWidth: 1,
              fontSize: 20,
            }}
            defaultValue={orderlockstatus?.locknote}
            onChangeText={(text) => setlocknote(text)}
          />
        </View>
        <TouchableOpacity
          style={{
            width: "80%",
            backgroundColor: "#006f2d",
            height: 45,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => LockOrder()}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderlockScreen;

const styles = StyleSheet.create({});
