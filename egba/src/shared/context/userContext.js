import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

const USER_BANK = "user bank";
const USER_PHONE_NUMBER = "user phone number";

const userContext = createContext();

function UserContextProvider({ children }) {
  const [userBank, setUserBank] = useState(null);
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);

  const initialValue = {
    userBank,
    userPhoneNumber,
    getUserBankAsync: async () => {
      const userBank = await AsyncStorage.getItem(USER_BANK);
      setUserBank(userBank);
      return userBank;
    },
    getUserPhoneNumber: async () => {
      const userPhoneNumber = await AsyncStorage.getItem(uSER_PHONE_NUMBER);
      setUserPhoneNumber(userPhoneNumber);
      return userPhoneNumber;
    },
    setuserBankAsync: async bank => {
      await AsyncStorage.setItem(USER_BANK, bank);
      setUserBank(bank);
    },
    setUserPhoneNumberAsync: async phone => {
      await AsyncStorage.setItem(USER_PHONE_NUMBER, phone);
      setUserPhoneNumber(phone);
    }
  };

  useEffect(() => {
    async function getUserDetailsOnLoad() {
      const bank = await AsyncStorage.getItem(USER_BANK);
      setUserBank(bank);
      const phone = await AsyncStorage.getItem(USER_PHONE_NUMBER);
      setUserPhoneNumber(phone);
    }
  }, []);

  return (
    <UserContext.Provider value={initialValue}>{children}</UserContext.Provider>
  );
}

export default { userContext, UserContextProvider }
