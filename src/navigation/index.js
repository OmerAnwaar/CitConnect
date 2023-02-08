import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

import { useSelector } from "react-redux";

const Routes = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Routes;
