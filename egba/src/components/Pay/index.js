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
import styles from "./styles";

const GET_USER_ACCOUNT_ENDPOINT = 'http://localhost:8000/api';

const useGetAccount = account => {
  // fetch the account using the fetch api
  const [loading, setLoading] = useState(true);
  const [userAccount, setUserAccount] = useState(null);

  const fetchUserAccountData = async (setAccount) => {
    try {
      const data = await fetch(GET_USER_ACCOUNT_ENDPOINT, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
          phone: account.phoneNumbers[0]
        })
      });
      console.log(data, "the value of data is given");
      setAccount(data);
    } catch (error) {
      console.log(error, "the fetch error");
    }
  }

  useEffect(() => {
    fetchUserAccountData(setUserAccount);
    setLoading(false);
  }, [account]);
  return [userAccount, loading];
};


const Pay = () => {
  const account = useNavigationParam("account");
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <AccountInfo account={account} />
      <PaymentForm account={account} />
    </KeyboardAvoidingView>
  );
};

const PaymentForm = ({ account }) => {
  const [accountDetails, loading] = useGetAccount(account);

  let Form = UnregisteredUserForm;

  if (loading) {
    return <ActivityIndicator />;
  }

  if (accountDetails) {
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
  <Button mode="contained" style={styles.payButton} dark={true}>
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
