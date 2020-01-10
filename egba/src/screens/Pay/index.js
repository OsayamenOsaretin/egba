import React from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import {
  ActivityIndicator,
} from 'react-native-paper';
// import TestInputMask from "react-native-text-input-mask";
import { Formik } from 'formik';

import { useNavigationParam } from 'react-navigation-hooks';

import AmountTextInput from 'components/AmountTextInput';
import AccountInfo from 'components/AccountInfo';
import UserDetailsForm from 'components/UserDetailsForm';
import PayButton from 'components/Button';
import useGetAccountDetails from 'shared/hooks/getAccountDetails';

import styles from './styles';

const Pay = () => {
  const account = useNavigationParam('account');
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView>
        <AccountInfo account={account} />
        <PaymentForm account={account} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const PaymentForm = ({ account }) => {
  const { phoneNumbers: [ { number } ] } = account;
  const [accountDetails, loadingAccountDetails] = useGetAccountDetails(number);

  if (loadingAccountDetails) {
    return <ActivityIndicator />;
  }

  const handleSubmit = values => {
    // handle submitting request for to send money

    const { accountNumber, label, amount, bank } = values;
    console.log('the values', values);
    // dummy pay account number
  };

  let initialState = {
    bank: '',
    accountNumber: '',
    amount: '',
  };

  if (accountDetails && accountDetails.length > 0) {
    const [{ account_number: accountNumber, label }] = accountDetails;
    initialState = { bank: label, accountNumber, label };
  }

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialState}>
      {props => (
        <UserDetailsForm {...props}>
          <View style={styles.inputContainer}>
            <AmountTextInput values={props.values} handleChange={props.handleChange} />
          </View>
          <PayButton handleSubmit={props.onSubmit} label="Send" />
        </UserDetailsForm>
      )}
    </Formik>
  );
};

export default Pay;
