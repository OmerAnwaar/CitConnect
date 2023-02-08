import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";

import * as yup from "yup";

import { useDispatch } from "react-redux";
import CcButton from "../../../components/CcButton";
import CcTextInput from "../../../components/CcTextInput";
import icons from "../../../constants";
import { createUser, ifUserExists } from "../../../store/features/authSlice";
import styles from "./styles";
import { auth } from "../../../../firebaseConfig";

const initialValues = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  password: "",
  globalErr: "",
};

const Registration = ({ navigation, route }) => {
  const { params } = route;
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  console.log(user);

  async function onAuthenticate() {
    try {
      await auth.signOut();
    } catch (err) {
      Alert.alert(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    // onAuthenticate();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRegistration = async (values) => {
    try {
      setLoading(true);
      // const uid = user.uid;
      const payload = {
        firstname: values.firstname,
        lastname: values.lastname,
        phone: values.phone,
        email: values.email,
        password: values.password,
        // uid,
        path: params.isProfessional ? "Professional" : "General",
      };
      // const result = await ifUserExists(uid);
      // console.log(result);
      // if (result === true) {
      //   Alert.alert("User Already Exist!");
      //   setLoading(false);
      //   return;
      // }
      const res = await dispatch(createUser(payload));
      console.log("res", res._tokenResponse.isNewUser);
      // dispatch(onLogin("general"));
      setLoading(false);
      console.log(payload);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleNext = async (values) => {
    try {
      const payload = {
        firstname: values.firstname,
        lastname: values.lastname,
        phone: values.phone,
        email: values.email,
        password: values.password,
      };
      navigation.navigate("ProfessionalRef", payload);
    } catch (err) {
      console.log(err);
    }
  };

  const element = (
    <TextInput.Icon
      icon={secure ? "eye" : "eye-off"}
      onPress={() => setSecure(!secure)}
    />
  );

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      scrollEnabled
      style={styles.container}
    >
      <ScrollView style={{ paddingBottom: "10%" }}>
        <Image
          style={styles.longLogo}
          source={icons.LOGO}
          resizeMode={"contain"}
        />
        <Formik
          initialValues={initialValues}
          onSubmit={params.isProfessional ? handleNext : handleRegistration}
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingBottom: "5%",
                }}
              >
                Create an Account
              </Text>
              <CcTextInput
                label={"First Name"}
                onChangeText={handleChange("firstname")}
                onBlur={handleBlur("firstname")}
                value={values.firstname}
                outlineColor={
                  touched.firstname && errors.firstname ? "red" : "gray"
                }
                right={null}
              />
              {touched.firstname && errors.firstname ? (
                <Text style={styles.errorText}>{errors.firstname}</Text>
              ) : (
                <View style={styles.divider} />
              )}
              <CcTextInput
                label={"Last Name"}
                onChangeText={handleChange("lastname")}
                onBlur={handleBlur("lastname")}
                value={values.lastname}
                outlineColor={
                  touched.lastname && errors.lastname ? "red" : "gray"
                }
                right={null}
              />
              {touched.lastname && errors.lastname ? (
                <Text style={styles.errorText}>{errors.lastname}</Text>
              ) : (
                <View style={styles.divider} />
              )}
              <CcTextInput
                label={"Phone Number"}
                keyboardType="phone-pad"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                outlineColor={touched.phone && errors.phone ? "red" : "gray"}
                right={null}
              />
              {touched.phone && errors.phone ? (
                <Text style={styles.errorText}>{errors.phone}</Text>
              ) : (
                <View style={styles.divider} />
              )}
              <CcTextInput
                label={"Email Address"}
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                autoCapitalize="none"
                value={values.email}
                outlineColor={touched.email && errors.email ? "red" : "gray"}
                right={null}
              />
              {touched.email && errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : (
                <View style={styles.divider} />
              )}
              <CcTextInput
                label={"Password"}
                keyboardType="default"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={secure}
                autoCapitalize="none"
                outlineColor={errors.password ? "red" : "gray"}
                right={element}
              />
              {touched.password && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : (
                <View style={styles.divider} />
              )}
              <CcButton
                title={params.isProfessional ? "NEXT" : "SUBMIT"}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </ScrollView>
      {loading && <ActivityIndicator style={{ flex: 1 }} size={"large"} />}
    </KeyboardAwareScrollView>
  );
};

export default Registration;
