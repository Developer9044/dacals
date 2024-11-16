import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomLableBtn = ({ btnContainer, btnText, onPress, title }) => {
  return (
    <Pressable style={btnContainer} onPress={onPress}>
      <Text style={btnText}>{title}</Text>
    </Pressable>
  );
};

export default CustomLableBtn;

const styles = StyleSheet.create({});
