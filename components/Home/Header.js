import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Fontisto } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerprofile}>
        <View style={styles.headerleftside}>
          <Text
            style={{
              fontSize: wp("6%"),
              fontWeight: "400",
              letterSpacing: 1,
              color: "#343f39",
            }}
          >
            HI ,Ahmed Toshar(Admin)
          </Text>
        </View>

        <View style={styles.headerprofileright}>
          <Image
            source={require("../../assets/appicon.png")}
            style={{ width: 70, height: 70, borderRadius: 50 }}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
  },

  headerprofile: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    paddingVertical: wp("3%"),
    backgroundColor: "#e5f4ed",
  },
  headerprofileright: {
    alignItems: "center",
    justifyContent: "center",
  },
  notice: {
    backgroundColor: "#ebeeed",
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    height: hp("5%"),
    alignItems: "center",
  },
  btnwrapper: {
    flexDirection: "row",
  },
  btn: {
    height: hp("5%"),
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15,
    borderRadius: 20,
  },
  headerleftside: {
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
  },
});
