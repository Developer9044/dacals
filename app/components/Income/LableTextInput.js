import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import colors from "../../constants/colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { images } from "../../assets";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";

const LableTextInput = ({
  title,
  value,
  onChangeText,
  placeholderTextColor,
  keyboardType,
  placeholder,
  editable,
  maxLength,
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: moderateScale(12),
      }}
    >
      <Text style={styles.lableText}>{title}</Text>
      <View
        style={{
          flex: 1.2,
          backgroundColor: colors.bgPlaceholder,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: moderateScale(4),
          borderRadius: scale(4),
        }}
      >
        <Image
          source={images.rupee}
          style={{
            width: scale(14),
            height: scale(14),
            marginEnd: moderateScale(4),
          }}
          resizeMode="contain"
          tintColor={"rgba(0,0,0,0.8)"}
        />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[styles.inputStyle]}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          editable={editable}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};

export default LableTextInput;

const styles = StyleSheet.create({
  lableText: {
    flex: 1,
    color: "rgba(0,0,0,0.7)",
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
  },
  inputStyle: {
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(4),
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.8)",
    borderRadius: moderateScale(4),
    textAlign: "right",
    flex: 1,
  },
});
