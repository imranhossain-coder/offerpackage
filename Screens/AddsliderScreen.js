import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AddsliderScreen = () => {
  const Navigation = useNavigation();
  const [Sliders, setSliders] = useState([]);
  const [imgurl, setimgurl] = useState(null);
  const [imglink, setimglink] = useState(null);
  const getInfo = () => {
    axios({
      method: "get",
      url: "https://offerapp.onrender.com/getsliders",
    })
      .then((response) => {
        setSliders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Addslider = () => {
    axios({
      method: "post",
      url: "https://offerapp.onrender.com/addslider",
      data: {
        imgurl,
        imglink,
      },
    })
      .then((response) => {
        Alert.alert("Slider Add Successfully");
        getInfo();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteSlider = (_id) => {
    axios({
      method: "post",
      url: "https://offerapp.onrender.com/deleteslider",
      data: {
        _id,
      },
    })
      .then((response) => {
        Alert.alert("Slider Delete Successfully");
        getInfo();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f4f5f4" }}>
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
          Add slider
        </Text>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        {Sliders?.map((elem, index) => {
          return (
            <View
              style={{
                width: "90%",
                backgroundColor: "white",
                height: hp("20%"),
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
              key={index}
            >
              <Image
                source={{ uri: elem.imgurl }}
                style={{ width: "100%", height: "100%" }}
              />
              <TouchableOpacity
                style={{
                  zIndex: 999,
                  position: "absolute",
                  right: 10,
                  top: 0,
                }}
                onPress={() => DeleteSlider(elem._id)}
              >
                <Entypo name="circle-with-cross" color="green" size={30} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 25,
          backgroundColor: "white",
          paddingVertical: 20,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Add New Slider</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="black"
            placeholder="Image Url"
            style={styles.input}
            onChangeText={(text) => setimgurl(text)}
          />
          <TextInput
            placeholderTextColor="black"
            placeholder="Youtube/Blog Link"
            style={styles.input}
            onChangeText={(text) => setimglink(text)}
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
              onPress={() => Addslider()}
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 16 }}
              >
                ADD SLIDER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddsliderScreen;
const styles = StyleSheet.create({
  input: {
    width: "100%",
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
});
