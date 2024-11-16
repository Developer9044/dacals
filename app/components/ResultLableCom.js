import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, scale } from "react-native-size-matters";
import fontSize from "../constants/fontSize";
import fontFamily from "../constants/fontFamily";
import colors from "../constants/colors";
import { images } from "../assets";

const ResultLableCom = ({ result, lable, resContainerStyle, resContainer }) => {
  return (
    <View
      style={[
        {
          flex: 1,
          marginBottom: moderateScale(10),
        },
        resContainerStyle,
      ]}
    >
      {lable && (
        <Pressable style={styles.lableContainer}>
          <Text style={styles.lableStyle}>{lable}</Text>
          <Image
            source={images.info}
            style={{
              width: scale(16),
              height: scale(16),
              marginStart: moderateScale(4),
            }}
            resizeMode="contain"
            tintColor={colors.lightBlack}
          />
        </Pressable>
      )}

      <View style={[styles.resultContainer, resContainer]}>
        <Image
          source={images.rupee}
          style={{
            width: scale(14),
            height: scale(14),
            marginEnd: moderateScale(4),
          }}
          resizeMode="contain"
          tintColor={colors.back_btn_color}
        />
        <Text style={styles.resLableStyle}>{result}</Text>
      </View>
    </View>
  );
};

export default ResultLableCom;

const styles = StyleSheet.create({
  lableContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(4),
  },
  lableStyle: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.9)",
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(4),
    backgroundColor: colors.bgPlaceholder,
    paddingHorizontal: moderateScale(4),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(4),
  },
  resLableStyle: {
    fontSize: fontSize.t2,
    fontFamily: fontFamily.MEDIUM,
    color: colors.back_btn_color,
  },
});
