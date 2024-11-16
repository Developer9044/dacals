import {
  ImageBackground,
  StyleSheet,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { images } from "../assets";
import CommanBackHeader from "./CommanBackHeader";
import colors from "../constants/colors";

const ChildScreenContainerWithBackGround = ({
  children,
  showBgImage,
  hideTopHeader,
  screen_name,
  topContainer,
}) => {
  const { height, width } = useWindowDimensions();
  return (
    <ImageBackground
      source={showBgImage ? images.homeBgImage : colors.white}
      imageStyle={{
        height: height,
      }}
      style={[styles.mainWrapper]}
    >
      {hideTopHeader && (
        <CommanBackHeader
          topContainer={topContainer}
          screen_name={screen_name}
        />
      )}

      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
          }}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    height: verticalScale(250),
    position: "absolute",
    zIndex: 0,
    bottom: verticalScale(0),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  mainWrapper: {
    flex: 1,
  },
  safeAreaWrapper: {},
});

export default ChildScreenContainerWithBackGround;
