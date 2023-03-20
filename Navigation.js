import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./Screens/HomeScreen";
import UserDetailsScreen from "./Screens/UserDetailsScreen";
import AddbalanceScreen from "./Screens/AddbalanceScreen";
import AllorderScreen from "./Screens/AllorderScreen";
import AddsliderScreen from "./Screens/AddsliderScreen";
import OfferpackageScreen from "./Screens/OfferpackageScreen";
import AddofferScreen from "./Screens/AddofferScreen";
import AddinfoScreen from "./Screens/AddinfoScreen";
import NoticeaddScreen from "./Screens/NoticeaddScreen";
import SendnotificaionScreen from "./Screens/SendnotificaionScreen";
import OrderlockScreen from "./Screens/OrderlockScreen";
import RefundScreen from "./Screens/RefundScreen";
import Manualaddbalance from "./Screens/Manualaddbalance";
import Forgetpassword from "./Screens/Forgetpassword";

const Stack = createNativeStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: "slide_from_right",
        statusBarStyle: "light",
        statusBarColor: "#006f2d",
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options="hellow" />
      <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
      <Stack.Screen name="AddbalanceScreen" component={AddbalanceScreen} />
      <Stack.Screen name="AllorderScreen" component={AllorderScreen} />
      <Stack.Screen name="AddsliderScreen" component={AddsliderScreen} />
      <Stack.Screen name="OfferpackageScreen" component={OfferpackageScreen} />
      <Stack.Screen name="AddofferScreen" component={AddofferScreen} />
      <Stack.Screen name="AddinfoScreen" component={AddinfoScreen} />
      <Stack.Screen name="NoticeaddScreen" component={NoticeaddScreen} />
      <Stack.Screen name="OrderlockScreen" component={OrderlockScreen} />
      <Stack.Screen name="RefundScreen" component={RefundScreen} />
      <Stack.Screen name="Manualaddbalance" component={Manualaddbalance} />
      <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
      <Stack.Screen
        name="SendnotificaionScreen"
        component={SendnotificaionScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
