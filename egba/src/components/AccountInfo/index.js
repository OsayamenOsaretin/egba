import React from 'react';
import { View } from 'react-native';
import { Avatar, Title } from 'react-native-paper';

import styles from './styles';


const AccountInfo = ({ account }) => {
  const name = account.name;
  const hasImage = account.imageAvailable;

  const avatarType = hasImage ? 'Image' : 'Icon';
  const AccountAvatar = Avatar[avatarType];

  return (
    <View style={styles.accountInfo}>
      <View style={styles.accountName}>
        <Title>{name}</Title>
      </View>
    </View>
  );
};

export default AccountInfo;
