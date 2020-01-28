import React from 'react';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import BankSelectMenu from 'components/BankSelectMenu';
import * as Yup from 'yup';
import styles from './styles';

export const UserDetailsSchema = {
  name: Yup.string()
    .min(3, 'Name should be longer than 3 characters')
    .required('Please enter a name for your friend'),
  bank: Yup.string().required('Click on the button to select a bank'),
  accountNumber: Yup.number().test(
    'numberLength',
    'Account numbers are 10 digits, please enter the correct account number',
    val => val && val.toString().length === 10,
  ),
};

const UserDetailsForm = ({ values, handleChange, children, errors }) => (
  <View style={styles.formContainer}>
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={handleChange('name')}
        value={values.name}
        label="Account Name"
      />
      <HelperText visible={!!errors.name}>
        Name must be at least three characters, eg. bob
      </HelperText>
    </View>
    <View style={styles.inputContainer}>
      <TextInput
        label="Account Number"
        onChangeText={handleChange('accountNumber')}
        value={values.accountNumber}
      />
      <HelperText visible={!!errors.accountNumber}>
          {errors.accountNumber}
      </HelperText>
    </View>
    <View style={styles.inputContainer}>
      <BankSelectMenu handleChange={handleChange('bank')} value={values.bank} />
      <HelperText visible={!!errors.bank}>
          {errors.bank}
      </HelperText>
    </View>
    <View style={styles.inputContainer}>{children}</View>
  </View>
);

export default UserDetailsForm;
