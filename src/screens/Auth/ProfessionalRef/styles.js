import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: "5%",
  },
  longLogo: {
    width: 180,
    height: 160,
    alignSelf: "center",
  },
  checkbox: {
    margin: 8,
  },
  errorText: { color: "#FF4842", paddingVertical: "2%" },
  divider: { paddingVertical: "2%" },
  pickerStyle: {
    marginBottom: 15,
  },
  pickerItemSeperatorStyle: {
    height: 1,
    backgroundColor: "grey",
    marginVertical: 5,
  },
});

export default styles;
