import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const OfferpackageScreen = () => {
  const Navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f5f4" }}>
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
        <Text style={{ fontSize: wp("6%"), color: "white", fontWeight: "400" }}>
          Category
        </Text>
      </View>
      <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            Navigation.navigate("AddofferScreen", { package: "Robi" })
          }
        >
          <Text style={styles.catext}>Robi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            Navigation.navigate("AddofferScreen", { package: "Airtel" })
          }
        >
          <Text style={styles.catext}>Airtel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            Navigation.navigate("AddofferScreen", { package: "Grameenphone" })
          }
        >
          <Text style={styles.catext}>Grameenphone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            Navigation.navigate("AddofferScreen", { package: "Banglalink" })
          }
        >
          <Text style={styles.catext}>Banglalink</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OfferpackageScreen;

const styles = StyleSheet.create({
  category: {
    backgroundColor: "white",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    height: hp("10%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 20,
  },
  catext: {
    fontSize: 22,
    color: "green",
  },
});
