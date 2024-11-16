import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";
import colors from "../constants/colors";
import fontSize from "../constants/fontSize";
import fontFamily from "../constants/fontFamily";
import { images } from "../assets";

const CheckBoxCom = ({ title, checkIn, setCheckIn }) => {
  return (
    <Pressable
      onPress={() => setCheckIn(!checkIn)}
      style={styles.modalTextConatainer}
    >
      <View style={{ flex: 0.9 }}>
        <Image
          source={checkIn ? images.check_in : images.check_out}
          style={styles.checkOutIcon}
        />
      </View>
      <View style={{ flex: 9 }}>
        <Text style={styles.modalText}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default CheckBoxCom;

const styles = StyleSheet.create({
  modalTextConatainer: {
    flexDirection: "row",
    marginBottom: moderateVerticalScale(10),
  },
  modalText: {
    color: colors.back_btn_color,
    fontSize: fontSize.t2,
    fontFamily: fontFamily.MEDIUM,
    marginStart: moderateScale(4),
    flex: 1,
  },
  checkIcon: {
    width: scale(26),
    height: scale(27),
  },
  checkOutIcon: {
    width: scale(26),
    height: scale(27),
  },
});
