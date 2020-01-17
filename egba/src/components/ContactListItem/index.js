import React from 'react';
import { TouchableOpacity } from "react-native";
import { List } from "react-native-paper";

const ContactListItem = ({ contact, handlePress }) => (
  <TouchableOpacity onPress={handlePress}>
    <List.Item
      title={contact.name}
      left={() => <List.Icon icon="account-circle" />}
    />
  </TouchableOpacity>
);

export default ContactListItem;
