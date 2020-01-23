import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    accountInfo: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    accountName: {
      marginTop: 20,
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'space-between',
      marginBottom: 36,
      padding: 10,
      paddingTop: 55,
    },
    formContainer: {
      flex: 1.5,
      padding: 5,
      paddingTop: 30,
    },
    inputContainer: {
      marginBottom: 25,
    },
    payButton: {
      justifyContent: 'center',
      height: 50,
    },
  });
