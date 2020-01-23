import { StyleSheet } from 'react-native';

const styles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'space-between',
      marginBottom: 36,
      padding: 10,
      paddingTop: 55,
    },
    formContainer: {
      flex: 5,
    },
    button: {
      padding: 10,
    },
  });

export default styles;
