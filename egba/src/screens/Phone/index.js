import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, View, Platform } from 'react-native';
import {
  Button,
  TextInput,
  withTheme,
  Headline,
} from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import UserContext from 'shared/contexts/user';
import screenStyles from './styles';

import { SCREENS } from 'constants';
import { useNavigation } from 'react-navigation-hooks';

const Phone = ({ theme }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const userContext = useContext(UserContext);
  const { navigate } = useNavigation();

  const styles = screenStyles(theme);

  const handleNextButtonPress = () => {
    userContext.setPhoneNumber(phoneNumber);
    navigate(SCREENS.CONFIRM_DETAILS, { phoneNumber });
  };

  const handlePhoneNumberChange = number => {
    setPhoneNumber(number);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={(Platform.OS === 'ios') ? "padding": null}
      keyboardVerticalOffset={Platform.select({ ios: 95, android: 500 })}
    >
      <View>
        <Headline style={styles.headline}>Welcome to Bowo</Headline>
        <TextInput
          label="Phone Number"
          onChangeText={handlePhoneNumberChange}
          value={phoneNumber}
          render={props => (
            <TextInputMask
              {...props}
              type="cel-phone"
              mask="+[00] [000] [000] [000]"
            />
          )}
        />
      </View>
      <Button
        style={styles.button}
        mode="contained"
        dark={true}
        onPress={handleNextButtonPress}
      >
        Register
      </Button>
    </KeyboardAvoidingView>
  );
};

export default withTheme(Phone);
