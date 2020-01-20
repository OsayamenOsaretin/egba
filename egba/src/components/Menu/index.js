import React from 'react';
import { Menu } from 'react-native-paper';

const CustomMenu = ({ items, handleSelect, visible, anchor, handleDismiss }) => {
  return (
    <Menu visible={visible} anchor={anchor} onDismiss={handleDismiss}>
      {items.map(item => (
        <Menu.Item title={item.title} onPress={() => handleSelect(item)} key={item.title}/>
      ))}
    </Menu>
  );
};

export default CustomMenu;
