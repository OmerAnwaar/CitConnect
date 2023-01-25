import Checkbox from "expo-checkbox";
import { Formik } from "formik";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import CcButton from "../../../components/CcButton";
import CcTextInput from "../../../components/CcTextInput";
import icons from "../../../constants";
import { onLogin } from "../../../store/features/authSlice";
import styles from "./styles";

const initialValues = {
  bussinessEIN: "",
  bankName: "",
  routingNumber: "",
  address: "",
  accountNumber: "",
  globalErr: "",
};

const validationSchema = yup.object().shape({
  bussinessEIN: yup.string().required(),
  address: yup.string().required(),
});
const validationSchema_2 = yup.object().shape({
  bussinessEIN: yup.string().required(),
  bankName: yup.string().required(),
  routingNumber: yup.string().required(),
  accountNumber: yup.string().required(),
});

const ProfessionalRef = ({ navigation, route }) => {
  const [isWeekly, setIsWeekly] = useState(false);
  const [isDirect, setIsDirect] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      if (!isWeekly && !isDirect) {
        Alert.alert("Please select payment method!");
        return;
      }
      const payload = {
        bussinessEIN: values.bussinessEIN,
        bankName: values.bankName,
        routingNumber: values.routingNumber,
        accountNumber: values.accountNumber,
      };
      dispatch(onLogin("professional"));
    } catch (err) {
      console.log(err);
    }
  };

  function handleGeneral() {
    setIsWeekly(!isWeekly);
    setIsDirect((prevState) => (true ? false : true));
  }
  function handleProfessional() {
    setIsDirect(!isDirect);
    setIsWeekly((prevState) => (true ? false : true));
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <ScrollView>
        <Image
          style={styles.longLogo}
          source={icons.LOGO}
          resizeMode={"contain"}
        />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={isDirect ? validationSchema_2 : validationSchema}
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
                label={"Bussiness EIN"}
                keyboardType="phone-number"
                onChangeText={handleChange("bussinessEIN")}
                onBlur={handleBlur("bussinessEIN")}
                value={values.bussinessEIN}
                outlineColor={
                  touched.bussinessEIN && errors.bussinessEIN ? "red" : "gray"
                }
                right={null}
              />
              {touched.bussinessEIN && errors.bussinessEIN ? (
                <Text style={styles.errorText}>{errors.bussinessEIN}</Text>
              ) : (
                <View style={styles.divider} />
              )}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                  style={styles.checkbox}
                  value={isWeekly}
                  onValueChange={handleGeneral}
                  color={isWeekly ? "orange" : undefined}
                />
                <Text>Mail referral fee to bussiness address (2-3 weeks)</Text>
              </View>
              {isWeekly && (
                <>
                  <CcTextInput
                    label={"Address"}
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    value={values.address}
                    outlineColor={
                      touched.address && errors.address ? "red" : "gray"
                    }
                    right={null}
                  />
                  {touched.address && errors.address ? (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  ) : (
                    <View style={styles.divider} />
                  )}
                </>
              )}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                  style={styles.checkbox}
                  value={isDirect}
                  onValueChange={handleProfessional}
                  color={isDirect ? "orange" : undefined}
                />
                <Text>Direct Deposit</Text>
              </View>
              {isDirect && (
                <>
                  <CcTextInput
                    label={"Bank Name"}
                    onChangeText={handleChange("bankName")}
                    onBlur={handleBlur("bankName")}
                    value={values.bankName}
                    outlineColor={
                      touched.bankName && errors.bankName ? "red" : "gray"
                    }
                    right={null}
                  />
                  {touched.bankName && errors.bankName ? (
                    <Text style={styles.errorText}>{errors.bankName}</Text>
                  ) : (
                    <View style={styles.divider} />
                  )}
                  <CcTextInput
                    label={"Routing Number"}
                    onChangeText={handleChange("routingNumber")}
                    onBlur={handleBlur("routingNumber")}
                    value={values.routingNumber}
                    outlineColor={
                      touched.routingNumber && errors.routingNumber
                        ? "red"
                        : "gray"
                    }
                    right={null}
                  />
                  {touched.routingNumber && errors.routingNumber ? (
                    <Text style={styles.errorText}>{errors.routingNumber}</Text>
                  ) : (
                    <View style={styles.divider} />
                  )}
                  <CcTextInput
                    label={"Account Number"}
                    onChangeText={handleChange("accountNumber")}
                    onBlur={handleBlur("accountNumber")}
                    value={values.accountNumber}
                    outlineColor={
                      touched.accountNumber && errors.accountNumber
                        ? "red"
                        : "gray"
                    }
                    right={null}
                  />
                  {touched.accountNumber && errors.accountNumber ? (
                    <Text style={styles.errorText}>{errors.accountNumber}</Text>
                  ) : (
                    <View style={styles.divider} />
                  )}
                </>
              )}
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  paddingBottom: "10%",
                }}
              >
                <CcButton title={"SUBMIT"} onPress={handleSubmit} />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default ProfessionalRef;
