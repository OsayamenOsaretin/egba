import React from 'react';
import { View } from 'react-native';
import { Button, withTheme } from 'react-native-paper'
import { useNavigation } from 'react-navigation-hooks';
import { SCREENS } from 'constants';
import { useAskContactPermission } from 'shared/hooks/permissions';

const ContactPermissionsScreen = () => {
  const { navigate } = useNavigation();
  const navigateToContacts = () => { navigate(SCREENS.CONTACTS) }
  const { askContactPermission } = useAskContactPermission(navigateToContacts);

  return (
    <View>
      <Button mode="contained" onPress={askContactPermission}>Grant Contacts Permissions</Button>
    </View>
  );
};

export default withTheme(ContactPermissionsScreen);
