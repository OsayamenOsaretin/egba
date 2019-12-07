import React from 'react';
import { AsyncStorage } from 'react-native';
import { USER_PHONE, USER_FIRST_NAME, USER_BANK } from 'constants';

const userContext = {
  phoneNumber: '',
  firstName: '',
  bank: '',
  setPhoneNumber: async (phoneNumber) => {
    userContext.phoneNumber = phoneNumber;
    await AsyncStorage.setItem(USER_PHONE, phoneNumber);
  },
  getPhoneNumber: async () => {
    const phoneNumber = await AsyncStorage.getItem(USER_PHONE); 
    userContext.phoneNumber = phoneNumber;
    return phoneNumber;
  },
  setFirstName: async (firstName) => {
    userContext.firstName = firstName;
    await AsyncStorage.setItem(USER_FIRST_NAME, phoneNumber);
  },
  getFirstName: async () => {
    const firstName = await AsyncStorage.getItem(USER_FIRST_NAME); 
    userContext.firstName = firstName;
    return firstName;
  },
  setBank: async (bank) => {
    userContext.bank = bank;
    await AsyncStorage.setItem(USER_BANK, bank);
  },
  getBank: async () => {
    const bank = await AsyncStorage.getItem(USER_BANK); 
    userContext.bank = bank;
    return bank;
  }
}

const UserContext = React.createContext(userContext);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;


export default UserContext;
