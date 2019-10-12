import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import { SCREENS } from '../../../src/constants';
import Contacts from "../../../src/components/Contacts";

const AccountStack = createStackNavigator({
  [SCREENS.CONTACTS]: { screen: Contacts },
  [SCREENS.PAY]: { screen: Contacts },
}, {
    initialRouteName: `${SCREENS.CONTACTS}`
});

export default AccountStack;
