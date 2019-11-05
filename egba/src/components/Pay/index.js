import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import {
  Avatar,
  ActivityIndicator,
  Button,
  Text,
  TextInput
} from "react-native-paper";
// import TestInputMask from "react-native-text-input-mask";
import { TextInputMask } from "react-native-masked-text";
import { Formik } from "formik";

import { useNavigator, useNavigationParam } from "react-navigation-hooks";
import CallApi from "api/callApi";

import styles from "./styles";

const useCheckRegistered = account => {
  return [true, false];
};

const Pay = () => {
  const account = useNavigationParam("account");
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <AccountInfo account={account} />
    </KeyboardAvoidingView>
  );
};

const useFetchAccount = account => {
  const { phoneNumbers } = account;
  const [phoneNumber] = phoneNumbers;
  const [userAccount, setUserAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = {
      url: "",
      variables: {
        user: phoneNumber
      }
    };

    const callback = (userAccount, error) => {
      if (error) {
        setError(error);
      }
      setUserAccount(userAccount);
    };

    CallApi(params, callback);
  }, []);

  return [userAccount, error];
};

const PaymentForm = ({ account }) => {
  const [registered, checking] = useCheckRegistered(account);
  const [userAccount, fetchAccountError] = useFetchAccount(account);

  const handlePayment = (receiver, amount) => {
    // get the receiver account details
    // get the sender bank code
    // if (userAccount) {
    // const accountNumber = '';
    // const senderBankCode = '';
    // const ussd = `*${senderBankCode}*${accountNumber}#`
    // // trigger ussd code
    // }
  };

  let Form = UnregisteredUserForm;

  if (checking) {
    return <ActivityIndicator />;
  }

  if (registered) {
    Form = RegisteredUserForm;
  }

  return <Formik>{props => <Form {...props} />}</Formik>;
};

const AccountInfo = ({ account }) => {
  const name = account.name;
  const hasImage = account.imageAvailable;

  const avatarType = hasImage ? "Image" : "Icon";
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
    onPress={handleSubmit}
    mode="contained"
    style={styles.payButton}
    dark={true}
  >
    Send
  </Button>
);

const AmountTextInput = ({ values, handleChange }) => (
  <TextInput
    value={values.amount}
    onChangeText={handleChange("amount")}
    label="How much?"
    render={props => (
      <TextInputMask
        {...props}
        type="money"
        options={{
          precision: 0,
          delimiter: ",",
          unit: "#",
          suffixUnit: ""
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
      <TextInput onChangeText={handleChange("bank")} value={values.amount} />
    </View>
    <View style={styles.inputContainer}>
      <TextInput onChangeText={handleChange("account")} value={values.amount} />
    </View>
    <View style={styles.inputContainer}>
      <AmountTextInput {...props} />
    </View>
    <PayButton />
  </View>
);

export default Pay;
