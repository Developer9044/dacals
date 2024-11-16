import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";
import fontSize from "../constants/fontSize";
import fontFamily from "../constants/fontFamily";
import { moderateScale, scale } from "react-native-size-matters";
import { images } from "../assets";

const CustomDrop = ({
  title,
  content,
  isClicked,
  setIsClicked,
  index,
  DropdownContainer,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => setIsClicked(index)}
        style={[
          {
            paddingVertical: moderateScale(10),
            paddingHorizontal: moderateScale(1),
            borderBottomWidth: scale(0.5),
            marginBottom: moderateScale(4),
            backgroundColor: isClicked ? colors.bgPlaceholder : null,
            flexDirection: "row",
            justifyContent: "space-between",
            borderTopRightRadius: scale(4),
            borderTopLeftRadius: scale(4),
          },
          DropdownContainer,
        ]}
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

        {isClicked ? (
          <Image
            source={images.up}
            style={{ width: scale(16), height: scale(16) }}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={images.down}
            style={{ width: scale(18), height: scale(18) }}
            resizeMode="contain"
          />
        )}
      </Pressable>
      {isClicked && (
        <Text
          style={{
            color: colors.lightGrey,
            fontSize: fontSize.t4,
            fontFamily: fontFamily.REGULAR,
            paddingVertical: moderateScale(5),
            paddingHorizontal: moderateScale(4),
          }}
        >
          {content}
        </Text>
      )}
    </View>
  );
};

export default CustomDrop;

const styles = StyleSheet.create({});
