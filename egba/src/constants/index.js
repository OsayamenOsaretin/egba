import config from 'config';

const { BASE_URL } = config;

export const SCREENS = {
  AUTH_LOADING: 'AuthLoading',
  ONBOARDING: 'Onboarding',
  ACCOUNTS: 'Accounts',
  CONTACTS: 'Contacts',
  PAY: 'Pay',
  PHONE: 'Phone',
  CONFIRM_DETAILS: 'Confirm Details',
};

export const USER_PHONE = 'User Phone';
export const USER_FIRST_NAME = 'User first name';
export const USER_BANK = 'User bank';
export const ONBOARDING_STATUS = 'Onboarding Status';
export const USER_CONTEXT = [
  USER_PHONE,
  USER_FIRST_NAME,
  USER_BANK,
  ONBOARDING_STATUS,
];

export const REGISTER_URL = `${BASE_URL}/client/signup`;
export const USER_DETAILS_URL = `${BASE_URL}/client/bank-details/`;
export const BANKS_URL = `${BASE_URL}/bank?status=active`;
