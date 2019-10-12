import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Contacts from "expo-contacts";

const useGetContacts = async (setContacts) => {
  const { data } = await Contacts.getContactsAsync();
  if (data.length > 0) {
    setContacts(data)
  }
};

export default function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    useGetContacts(setContacts);
  })
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
