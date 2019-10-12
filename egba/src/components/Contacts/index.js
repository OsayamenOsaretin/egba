import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { List } from "react-native-paper";
import { useNavigation } from "react-navigation-hooks";

import * as Contacts from "expo-contacts";
import { SCREENS } from "../../../src/constants";

const getContacts = async setContacts => {
  const { data } = await Contacts.getContactsAsync();
  if (data.length > 0) {
    setContacts(data);
  }
};

const ContactListItem = ({ contact, navigate }) => (
  <TouchableOpacity onPress={() => navigate(SCREENS.PAY, { account: contact })}>
    <List.Item
      title={contact.name}
      left={() => <List.Icon icon="account-circle" />}
    />
  </TouchableOpacity>
);

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const { navigate } = useNavigation();
  console.log("navigate", navigate);

  useEffect(() => {
    getContacts(setContacts);
  }, [contacts]);

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({ item }) => (
        <ContactListItem contact={item} navigate={navigate} />
      )}
    />
  );
};

export default ContactList;
