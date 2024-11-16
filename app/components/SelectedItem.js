import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";
import { moderateScale, scale } from "react-native-size-matters";
import fontFamily from "../constants/fontFamily";
import fontSize from "../constants/fontSize";
import colors from "../constants/colors";

const SelectedItem = (
  { dropItem, placeholder, data, setData, dropDownStyle },
  _props
) => {
  return (
    <View
      style={[
        {
          marginBottom: moderateScale(10),
          justifyContent: "center",
        },
        dropDownStyle,
      ]}
    >
      {placeholder ? (
        <Text style={styles.selecteTitle}>{placeholder}</Text>
      ) : null}
      <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        // imageStyle={styles.imageStyle}
        selectedTextProps={{ numberOfLines: 1 }}
        containerStyle={{ backgroundColor: colors.white }}
        iconStyle={styles.iconStyle}
        value={data}
        data={dropItem}
        valueField="value"
        labelField="lable"
        imageField="image"
        placeholder={data}
        searchPlaceholder="Search..."
        onChange={(e) => {
          setData(e.lable);
        }}
      />
    </View>
  );
};

export default SelectedItem;

const styles = StyleSheet.create({
  dropdown: {
    paddingHorizontal: moderateScale(4),
    justifyContent: "center",
    backgroundColor: colors.bgPlaceholder,
    borderRadius: scale(3),
    paddingVertical: moderateScale(4),
  },
  imageStyle: {
    width: scale(20),
    height: scale(20),
    borderRadius: 2,
  },
  placeholderStyle: {
    fontSize: fontSize.t4,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.7)",
    paddingStart: moderateScale(4),
  },
  selectedTextStyle: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.7)",
  },
  iconStyle: {
    width: scale(20),
    height: scale(20),
  },
  selecteTitle: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.9)",
    marginBottom: moderateScale(4),
  },
});
