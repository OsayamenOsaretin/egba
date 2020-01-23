import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";

import { Searchbar, withTheme } from "react-native-paper";
import { useNavigation } from "react-navigation-hooks";

import * as Contacts from "expo-contacts";

import { SCREENS } from "../../../src/constants";
import { useCheckContactPermission } from 'shared/hooks/permissions';
import SignoutButton from 'components/SignoutButton';
import ContactListItem from 'components/ContactListItem';

import styles from './styles';

const ContactList = ({ theme }) => {
  const [contacts, setContacts] = useState([]);
  const [contactSearch, setContactSearch] = useState("");
  const { navigate } = useNavigation();
  const themeStyles = styles(theme);

  const [contactsPermissions] = useCheckContactPermission();

  const handlePress = (contact) => navigate(SCREENS.PAY, { account: contact });

  useEffect(() => {
    let isUnmounted = false;
    async function getContacts()  {
      const query = {
        sort: Contacts.SortTypes.FirstName,
      }
      if (contactSearch) {
        query.name = contactSearch;
      }
      if (contactsPermissions) {
        const { data } = await Contacts.getContactsAsync(query);

        if (data.length > 0) {
          if (!isUnmounted) {
            setContacts(data);
          }
        }
      }
    };

    getContacts();
    return () => { isUnmounted = true; }
  }, [contactSearch, contactsPermissions]);

  return (
    <View>
      <Searchbar
        onChangeText={setContactSearch}
        value={contactSearch}
        placeholder="Search contacts"
        style={themeStyles.searchBar}
      />
      <FlatList
        data={contacts}
        keyExtractor={(_, index) => `${index}`}
        keyboardShouldPersistTaps="always"
        renderItem={({ item }) => (
          <ContactListItem
            contact={item}
            handlePress={handlePress}
          />
        )}
      />
    </View>
  );
};

ContactList.navigationOptions = {
  title: 'Contacts',
  headerRight: <SignoutButton />,
};

export default withTheme(ContactList);

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
