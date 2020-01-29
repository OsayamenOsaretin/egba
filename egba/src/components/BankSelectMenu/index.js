import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import Menu from 'components/Menu';
import useGetBanks from 'shared/hooks/getBanks';

const BankSelectMenu = ({ handleChange, value }) => {
  const [visible, setVisible] = useState(false);
  const [banks, loadingBanks] = useGetBanks();

  const handleDismiss = () => setVisible(false);
  const handleSelect = bank => {
    handleChange(bank.code);
    setVisible(false);
  };


  if (loadingBanks || !banks) {
    return null;
  }

  const bankCodeMap = banks.reduce((map, bank) => {
    map[bank.code] = bank;
    return map
  }, {});

  let buttonText = 'Select Bank';

  if (value && bankCodeMap) {
    buttonText = bankCodeMap[value].label;
  }

  const MenuButton = () => (
    <Button
      mode="outlined"
      onPress={() => setVisible(true)}
      // icon="arrow-down-drop-circle"
    >
      {buttonText}
    </Button>
  );

  const formattedBanks = banks.map(bank => ({ ...bank, title: bank.label }))

  return (
    <Menu
      items={formattedBanks}
      handleSelect={handleSelect}
      visible={visible}
      anchor={<MenuButton item={value}/>}
      handleDismiss={handleDismiss}
    />
  );
};

export default BankSelectMenu;
