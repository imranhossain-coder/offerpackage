import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const NoticeaddScreen = () => {
  const Navigation = useNavigation();
  const [notice, setnotice] = useState();

  const Addnotice = () => {
    axios({
      method: "post",
      url: "https://offerapp.onrender.com/addnotice",
      data: {
        notice,
      },
    })
      .then((response) => {
        Alert.alert("Notice Add Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getNotice = () => {
    axios({
      method: "get",
      url: "https://offerapp.onrender.com/getnotice",
    })
      .then((response) => {
        setnotice(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNotice();
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
          Add Notice
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
              Notice
            </Text>
          </View>
          <TextInput
            placeholder="Notice"
            placeholderTextColor="black"
            style={{
              borderColor: "green",
              width: "90%",
              height: 80,
              borderWidth: 1,
              marginTop: 25,
              paddingLeft: 10,
              borderRadius: 10,
              fontSize: 17,
            }}
            defaultValue={notice?.notice}
            onChangeText={(text) => setnotice(text)}
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
            onPress={() => Addnotice()}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NoticeaddScreen;

const styles = StyleSheet.create({});
