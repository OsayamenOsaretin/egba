import { StyleSheet } from 'react-native';

const styles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'space-between',
      marginBottom: 36,
      padding: 10,
      paddingTop: 100,
    },
    button: {
      padding: 10,
    },
    headline: {
      marginBottom: 20,
    },
  });

export default styles;
