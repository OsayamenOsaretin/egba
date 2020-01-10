export const request = async (method, url, payload) => {
  return fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

export const formatUserDetails = ({
  phoneNumber,
  accountNumber,
  accountName,
  bankCode,
}) => ({
  phone_number: phoneNumber,
  account_number: accountNumber,
  account_name: accountName,
  bank_code: bankCode,
});
