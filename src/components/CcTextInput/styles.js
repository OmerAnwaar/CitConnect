import { StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const height = Dimensions.get("screen").height;

export default StyleSheet.create({
  input: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
