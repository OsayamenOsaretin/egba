import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Accounts from "./src/screens/Accounts";
import { SCREENS } from './src/constants';


function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const Navigator = createMaterialBottomTabNavigator(
  {
    [SCREENS.ACCOUNTS]: { screen: Accounts },
    Home: { screen: App },
  },
  {
    initialRouteName: `${SCREENS.ACCOUNTS}`,
    activeColor: "#f0edf6",
    inactiveColor: "#3e2465",
    barStyle: { backgroundColor: "#694fad" }
  }
);

export default createAppContainer(Navigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
