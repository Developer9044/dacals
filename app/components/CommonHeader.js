import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import FontSize from "../constants/fontSize";
import colors from "../constants/colors";
import fontFamily from "../constants/fontFamily";
import FastImage from "react-native-fast-image";
import { images } from "../assets";
import spacing from "../constants/spacing";
import { useNavigation } from "@react-navigation/native";
import { SCREEN } from "../navigations/RoutesName";

const CommonHomeHeader = ({
  handleGoBack,
  screen_name,
  handleSearchPress,
  topContainer,
}) => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={handleGoBack}
      style={[styles.topContainer, topContainer]}
    >
      <View
        style={[
          {
            marginTop:
              Platform.OS === "ios" ? verticalScale(36) : verticalScale(4),
          },
          styles.headerContainer,
        ]}
      >
        <Pressable onPress={() => navigation.toggleDrawer()}>
          <FastImage
            source={images.menu}
            style={styles.menuImgStyle}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Pressable>

        <Text
          style={{
            fontSize: FontSize.h5,
            color: colors.textPrimary,
            fontFamily: fontFamily.MEDIUM,
          }}
        >
          {screen_name}
        </Text>
        <Pressable onPress={handleSearchPress}>
          <FastImage
            source={images.searchIcon}
            style={styles.searchImgStyle}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default CommonHomeHeader;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: colors.headerColor,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.s14,
    paddingVertical: spacing.s6,
  },

  backImgStyle: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  addComContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuImgStyle: {
    width: scale(22),
    height: scale(22),
  },
  searchImgStyle: {
    width: scale(28),
    height: scale(28),
  },
});
