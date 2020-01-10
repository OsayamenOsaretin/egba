import React from 'react';
import { View } from 'react-native';
import AmountTextInput from 'components/AmountTextInput';
import {
  TextInput,
} from 'react-native-paper';

import styles from './styles';

const UserDetailsForm = ({ values, handleChange, children }) => (
  <View style={styles.formContainer}>
    <View style={styles.inputContainer}>
      <TextInput onChangeText={handleChange('name')} value={values.name} label="Account Name" />
    </View>
    <View style={styles.inputContainer}>
      <TextInput onChangeText={handleChange('bank')} value={values.bank} label="Bank" />
    </View>
    <View style={styles.inputContainer}>
      <TextInput
        label="Account Number"
        onChangeText={handleChange('accountNumber')}
        value={values.accountNumber}
      />
    </View>
    {children}
  </View>
);

export default UserDetailsForm;
