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

const CommanBackHeader = ({ handleGoBack, screen_name, topContainer }) => {
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
        <Pressable
          style={{ marginEnd: moderateScale(10) }}
          onPress={() => navigation.goBack()}
        >
          <FastImage
            source={images.back}
            style={styles.backImgStyle}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Pressable>

        <Text
          style={{
            fontSize: FontSize.h6,
            color: colors.textPrimary,
            fontFamily: fontFamily.MEDIUM,
          }}
        >
          {screen_name}
        </Text>
      </View>
    </Pressable>
  );
};

export default CommanBackHeader;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: colors.bgPlaceholder,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.s6,
    paddingVertical: spacing.s6,
  },

  backImgStyle: {
    height: moderateScale(30),
    width: moderateScale(30),
  },
});
