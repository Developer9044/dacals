import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Slider from "@react-native-community/slider";
import colors from "../../constants/colors";
import fontFamily from "../../constants/fontFamily";
import fontSize from "../../constants/fontSize";

const CalculatorComp = ({
  onChangeText,
  inpValue,
  minimumValue,
  maximumValue,
  onValueChange,
  label,
  slideContainerStyle,
  slidValue,
  step,
  error_msg,
  calculateErro,
}) => {
  return (
    <View style={[styles.container, slideContainerStyle]}>
      {/* ***************************************Minimum maximum value*********************** */}

      {/* <View style={styles.inputRow}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          onChangeText={onChangeText}
          value={inpValue}
          style={styles.input}
          keyboardType="numeric"
          editable={true}
        />
      </View> */}

      <View style={styles.sliderLabels}>
        <Text style={styles.minimumValue}>{minimumValue}</Text>
        <Text style={styles.minimumValue}>{maximumValue}</Text>
      </View>

      {/* ***************************************Slider*********************** */}

      <Slider
        style={styles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={slidValue}
        onValueChange={onValueChange}
        minimumTrackTintColor="lightblue"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor={colors.back_btn_color}
      />

      {/* **********************TEXTBOX******************** */}

      <View style={styles.inputRow}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          onChangeText={onChangeText}
          value={inpValue}
          style={styles.input}
          keyboardType="numeric"
          editable={true}
        />
      </View>

      {/* ***************************************Error*********************** */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal:
            Platform.OS === "android" ? moderateScale(12) : null,
        }}
      >
        {error_msg && (
          <Text
            style={{
              color: colors.danger,
              fontSize: fontSize.t4,
              marginLeft: 2.0,
              marginTop: 2,
              marginBottom: -1,
              fontFamily: fontFamily.REGULAR,
            }}
          >
            {error_msg}
          </Text>
        )}
      </View>

      {calculateErro && (
        <Text
          style={{
            color: colors.danger,
            fontSize: fontSize.t4,
            marginLeft: 2.0,
            marginTop: 2,
            marginBottom: -1,
            fontFamily: fontFamily.REGULAR,
            alignSelf: "center",
          }}
        >
          {calculateErro}
        </Text>
      )}
    </View>
  );
};

export default CalculatorComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Platform.OS === "android" ? moderateScale(12) : null,
  },
  label: {
    flex: 1.8,
    color: colors.black,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
  },
  input: {
    color: colors.black,
    fontSize: fontSize.t2,
    fontFamily: fontFamily.REGULAR,
    flex: 2,
    textAlign: "right",
    height: verticalScale(26),
    paddingVertical: 0,
    backgroundColor: colors.bgPlaceholder,
    flex: 1,
    paddingHorizontal: moderateScale(6),
    borderRadius: scale(4),
  },
  slider: {
    width: "100%",
    height: verticalScale(30),
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(5),
    paddingHorizontal: Platform.OS === "android" ? moderateScale(12) : null,
  },
  minimumValue: {
    color: colors.black,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
  },
});
