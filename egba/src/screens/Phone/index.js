import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, View, Platform } from 'react-native';
import {
  Button,
  TextInput,
  withTheme,
  Headline,
  HelperText,
} from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import UserContext from 'shared/contexts/user';
import screenStyles from './styles';

import { SCREENS } from 'constants';
import { useNavigation } from 'react-navigation-hooks';

const Phone = ({ theme }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validationError, setValidationError] = useState('');
  let PhoneInput;
  const userContext = useContext(UserContext);
  const { navigate } = useNavigation();

  const styles = screenStyles(theme);

  const handleNextButtonPress = () => {
    const validationError = validatePhoneNumber(phoneNumber);
    if (validationError) {
      return setValidationError(validationError);
    }
    userContext.setPhoneNumber(phoneNumber);
    navigate(SCREENS.CONFIRM_DETAILS, { phoneNumber });
  };

  const handlePhoneNumberChange = number => {
    setValidationError('');
    setPhoneNumber(number);
  };

  const validatePhoneNumber = () => {
    let error = '';
    const phoneNumberRegex = /^0[789]\d{9}$/;
    const rawPhoneNumber = PhoneInput.getRawValue();

    if (!phoneNumberRegex.test(rawPhoneNumber)) {
      error = 'Incorrect phone number eg. 08056758909';
    }
    return error;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
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
              ref={elem => (PhoneInput = elem)}
              type="cel-phone"
              mask="[000000000000]"
            />
          )}
        />
        <HelperText type="error" visible={!!validationError}>
          {validationError}
        </HelperText>
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
