import React from 'react';
import { Platform, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { ActivityIndicator, withTheme, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import { SCREENS } from 'constants';

import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

import AmountTextInput from 'components/AmountTextInput';
import AccountInfo from 'components/AccountInfo';
import UserDetailsForm, { UserDetailsSchema } from 'components/UserDetailsForm';
import PayButton from 'components/Button';
import useGetAccountDetails from 'shared/hooks/getAccountDetails';
import makePayment from 'shared/utils/makePayment';
import useRegister from 'shared/hooks/register';
import * as Yup from 'yup';

import screenStyles from './styles';

const PaymentFormSchema = Yup.object().shape({
  ...UserDetailsSchema,
  amount: Yup.string().required('Please enter the amount you want to send'),
});

const Pay = ({ theme }) => {
  const account = useNavigationParam('account');
  console.log('the account value', account)
  const styles = screenStyles(theme);
  const { navigate } = useNavigation();
  const { registerUser } = useRegister();

  const {
    phoneNumbers: [{ number }],
  } = account;

  const [accountDetails, loadingAccountDetails] = useGetAccountDetails(number);

  if (loadingAccountDetails) {
    return <ActivityIndicator />;
  }

  let initialState = {
    bank: '',
    accountNumber: '',
    amount: '',
  };

  if (accountDetails && accountDetails.length > 0) {
    const [
      { account_number: accountNumber, label, code, account_name: name },
    ] = accountDetails;
    initialState = { bank: code, accountNumber, label, name };
  }

  let RawTextInput;
  const AmountRef = elem => (RawTextInput = elem);

  const handleSubmit = async values => {
    const { accountNumber, bank, name } = values;

    makePayment({
      receiverDetails: {
        accountNumber,
      },
      senderDetails: {
        bank: {
          code: 891,
        },
      },
      amount: RawTextInput.getRawValue(),
    });

    await registerUser({
      accountNumber,
      phoneNumber: number,
      bankCode: bank,
      accountName: name,
    });
    navigate(SCREENS.CONTACTS);
  };

  return (
    <Formik
      initialValues={initialState}
      onSubmit={handleSubmit}
      validationSchema={PaymentFormSchema}
    >
      {props => (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? "padding": null}
          keyboardVerticalOffset={Platform.select({ ios: 95, android: 500 })}
        >
          <ScrollView>
            <AccountInfo account={account} />
            <PaymentForm {...props} amountRef={AmountRef} />
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
        amountRef={props.amountRef}
      />
      <HelperText visible={!!props.errors.amount && !!props.touched.amount}>
          {props.errors.amount}
      </HelperText>
    </UserDetailsForm>
  );
};

export default withTheme(Pay);
