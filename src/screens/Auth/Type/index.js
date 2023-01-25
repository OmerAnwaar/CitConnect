import React, { useState } from "react";
import { Image, Text, View } from "react-native";

import Checkbox from "expo-checkbox";

import CcButton from "../../../components/CcButton";
import icons from "../../../constants";
import styles from "./styles";

const Type = ({ navigation }) => {
  const [isGeneral, setGeneral] = useState(false);
  const [isProfessional, setProfessional] = useState(false);

  function handleNext() {
    navigation.navigate("Registration", {
      isProfessional,
    });
  }

  function handleGeneral() {
    setGeneral(!isGeneral);
    setProfessional((prevState) => (true ? false : true));
  }
  function handleProfessional() {
    setProfessional(!isProfessional);
    setGeneral((prevState) => (true ? false : true));
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.longLogo}
        source={icons.LOGO}
        resizeMode={"contain"}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox
          style={styles.checkbox}
          value={isGeneral}
          onValueChange={handleGeneral}
          color={isGeneral ? "orange" : undefined}
        />
        <Text style={{ fontWeight: "bold" }}>General reference</Text>
      </View>
      <Text style={{ color: "black", paddingStart: 35 }}>
        (I am an individual with occasional referrals)
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", paddingTop: "5%" }}
      >
        <Checkbox
          style={styles.checkbox}
          value={isProfessional}
          onValueChange={handleProfessional}
          color={isProfessional ? "orange" : undefined}
        />
        <Text style={{ fontWeight: "bold" }}>Professional referral</Text>
      </View>
      <Text style={{ color: "black", paddingStart: 35 }}>
        (I am a Professional with business referrals)
      </Text>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: "15%",
        }}
      >
        <CcButton
          title={"NEXT"}
          onPress={handleNext}
          disabled={!isGeneral && !isProfessional}
        />
      </View>
    </View>
  );
};

export default Type;
