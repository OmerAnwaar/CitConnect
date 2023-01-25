import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    padding: "5%",
  },
  longLogo: {
    width: 180,
    height: 160,
    alignSelf: "center",
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10,
    textDecorationLine: "underline",
    marginBottom: 40,
    textAlign: "right",
  },
  errorText: { color: "#FF4842", paddingVertical: "2%" },
  divider: { paddingVertical: "2%" },
});

export default styles;
