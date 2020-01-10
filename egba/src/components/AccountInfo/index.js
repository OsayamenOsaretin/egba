import React from 'react';
import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

import styles from './styles';


const AccountInfo = ({ account }) => {
  const name = account.name;
  const hasImage = account.imageAvailable;

  const avatarType = hasImage ? 'Image' : 'Icon';
  const AccountAvatar = Avatar[avatarType];

  return (
    <View style={styles.accountInfo}>
      <AccountAvatar icon="account-circle" size={134} />
      <View style={styles.accountName}>
        <Text>{name}</Text>
      </View>
    </View>
  );
};

export default AccountInfo;
