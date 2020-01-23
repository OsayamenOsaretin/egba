import React from 'react';
import { View } from 'react-native';
import { Button, withTheme, Title, Headline } from 'react-native-paper'
import { useNavigation } from 'react-navigation-hooks';
import { SCREENS } from 'constants';
import { useAskContactPermission } from 'shared/hooks/permissions';
import screenStyles from './styles';

const ContactPermissionsScreen = ({ theme }) => {
  const { navigate } = useNavigation();
  const navigateToContacts = () => { navigate(SCREENS.CONTACTS) }
  const { askContactPermission } = useAskContactPermission(navigateToContacts);
  const styles = screenStyles(theme);

  return (
    <View style={styles.container}>
      <Headline style={styles.helpText}>Bowo uses your contacts to allow you quickly send money to friends.</Headline>
      <Button mode="contained" onPress={askContactPermission} style={styles.grantButton}>Grant Contacts Permissions</Button>
    </View>
  );
};

ContactPermissionsScreen.navigationOptions = {
  headerLeft: null,
}

export default withTheme(ContactPermissionsScreen);
