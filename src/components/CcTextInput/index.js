import React from "react";
import { Image, View } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "./styles";

const CcTextInput = ({ textInputStyle, ...rest }) => {
  return (
    <TextInput
      {...rest}
      style={[styles.input, textInputStyle]}
      mode={"outlined"}
      theme={{
        colors: {
          primary: "#EF7A51",
          underlineColor: "grey",
          placeholder: "#50556A",
          text: "white",
        },
        roundness: 10,
      }}
    />
  );
};
export default CcTextInput;
