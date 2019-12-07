import React, { useState, useEffect, useContext } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import {
  Avatar,
  ActivityIndicator,
  Button,
  Text,
  TextInput,
} from 'react-native-paper';
// import TestInputMask from "react-native-text-input-mask";
import { TextInputMask } from 'react-native-masked-text';
import { Formik } from 'formik';

import { useNavigator, useNavigationParam } from 'react-navigation-hooks';

import UserContext from 'shared/contexts/user';
import config from 'config';

import styles from './styles';

const { BASE_URL } = config;

const GET_USER_ACCOUNT_ENDPOINT = `${BASE_URL}/client/bank-details/`;

const useGetAccount = account => {
  // fetch the account using the fetch api
  const [loading, setLoading] = useState(true);
  const [userAccount, setUserAccount] = useState(null);

  // const { phoneNumbers: [ { number } ] } = account;
  const number = '2347061565279';
  // console.log(BASE_URL, 'THE BASE URL><><>')

  const fetchUserAccountData = async () => {
    try {
      const data = await fetch(`${GET_USER_ACCOUNT_ENDPOINT}${number}`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const response = await data.json();
      console.log(JSON.stringify(response), 'user bank info');
      setUserAccount(response);
    } catch (error) {
      console.log(error, 'the fetch error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserAccountData();
  }, [account]);
  return [userAccount, loading];
};

const Pay = () => {
  const account = useNavigationParam('account');
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <AccountInfo account={account} />
      <PaymentForm account={account} />
    </KeyboardAvoidingView>
  );
};

const PaymentForm = ({ account }) => {
  const currentUserContext = useContext(UserContext);
  const { bank: currentUserBank } = currentUserContext;

  const [accountDetails, loadingAccountDetails] = useGetAccount(account);

  if (loadingAccountDetails) {
    return <ActivityIndicator />;
  }

  let Form = UnregisteredUserForm;
  let handleSubmit = values => {
    // handle submitting request for to send money

    const { accountNumber } = values;
    // dummy pay account number
  };

  let bankAccountDetails;

  if (accountDetails) {
    Form = RegisteredUserForm;
    handleSubmit = values => {
      const [{ account_number: accountNumber }] = accountDetails;
      console.log('the user account number', accountNumber);
      // pay account number
    };
    const [
      {
        account_number: accountNumber,
        label,
        code: bankCode,
      },
    ] = accountDetails;
    bankAccountDetails = { accountNumber, label, bankCode };
  }

  return (
    <Formik onSubmit={handleSubmit}>
      {props => <Form {...props} {...bankAccountDetails} />}
    </Formik>
  );
};

const AccountInfo = ({ account }) => {
  const name = account.name;
  const hasImage = account.imageAvailable;

  const avatarType = hasImage ? 'Image' : 'Icon';
  const AccountAvatar = Avatar[avatarType];

  return (
    <View style={styles.accountInfo}>
      <AccountAvatar icon="account-circle" size={134} />
      <View style={styles.accountName}>
        <Text>{name}</Text>
      </View>
    </View>
  );
};

const PayButton = ({ handleSubmit }) => (
  <Button
    mode="contained"
    style={styles.payButton}
    dark={true}
    onPress={handleSubmit}
  >
    Send
  </Button>
);

const AmountTextInput = ({ values, handleChange }) => (
  <TextInput
    value={values.amount}
    onChangeText={handleChange('amount')}
    label="How much?"
    render={props => (
      <TextInputMask
        {...props}
        type="money"
        options={{
          precision: 0,
          delimiter: ',',
          unit: '#',
          suffixUnit: '',
        }}
      />
    )}
  />
);

const RegisteredUserForm = props => (
  <View style={styles.formContainer}>
    <View style={styles.inputContainer}>
      <AmountTextInput {...props} />
    </View>
    <PayButton {...props} />
  </View>
);

const UnregisteredUserForm = ({ handleChange, handleBlur, values }) => (
  <View style={styles.formContainer}>
    <View style={styles.inputContainer}>
      <TextInput onChangeText={handleChange('bank')} value={values.amount} />
    </View>
    <View style={styles.inputContainer}>
      <TextInput onChangeText={handleChange('account')} value={values.amount} />
    </View>
    <View style={styles.inputContainer}>
      <AmountTextInput {...props} />
    </View>
    <PayButton />
  </View>
);

export default Pay;
