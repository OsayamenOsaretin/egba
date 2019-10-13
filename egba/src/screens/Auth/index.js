import React from "react";

import { View, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Title, Button } from "react-native-paper";

import { SCREENS } from "../../../src/constants";

const useAuth = () => {
  return true;
};

const Auth = () => {
  const isAuth = useAuth();
  const { navigate } = useNavigation();
  console.log("navigate", navigate);

  if (isAuth) {
    return navigate(SCREENS.HOME);
  }

  return (
    <SafeAreaView style={styles.authContainer}>
      <Title>Send money, conveniently.</Title>
      <Button mode="contained" style={styles.authButton}>
        Log In
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    backgroundColor: '#694fad',
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  authButton: {
    bottom: 35,
    flex: 1,
    position: "absolute",
  }
});

export default Auth;
