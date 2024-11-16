import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import colors from "../constants/colors";
import fontSize from "../constants/fontSize";
import fontFamily from "../constants/fontFamily";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import SelectedItem from "./SelectedItem";
import { time_period } from "./dropdownData";

const CustomSlidAndTextInput = ({
  slidValue,
  slidOnValueChange,
  inpValue,
  inpOnChangeText,
  minimumValue,
  maximumValue,
  step,
  title,
  isYears,
  selectionData,
  childT,
  timeP,
  setTimeP,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal:
            Platform.OS === "android" ? moderateScale(12) : null,
        }}
      >
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.black,
              fontSize: fontSize.t3,
              fontFamily: fontFamily.REGULAR,
            }}
          >
            {title}
          </Text>
          {isYears && (
            <View
              style={{
                marginStart: moderateScale(10),
                marginTop: moderateScale(3),
              }}
            >
              <SelectedItem
                data={timeP}
                setData={setTimeP}
                dropItem={selectionData ? selectionData : time_period}
                dropDownStyle={{ width: scale(100) }}
              />
            </View>
          )}
        </View>

        {childT === "SIP Calculator" ||
        childT === "Fixed Deposit Calculator" ||
        childT === "PPF Calculator" ||
        childT === "Present Value Calculator" ||
        childT === "Future Value Calculator" ||
        childT === "RD Calculator" ||
        childT === "CAGR Calculator" ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.bgPlaceholder,
              flex: 0.7,
              paddingHorizontal: moderateScale(10),
              borderRadius: scale(4),
            }}
          >
            <TextInput
              style={styles.valueText}
              value={inpValue}
              onChangeText={inpOnChangeText}
              keyboardType="numeric"
            />
            <Text
              style={{
                color: colors.black,
                fontSize: fontSize.t1,
                fontFamily: fontFamily.REGULAR,
                flex: 1,
                textAlign: "right",
              }}
            >
              {title === "Expected Return Rate (p.a)" ||
              title === "Rate of Interest" ||
              title === "Rate of Interest (p.a)"
                ? `%`
                : title === "Time Period"
                ? null
                : `Yr`}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.bgPlaceholder,
              flex: 0.7,
              paddingHorizontal: moderateScale(10),
              borderRadius: scale(4),
            }}
          >
            <Text
              style={{
                color: colors.black,
                fontSize: fontSize.t1,
                fontFamily: fontFamily.EX_LIGHT,
                flex: 1,
              }}
            >
              {isYears ? null : `₹`}
            </Text>
            <TextInput
              style={styles.valueText}
              value={inpValue}
              onChangeText={inpOnChangeText}
              keyboardType="numeric"
            />
          </View>
        )}
      </View>
      <Slider
        style={styles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={slidValue}
        onValueChange={slidOnValueChange}
        minimumTrackTintColor="lightblue"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor={colors.back_btn_color}
      />
    </View>
  );
};

export default CustomSlidAndTextInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    width: "100%",
    height: verticalScale(30),
  },
  valueText: {
    color: colors.black,
    fontSize: fontSize.t2,
    fontFamily: fontFamily.REGULAR,
    flex: 2,
    textAlign: "right",
    height: verticalScale(26),
    paddingVertical: 0,
  },
});
