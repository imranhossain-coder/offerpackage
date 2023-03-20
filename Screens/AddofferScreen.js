import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { useQuery } from "react-query";

const AddofferScreen = ({ route }) => {
  const Navigation = useNavigation();
  const [Offermodal, setOffermodal] = useState();
  const [Offerdetails, setOfferdetails] = useState();
  const [lodding, setlodding] = useState(false);

  const { data: Allpackages = [] } = useQuery(
    ["allpackages"],
    () => getData(),
    { refetchInterval: 1500 }
  );

  const getData = async () => {
    let response = await axios({
      method: "get",
      url: "https://offerapp.onrender.com/getpackages",
    });
    return response.data;
  };

  const DeletePackages = (offertitle) => {
    axios({
      method: "delete",
      url: "https://offerapp.onrender.com/deletepackages",
      data: {
        offertitle,
      },
    })
      .then((response) => {
        Alert.alert("Deleted Package Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PackageSchema = Yup.object().shape({
    offertitle: Yup.string().required("Offertitle is required"),
    offerprice: Yup.string().required("offerprice is required"),
    regularprice: Yup.string().required("regularprice is required"),
    discountprice: Yup.string().required("discountprice is required"),
  });

  const handleSubmit = (
    offertitle,
    offervalidity,
    offerprice,
    regularprice,
    discountprice,
    offernote
  ) => {
    setlodding(true);
    try {
      axios({
        method: "post",
        url: "https://offerapp.onrender.com/addpackage",
        data: {
          offertitle,
          offervalidity,
          offerprice,
          regularprice,
          discountprice,
          offernote,
          packagecompany: route.params.package,
        },
      })
        .then(async (res) => {
          Alert.alert("Sucessfully added");
          setlodding(false);
        })
        .catch((error) => {
          Alert.alert("Package not Added");
          setlodding(false);
        });
    } catch (error) {
      Alert.alert("Package not added");
      setlodding(false);
    }
  };
  const Rendeoffer = ({ item }) => {
    return (
      <View style={styles.singleoffer}>
        <View style={styles.leftside}>
          <Text style={{ fontSize: 19, marginBottom: 5 }}>
            Title: {item.offertitle}
          </Text>
          <Text style={{ fontSize: 19 }}>Price: {item.offerprice}</Text>
        </View>
        <View style={styles.rightside}>
          <TouchableOpacity
            style={styles.iconcontainer}
            onPress={() => {
              setOfferdetails(item), setOffermodal(true);
            }}
          >
            <Feather name="edit" style={styles.icon} size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconcontainer}
            onPress={() => {
              DeletePackages(item.offertitle);
            }}
          >
            <MaterialCommunityIcons
              name="delete"
              style={styles.icon}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <Modal
        isVisible={Offermodal}
        style={{ alignItems: "center" }}
        onBackdropPress={() => setOffermodal(false)}
      >
        <View style={styles.addbalanceform}>
          <Text
            style={{
              fontSize: 22,
              textAlign: "center",
              marginBottom: 20,
              color: "#006f2d",
              fontWeight: "bold",
            }}
          >
            Fill up The Details Below
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="black"
              placeholder="Offer Title"
              style={styles.input}
              defaultValue={Offerdetails?.offertitle}
            />
            <TextInput
              placeholderTextColor="black"
              placeholder="Offer Price"
              style={styles.input}
              defaultValue={Offerdetails?.offerprice}
            />
            <TextInput
              placeholderTextColor="black"
              placeholder="Regular Offer Price"
              style={styles.input}
              defaultValue={Offerdetails?.regularprice}
            />
            <TextInput
              placeholderTextColor="black"
              placeholder="Offer Discount"
              style={styles.input}
              defaultValue={Offerdetails?.discountprice}
            />
            <TextInput
              placeholderTextColor="black"
              placeholder="Offer Note"
              style={styles.input}
              defaultValue={Offerdetails?.offernote}
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
              >
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 16 }}
                >
                  Edit Order
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
            style={{ fontSize: wp("6%"), color: "white", fontWeight: "400" }}
          >
            {route.params.package}
          </Text>
        </View>
        <Formik
          initialValues={{
            offertitle: "",
            offervalidity: "",
            offerprice: "",
            regularprice: "",
            discountprice: "",
            offernote: "",
          }}
          onSubmit={(values) => {
            handleSubmit(
              values.offertitle,
              values.offervalidity,
              values.offerprice,
              values.regularprice,
              values.discountprice,
              values.offernote
            );
          }}
          validationSchema={PackageSchema}
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
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor="black"
                placeholder="Offer Title"
                style={styles.input}
                onChangeText={handleChange("offertitle")}
                onBlur={handleBlur("offertitle")}
                value={values.offertitle}
              />
              <TextInput
                placeholderTextColor="black"
                placeholder="Offer Validity"
                style={styles.input}
                onChangeText={handleChange("offervalidity")}
                onBlur={handleBlur("offervalidity")}
                value={values.offervalidity}
              />
              <TextInput
                placeholderTextColor="black"
                placeholder="Offer Price"
                style={styles.input}
                onChangeText={handleChange("offerprice")}
                onBlur={handleBlur("offerprice")}
                value={values.offerprice}
                keyboardType="decimal-pad"
              />
              <TextInput
                placeholderTextColor="black"
                placeholder="Regular Offer Price"
                style={styles.input}
                onChangeText={handleChange("regularprice")}
                onBlur={handleBlur("regularprice")}
                value={values.regularprice}
                keyboardType="decimal-pad"
              />
              <TextInput
                placeholderTextColor="black"
                placeholder="Offer Discount"
                style={styles.input}
                onChangeText={handleChange("discountprice")}
                onBlur={handleBlur("discountprice")}
                value={values.discountprice}
                keyboardType="decimal-pad"
              />
              <TextInput
                placeholderTextColor="black"
                placeholder="Offer Note"
                style={styles.input}
                onChangeText={handleChange("offernote")}
                onBlur={handleBlur("offernote")}
                value={values.offernote}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  width: "100%",
                  paddingBottom: 10,
                }}
              >
                {lodding == true ? (
                  <ActivityIndicator animating={true} color="green" size={20} />
                ) : (
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#006f2d",
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                    }}
                    onPress={handleSubmit}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        fontSize: 15,
                      }}
                    >
                      ADD PACKAGE
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </Formik>
        <Text style={{ textAlign: "center", marginTop: 5, fontSize: 20 }}>
          {route.params.package} All Packages
        </Text>
        <View style={styles.offercontainer}>
          <FlatList
            data={Allpackages?.filter((elem) => {
              return route.params.package == elem?.packagecompany;
            })}
            renderItem={Rendeoffer}
            keyExtractor={(item, index) => index.toString()}
            style={{ width: "100%" }}
            contentContainerStyle={{ alignItems: "center" }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default AddofferScreen;

const styles = StyleSheet.create({
  input: {
    width: "80%",
    paddingVertical: 6,
    marginBottom: 5,
    paddingLeft: 15,
    fontSize: 15,
    borderColor: "#006f2d",
    borderWidth: 1.5,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#f4f5f4",
    alignItems: "center",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  offercontainer: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  singleoffer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 20,
    marginBottom: 10,
  },

  rightside: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
  },
  iconcontainer: {
    flexDirection: "row",
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#f5f4f5",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginRight: 5,
  },
  icon: {
    color: "green",
  },
  addbalanceform: {
    backgroundColor: "white",
    height: hp("70%"),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  leftside: {
    width: "60%",
  },
});
