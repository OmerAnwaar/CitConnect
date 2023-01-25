import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";

import AsyncStorage from "@react-native-async-storage/async-storage";
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
