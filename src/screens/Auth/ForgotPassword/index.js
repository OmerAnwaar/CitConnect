import { Formik } from "formik";
import React, { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";

import * as yup from "yup";

import CcButton from "../../../components/CcButton";
import CcTextInput from "../../../components/CcTextInput";
import icons from "../../../constants";
import { onLogin } from "../../../store/features/authSlice";
import styles from "./styles";

const initialValues = {
  email: "",
  password: "",
  globalErr: "",
};

const ForgotPassword = ({ navigation }) => {
  const [secure, setSecure] = useState(true);
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const handleLogin = async (values) => {
    try {
      const payload = {
        login: values.email.trim(),
        password: values.password,
      };
      dispatch(onLogin());
      console.log(payload);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.longLogo}
        source={icons.LOGO}
        resizeMode={"contain"}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          handleSubmit,
        }) => (
          <>
            <CcTextInput
              label={"New Password"}
              keyboardType="default"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              inactiveColor={"black"}
              secureTextEntry={secure}
              autoCapitalize="none"
              outlineColor={errors.password ? "red" : "gray"}
              right={
                <TextInput.Icon
                  icon={secure ? "eye" : "eye-off"}
                  onPress={() => setSecure(!secure)}
                />
              }
            />
            {touched.email && errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : (
              <View style={styles.divider} />
            )}
            <CcTextInput
              label={"Confirm New Password"}
              keyboardType="default"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              inactiveColor={"black"}
              secureTextEntry={secure}
              autoCapitalize="none"
              outlineColor={errors.password ? "red" : "gray"}
              right={
                <TextInput.Icon
                  icon={secure ? "eye" : "eye-off"}
                  onPress={() => setSecure(!secure)}
                />
              }
            />
            {touched.password && errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : (
              <View style={styles.divider} />
            )}
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                paddingBottom: "10%",
              }}
            >
              <CcButton
                title={"SAVE"}
                onPress={() => navigation.navigate("Registration")}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword;
