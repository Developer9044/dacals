import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import fontSize from "../../constants/fontSize";
import colors from "../../constants/colors";
import fontFamily from "../../constants/fontFamily";

const ButtonComp = ({ label, onPress }) => {
  return (
    <View style={{ flex: 1, alignSelf: "center" }}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.ButtonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  button: {
    height: verticalScale(40),
    width: scale(160),
    backgroundColor: colors.back_btn_color,
    borderRadius: 10,
    alignItems: "center",
  },
  ButtonText: {
    fontSize: fontSize.h6,
    color: colors.white,
    fontFamily: fontFamily.BOLD,
    flex: 1,
    textAlignVertical: "center",
  },
});
