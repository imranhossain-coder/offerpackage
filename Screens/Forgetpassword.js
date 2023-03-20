import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Modal from "react-native-modal";
import axios from "axios";
import { useEffect } from "react";

const Forgetpassword = () => {
  const Navigation = useNavigation();
  const [forgetmodal, setforgetmodal] = useState();
  const [forgetpassworddata, setforgetpassworddata] = useState({});
  const [looding, setlooding] = useState(false);
  const [Allrequestpass, setAllrequestpass] = useState([]);

  const [newpassword, setnewpassword] = useState();
  const Handlepassword = async () => {
    setlooding(true);
    axios({
      method: "post",
      url: "https://offerapp.onrender.com/changepassword",
      data: {
        useremail: forgetpassworddata.useremail,
        newpassword,
      },
    })
      .then((response) => {
        Linking.openURL(
          `mailto:${forgetpassworddata.useremail}?subject="Offer App Password Reset"&body=Your Offer App Password Below ${newpassword}`
        );
        setlooding(false);
      })
      .catch((error) => {
        console.log(error);
        setlooding(false);
      });
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "https://offerapp.onrender.com/getchangepass",
    })
      .then((response) => {
        setAllrequestpass(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
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
            Forgetpassword
          </Text>
        </View>

        <View style={styles.wrapper}>
          {Allrequestpass.map((elem, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.forgetpassword}
                onPress={() => {
                  setforgetmodal(true), setforgetpassworddata(elem);
                }}
              >
                <View>
                  <Text
                    style={{ fontSize: 19, color: "green", marginBottom: 2 }}
                  >
                    Forgetpassword Email
                  </Text>
                  <Text style={{ fontSize: 17 }}>{elem.useremail}</Text>
                </View>
                <View>
                  <Text
                    style={{ fontSize: 19, color: "green", marginBottom: 2 }}
                  >
                    Forgetpassword Request Time:
                  </Text>
                  <Text style={{ fontSize: 17 }}>{elem.time}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <Modal
        isVisible={forgetmodal}
        style={{ alignItems: "center" }}
        onBackdropPress={() => setforgetmodal(false)}
        onBackButtonPress={() => setforgetmodal(false)}
      >
        <View
          style={{
            paddingBottom: 50,
            backgroundColor: "#f4f5f3",
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text style={{ fontSize: 20, color: "green" }}>Useremail</Text>
            <Text style={{ fontSize: 18, marginTop: 5 }}>
              {forgetpassworddata?.useremail}
            </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 20, color: "green" }}>
              Enter New Password
            </Text>
            <TextInput
              placeholder="Enter New Password"
              style={{
                paddingHorizontal: 50,
                paddingVertical: 5,
                color: "black",
                marginTop: 10,
                borderColor: "green",
                borderWidth: 1,
              }}
              onChangeText={(text) => setnewpassword(text)}
              placeholderTextColor="black"
            />
          </View>
          {looding == true ? (
            <ActivityIndicator animating={true} color="green" size={20} />
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "green",
                paddingHorizontal: 70,
                paddingVertical: 5,
                marginTop: 20,
                borderRadius: 10,
              }}
              onPress={() => Handlepassword()}
            >
              <Text style={{ fontSize: 17, color: "white" }}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </>
  );
};

export default Forgetpassword;

const styles = StyleSheet.create({
  forgetpassword: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    backgroundColor: "white",
    marginBottom: 10,
  },
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
});
