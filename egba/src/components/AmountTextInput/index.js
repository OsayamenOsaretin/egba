import React from 'react';
import { TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const AmountTextInput = ({ values, handleChange }) => (
  <TextInput
    value={values.amount}
    onChangeText={handleChange('amount')}
    label="How much?"
    render={props => (
      <TextInputMask
        {...props}
        type="money"
        options={{
          precision: 0,
          delimiter: ',',
          unit: '#',
          suffixUnit: '',
        }}
      />
    )}
  />
);

export default AmountTextInput;
