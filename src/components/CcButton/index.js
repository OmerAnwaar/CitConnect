import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";

const CcButton = ({ title, onPress, disabled = false, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <LinearGradient
        style={styles.linearGradient}
        colors={["#F2994A", "#ED6854"]}
        start={{ x: 1, y: -1 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default CcButton;
