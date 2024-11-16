import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, scale } from "react-native-size-matters";
import { Switch } from "react-native-paper";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import colors from "../../constants/colors";

const SwitchComp = ({ value, onValueChange, text1, topbutton, text2 }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {topbutton ? (
        <Text style={[styles.TopText, { marginRight: scale(10) }]}>
          {text1}
        </Text>
      ) : (
        <Text style={[styles.TopText, { marginRight: scale(10) }]}>
          Imperial
        </Text>
      )}

      <Switch
        value={value}
        trackColor={{ true: colors.back_btn_color }}
        onValueChange={onValueChange}
      />
      {topbutton ? (
        <Text style={[styles.TopText, { marginLeft: scale(10) }]}>{text2}</Text>
      ) : (
        <Text style={[styles.TopText, { marginLeft: scale(10) }]}>Metric</Text>
      )}
    </View>
  );
};

export default SwitchComp;

const styles = StyleSheet.create({
  TopText: {
    color: colors.back_btn_color,
    fontSize: fontSize.t1,
    fontFamily: fontFamily.MEDIUM,
    marginTop: moderateScale(4),
  },
});
