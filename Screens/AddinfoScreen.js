import {
  Alert,
  ScrollView,
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

import { Formik } from "formik";

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const AddinfoScreen = () => {
  const Navigation = useNavigation();
  const [infodata, setinfodata] = useState(null);

  const getInfo = () => {
    axios({
      method: "get",
      url: "https://offerapp.onrender.com/getinfo",
    })
      .then((response) => {
        setinfodata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (
    bkashnumber,
    rockectnumber,
    nagadnumber,
    whatsapplink,
    youtubelink,
    telegramlink,
    contactphone,
    email
  ) => {
    try {
      axios({
        method: "post",
        url: "https://offerapp.onrender.com/addinfo",
        data: {
          bkashnumber,
          rockectnumber,
          nagadnumber,
          whatsapplink,
          youtubelink,
          telegramlink,
          contactphone,
          email,
        },
      })
        .then(async (res) => {
          Alert.alert("Sucessfully added");
        })
        .catch((error) => {
          Alert.alert("Package not Added");
        });
    } catch (error) {
      Alert.alert("Package not added");
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  if (infodata !== null) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
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
            Add Info Below
          </Text>
        </View>
        <Formik
          initialValues={{
            bkashnumber: infodata?.bkashnumber,
            rockectnumber: infodata?.rockectnumber,
            nagadnumber: infodata?.nagadnumber,
            whatsapplink: infodata?.whatsapplink,
            youtubelink: infodata?.youtubelink,
            telegramlink: infodata?.telegramlink,
            contactphone: infodata?.contactphone,
            email: infodata?.email,
          }}
          onSubmit={(values) => {
            handleSubmit(
              values.bkashnumber,
              values.rockectnumber,
              values.nagadnumber,
              values.whatsapplink,
              values.youtubelink,
              values.telegramlink,
              values.contactphone,
              values.email
            );
          }}
          validateOnMount={true}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <View style={styles.inputcontainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    Bkash Number
                  </Text>
                  <TextInput
                    placeholder="Bkash Number"
                    style={styles.input}
                    onChangeText={handleChange("bkashnumber")}
                    onBlur={handleBlur("bkashnumber")}
                    value={values.bkashnumber}
                    keyboardType="decimal-pad"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    Rocket Number
                  </Text>
                  <TextInput
                    placeholder="Rocket Number"
                    style={styles.input}
                    onChangeText={handleChange("rockectnumber")}
                    onBlur={handleBlur("rockectnumber")}
                    value={values.rockectnumber}
                    keyboardType="decimal-pad"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    Nagad Number
                  </Text>
                  <TextInput
                    placeholder="Nagad Number"
                    style={styles.input}
                    onChangeText={handleChange("nagadnumber")}
                    onBlur={handleBlur("nagadnumber")}
                    value={values.nagadnumber}
                    keyboardType="decimal-pad"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    WhatsApp Link
                  </Text>
                  <TextInput
                    placeholder="WhatsApp Number"
                    style={styles.input}
                    onChangeText={handleChange("whatsapplink")}
                    onBlur={handleBlur("whatsapplink")}
                    value={values.whatsapplink}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    Youtube Link
                  </Text>
                  <TextInput
                    placeholder="Youtube Link"
                    style={styles.input}
                    onChangeText={handleChange("youtubelink")}
                    onBlur={handleBlur("youtubelink")}
                    value={values.youtubelink}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    Telegram Link
                  </Text>
                  <TextInput
                    placeholder="Telegram Link"
                    style={styles.input}
                    onChangeText={handleChange("telegramlink")}
                    onBlur={handleBlur("telegramlink")}
                    value={values.telegramlink}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    Contact Phone
                  </Text>
                  <TextInput
                    placeholder="Enter Contact Phone"
                    style={styles.input}
                    onChangeText={handleChange("contactphone")}
                    onBlur={handleBlur("contactphone")}
                    value={values.contactphone}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    Email
                  </Text>
                  <TextInput
                    placeholder="Enter Email"
                    style={styles.input}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                </View>
              </View>
              <View style={{ width: "100%", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#006f2d",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    marginTop: 10,
                    width: "90%",
                  }}
                  onPress={handleSubmit}
                >
                  <Text
                    style={{ fontWeight: "bold", color: "white", fontSize: 16 }}
                  >
                    Update Info
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    );
  }
};

export default AddinfoScreen;

const styles = StyleSheet.create({
  inputcontainer: {
    marginTop: 20,
  },
  input: {
    paddingVertical: 10,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 17,
    borderBottomColor: "#006f2d",
    borderWidth: 1.5,
    width: wp("55%"),
    borderColor: "white",
    backgroundColor: "white",
  },
});
