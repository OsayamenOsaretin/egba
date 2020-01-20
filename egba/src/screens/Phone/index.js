import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import {
  Button,
  TextInput,
  withTheme,
} from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import UserContext from 'shared/contexts/user';
import styles from './styles';

import { SCREENS } from 'constants';
import { useNavigation } from 'react-navigation-hooks';

const Phone = ({ theme }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const userContext = useContext(UserContext);
  const { navigate } = useNavigation();

  const phoneStyles = styles(theme);

  const handleNextButtonPress = () => {
    userContext.setPhoneNumber(phoneNumber);
    navigate(SCREENS.CONFIRM_DETAILS, { phoneNumber });
  };

  const handlePhoneNumberChange = number => {
    setPhoneNumber(number);
  };

  return (
    <KeyboardAvoidingView style={phoneStyles.container}>
      <View>
        <TextInput
          label="Phone Number"
          onChangeText={handlePhoneNumberChange}
          value={phoneNumber}
          render={props => (
            <TextInputMask
              {...props}
              type='cel-phone'
              mask="+[00] [000] [000] [000]"
            />
          )}
        />
      </View>
      <Button mode="contained" dark={true} onPress={handleNextButtonPress}>
        Next
      </Button>
    </KeyboardAvoidingView>
  );
};

export default withTheme(Phone);