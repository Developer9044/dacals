import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Linking, Platform } from "react-native";
import { Image, View } from "react-native";
import { scale } from "react-native-size-matters";
import fontFamily from "../constants/fontFamily";
import { SCREEN } from "./RoutesName";
import colors from "../constants/colors";

const CustomDrawerContent = (props) => {
  const openPlayStore = () => {
    const url = "https://www.google.com/";
    const webUrl =
      Platform.OS == "android"
        ? "https://www.google.com/"
        : "https://www.google.com/";

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          // Fallback to web URL if deep link is not supported
          return Linking.openURL(webUrl);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="DASHBOARD"
        onPress={() => props.navigation.navigate(SCREEN.HOME_SCREEN)}
        labelStyle={{ fontFamily: fontFamily.BOLD }}
        style={{ marginVertical: 8 }}
        icon={({ color, size }) => (
          <Image
            style={{ width: scale(22), height: scale(22) }}
            source={require("../assets/drawerIcons/home.png")}
            tintColor={colors.black}
          />
        )}
      />
      <DrawerItem
        label="ABOUT US"
        onPress={() => props.navigation.navigate(SCREEN.PROFILE_SCREEN)}
        labelStyle={{ fontFamily: fontFamily.BOLD }}
        style={{ marginVertical: 8 }}
        icon={({ color, size }) => (
          <Image
            style={{ width: scale(22), height: scale(22) }}
            source={require("../assets/drawerIcons/user.png")}
            tintColor={colors.black}
          />
        )}
      />
      <DrawerItem
        label="RATE US"
        onPress={openPlayStore}
        labelStyle={{ fontFamily: fontFamily.BOLD }}
        style={{ marginVertical: 8 }}
        icon={({ color, size }) => (
          <Image
            style={{ width: scale(22), height: scale(22) }}
            source={require("../assets/drawerIcons/star.png")}
            tintColor={colors.black}
          />
        )}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
