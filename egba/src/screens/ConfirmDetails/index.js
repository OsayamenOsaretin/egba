import React, { useContext } from 'react';
import { Button, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { Formik } from 'formik';

import useGetAccountDetails from 'shared/hooks/getAccountDetails';
import useRegister from 'shared/hooks/register';
import UserContext from 'shared/contexts/user';

import { SCREENS } from 'constants';

import UserDetailsForm from 'components/UserDetailsForm';

const ConfirmDetails = () => {
  const phoneNumber = useNavigationParam('phoneNumber');

  // const phoneNumber = '2347061565279';
  
  const [userAccount, userAccountLoading] = useGetAccountDetails(phoneNumber);
  const { registerUser } = useRegister();
  const { navigate } = useNavigation();

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
      console.log('the value of userData', userData);
      userContext.setBank(bank);
      userContext.setOnboardingStatus('done');
      navigate(SCREENS.AUTH_LOADING);
    }
  };

  if (userAccountLoading) {
    return <ActivityIndicator />;
  }

  let initialValues = {
    bank: '',
    accountNumber: '',
  };

  if (userAccount && userAccount.length > 0) {
    const [{ account_number: accountNumber, label, account_name: name }] = userAccount;
    initialValues = { bank: label, accountNumber, name };
  }

    const FormButton = ({ handleSubmit }) => (
      <Button mode="contained" dark={true} onPress={handleSubmit}>
        Confirm Details
      </Button>
    );

  return (
    <Formik onSubmit={handleConfirmation} initialValues={initialValues}>
      {props => (
        <UserDetailsForm initialValues={initialValues} {...props}>
            <FormButton handleSubmit={props.handleSubmit} />
        </UserDetailsForm>
      )}
    </Formik>
  );
};

export default ConfirmDetails;
