import { Linking } from 'expo';

const makePayment = ({ receiverDetails: { accountNumber }, senderDetails: { bank }, amount  }) => {
  const ussdCode = `*${bank.code}*${amount}*${accountNumber}#`
  const linkUrl = `tel:${ussdCode}`;
  Linking.openURL(linkUrl);
};

export default makePayment;
