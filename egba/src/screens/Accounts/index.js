import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import { SCREENS } from 'constants';
import Contacts from 'screens/Contacts';
import Pay from 'screens/Pay';

const AccountStack = createStackNavigator({
  [SCREENS.CONTACTS]: { screen: Contacts },
  [SCREENS.PAY]: { screen: Pay },
}, {
    initialRouteName: `${SCREENS.CONTACTS}`
});

export default AccountStack;
