import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { NAVIGATOR } from "../../navigations/RoutesName";

const SplashScreen = () => {
  const [showGif, setGifStatus] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(NAVIGATOR.DRAWER_NAVIGATOR);
      setGifStatus(false);
    }, 2700);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {showGif ? (
        <FastImage
          source={require("../../assets/gifImg/splash.gif")}
          style={styles.gifStyle}
          resizeMode={FastImage.resizeMode.contain}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gifStyle: {
    width: "35%",
    height: "35%",
  },
});
