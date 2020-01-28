import React from 'react';
import { TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

const AmountTextInput = ({ value, handleChange, amountRef }) => {
  return (
    <TextInput
      value={value}
      onChangeText={handleChange}
      label="How much?"
      render={props => (
        <TextInputMask
          {...props}
          type="money"
          ref={amountRef}
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
};

export default AmountTextInput;
