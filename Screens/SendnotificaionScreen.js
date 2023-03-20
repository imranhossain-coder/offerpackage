import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SendnotificaionScreen = () => {
  const Navigation = useNavigation();

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
          Notification
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            paddingVertical: 50,
            width: "90%",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <View
            style={{
              backgroundColor: "green",
              width: "90%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, color: "white", letterSpacing: 1 }}>
              Notification
            </Text>
          </View>
          <TextInput
            placeholder="Enter Title!"
            placeholderTextColor="black"
            style={{
              borderColor: "green",
              width: "90%",
              height: 45,
              borderWidth: 1,
              marginTop: 25,
              paddingLeft: 10,
              borderRadius: 10,
              fontSize: 17,
            }}
          />
          <TextInput
            placeholder="Enter Message"
            placeholderTextColor="black"
            style={{
              borderColor: "green",
              width: "90%",
              height: 45,
              borderWidth: 1,
              marginTop: 25,
              paddingLeft: 10,
              borderRadius: 10,
              fontSize: 17,
            }}
          />
          <TouchableOpacity
            style={{
              width: "70%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#006f2d",
              height: 40,
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SendnotificaionScreen;

const styles = StyleSheet.create({});
