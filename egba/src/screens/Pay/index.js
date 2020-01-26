import React from 'react';
import { Platform, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { ActivityIndicator, withTheme } from 'react-native-paper';
import { Formik } from 'formik';

import { useNavigationParam } from 'react-navigation-hooks';

import AmountTextInput from 'components/AmountTextInput';
import AccountInfo from 'components/AccountInfo';
import UserDetailsForm from 'components/UserDetailsForm';
import PayButton from 'components/Button';
import useGetAccountDetails from 'shared/hooks/getAccountDetails';
import makePayment from 'shared/utils/makePayment';

import screenStyles from './styles';

const Pay = ({ theme }) => {
  const account = useNavigationParam('account');
  const styles = screenStyles(theme);
  const [accountDetails, loadingAccountDetails] = useGetAccountDetails(number);

  const {
    phoneNumbers: [{ number }],
  } = account;

  if (loadingAccountDetails) {
    return <ActivityIndicator />;
  }

  let initialState = {
    bank: '',
    accountNumber: '',
    amount: '',
  };

  if (accountDetails && accountDetails.length > 0) {
    const [{ account_number: accountNumber, label }] = accountDetails;
    initialState = { bank: label, accountNumber, label };
  }

  const handleSubmit = values => {
    const { accountNumber, label, amount, bank } = values;
    console.log('the values', values);
    makePayment({
      receiverDetails: {
        accountNumber,
      },
      senderDetails: {
        bank: {
          code: 891,
        },
      },
      amount,
    });
  };

  return (
    <Formik initialValues={initialState} onSubmit={handleSubmit}>
      {props => (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          keyboardVerticalOffset={Platform.select({ ios: 95, android: 500 })}
        >
          <ScrollView>
            <AccountInfo account={account} />
            <PaymentForm {...props} />
          </ScrollView>
          <PayButton handleSubmit={props.handleSubmit} label="Send" />
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const PaymentForm = (props) => {
  return (
    <UserDetailsForm {...props}>
      <AmountTextInput
        value={props.values.amount}
        handleChange={props.handleChange('amount')}
      />
    </UserDetailsForm>
  );
};

export default withTheme(Pay);
