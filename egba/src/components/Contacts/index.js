import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { List, Searchbar } from "react-native-paper";
import { useNavigation } from "react-navigation-hooks";

import * as Contacts from "expo-contacts";
import { SCREENS } from "../../../src/constants";

const getContacts = async (setContacts, search) => {
  const query = {
    sort: Contacts.SortTypes.FirstName,
  }
  if (search) {
    query.name = search;
  }
  const { data } = await Contacts.getContactsAsync(query);

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
  const [contactSearch, setContactSearch] = useState("");
  const { navigate } = useNavigation();
  console.log('navigate', navigate)

  useEffect(() => {
    getContacts(setContacts, contactSearch);

  }, [contactSearch]);

  return (
    <React.Fragment>
      <Searchbar
        onChangeText={setContactSearch}
        value={contactSearch}
        placeholder="Search contacts"
      />
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => `${index}`}
        keyboardShouldPersistTaps={true}
        renderItem={({ item }) => (
          <ContactListItem contact={item} navigate={navigate} />
        )}
      />
    </React.Fragment>
  );
};

export default ContactList;

// account Object {
// "addresses": Array [
// Object {
// "city": "Corte Madera",
// "country": "USA",
// "id": "C7C32148-97E2-4BC4-BB08-6342CC7DF8EC",
// "isoCountryCode": "us",
// "label": "home",
// "postalCode": "94925",
// "region": "CA",
// "street": "332 Laguna Street",
// },
// ],
// "contactType": "person",
// "emails": Array [
// Object {
// "email": "d-higgins@mac.com",
// "id": "74D6C349-2E03-45AC-98D8-279100B4926B",
// "label": "home",
// },
// ],
// "firstName": "Daniel",
// "id": "AB211C5F-9EC9-429F-9466-B9382FF61035",
// "imageAvailable": false,
// "lastName": "Higgins",
// "name": "Daniel Higgins Jr.",
// "nameSuffix": "Jr.",
// "phoneNumbers": Array [
// Object {
// "countryCode": "us",
// "digits": "5554787672",
// "id": "E55D230F-DA04-407F-9604-0C0A72CE819A",
// "label": "home",
// "number": "555-478-7672",
// },
// Object {
// "countryCode": "us",
// "digits": "4085555270",
// "id": "A34AD25F-24F5-4043-9BC6-060F2F43FCB8",
// "label": "mobile",
// "number": "(408) 555-5270",
// },
// Object {
// "countryCode": "us",
// "digits": "4085553514",
// "id": "DB57AB88-73CB-4038-B38D-55D1680698AC",
// "label": "home fax",
// "number": "(408) 555-3514",
// },
// ],
// }
