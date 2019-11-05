import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Home from "./src/screens/Home";
import Auth from "./src/screens/Auth";
import { SCREENS } from "./src/constants";
import { UserContextProvider } from "./src/shared/context/userContext";

const Navigator = createSwitchNavigator(
  {
    [SCREENS.AUTH]: { screen: Auth },
    [SCREENS.HOME]: { screen: Home }
  },
  {
    initialRouteName: `${SCREENS.AUTH}`
  }
);

const App = () => (
  <UserContextProvider>
    <Navigator />
  </UserContextProvider>
);

export default createAppContainer(App);
