import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 36,
    padding: 20,
    paddingTop: 150,
  },
  grantButton: {
    padding: 10,
  }
});

export default styles;
