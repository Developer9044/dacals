import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { scale } from "react-native-size-matters";
import fontSize from "../../constants/fontSize";
import colors from "../../constants/colors";
import fontFamily from "../../constants/fontFamily";

const RadioButtonComp = ({ onPress, selected, children, radioBtnConStyle }) => {
  return (
    <View style={[styles.radioButtonContainer, radioBtnConStyle]}>
      <Pressable onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </Pressable>
      <Pressable onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
  },
  radioButton: {
    height: scale(17),
    width: scale(17),
    backgroundColor: "#F8F8F8",
    borderRadius: scale(20),
    borderWidth: 2,
    borderColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIcon: {
    height: scale(9),
    width: scale(9),
    borderRadius: 7,
    backgroundColor: "#0275FF",
  },
  radioButtonText: {
    color: colors.black,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    marginLeft: scale(4),
  },
});

export default RadioButtonComp;
