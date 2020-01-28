import React, { useContext } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import {
  Button,
  ActivityIndicator,
  withTheme,
  Title,
} from 'react-native-paper';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { Formik } from 'formik';

import useGetAccountDetails from 'shared/hooks/getAccountDetails';
import useRegister from 'shared/hooks/register';
import UserContext from 'shared/contexts/user';
import screenStyles from './styles';

import { SCREENS } from 'constants';

import UserDetailsForm from 'components/UserDetailsForm';

const ConfirmDetails = ({ theme }) => {
  const phoneNumber = useNavigationParam('phoneNumber');

  // const phoneNumber = '2347061565279';

  const [userAccount, userAccountLoading] = useGetAccountDetails(phoneNumber);
  const { registerUser } = useRegister();
  const { navigate } = useNavigation();
  const styles = screenStyles(theme);

  const userContext = useContext(UserContext);

  const handleConfirmation = async values => {
    const { bank, accountNumber, name } = values;
    const userData = await registerUser({
      accountName: name,
      bankCode: bank,
      accountNumber,
      phoneNumber,
    });

    if (userData) {
      userContext.setBank(bank);
      userContext.setOnboardingStatus('done');
      navigate(SCREENS.AUTH_LOADING);
    }
  };

  if (userAccountLoading) {
    return <ActivityIndicator />;
  }

  let initialValues = {
    bank: null,
    accountNumber: '',
  };

  if (userAccount && userAccount.length > 0) {
    const [
      { account_number: accountNumber, code, account_name: name },
    ] = userAccount;
    initialValues = { bank: code, accountNumber, name };
  }

  const FormButton = ({ handleSubmit }) => (
    <Button
      mode="contained"
      dark={true}
      onPress={handleSubmit}
      style={styles.button}
    >
      Complete Registration
    </Button>
  );

  return (
    <Formik onSubmit={handleConfirmation} initialValues={initialValues}>
      {props => (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.select({ ios: 95, android: 500 })}
        >
          <View style={styles.formContainer}>
            <Title>
              Bowo needs your details to help you send money conveniently
            </Title>
            <UserDetailsForm initialValues={initialValues} {...props} />
          </View>
          <FormButton handleSubmit={props.handleSubmit} />
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default withTheme(ConfirmDetails);
