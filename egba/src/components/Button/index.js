import React from 'react';
import {
  Button,
} from 'react-native-paper';

import styles from './styles';

const CustomButton = ({ handleSubmit, label }) => (
  <Button
    mode="contained"
    style={styles.payButton}
    dark={true}
    onPress={handleSubmit}
  >
    {label}
  </Button>
);

export default CustomButton;
