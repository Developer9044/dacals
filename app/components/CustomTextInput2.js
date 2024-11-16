import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import colors from "../constants/colors";
import fontSize from "../constants/fontSize";
import fontFamily from "../constants/fontFamily";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const CustomTextInput2 = ({
  textInputContainerStyle,
  value,
  onChangeText,
  inputStyle,
  placeholder,
  placeholderTextColor,
  keyboardType,
  maxLength,
  lable,
  requiredLable,
  isIcon,
  error_msg,
  onPress,
}) => {
  return (
    <View style={[textInputContainerStyle]}>
      {lable && (
        <View style={styles.lableContainer}>
          <Text style={styles.lableStyle}>{lable}</Text>
          <Text
            style={[
              styles.lableStyle,
              {
                marginTop: 2,
                marginStart: moderateScale(2),
                color: colors.danger,
              },
            ]}
          >
            {requiredLable}
          </Text>
        </View>
      )}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[
          inputStyle,
          styles.inputStyle,
          { marginBottom: error_msg ? moderateScale(0) : moderateScale(10) },
        ]}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
      {isIcon && (
        <Pressable
          onPress={onPress}
          style={{ position: "absolute", right: scale(12), top: "45%" }}
        >
          <Image
            source={isIcon}
            style={{
              width: scale(20),
              height: scale(20),
            }}
            resizeMode="contain"
          />
        </Pressable>
      )}

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
  );
};

export default CustomTextInput2;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: colors.bgPlaceholder,
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(6),
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.8)",
    borderRadius: moderateScale(4),
  },
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
});
