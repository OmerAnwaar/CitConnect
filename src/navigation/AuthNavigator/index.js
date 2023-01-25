import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../screens/Auth/Login";
import Registration from "../../screens/Auth/Registration";
import ForgotPassword from "../../screens/Auth/ForgotPassword";
import Type from "../../screens/Auth/Type";
import ProfessionalRef from "../../screens/Auth/ProfessionalRef";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"Login"}>
      <Stack.Screen name={"Login"} component={Login} />
      <Stack.Screen name={"Account Type"} component={Type} />
      <Stack.Screen name={"ProfessionalRef"} component={ProfessionalRef} />
      <Stack.Screen name={"Registration"} component={Registration} />
      <Stack.Screen name={"ForgotPassword"} component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
