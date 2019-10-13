import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import { SCREENS } from '../../../src/constants';
import Contacts from "../../../src/components/Contacts";
import Pay from "../../../src/components/Pay";

const AccountStack = createStackNavigator({
  [SCREENS.CONTACTS]: { screen: Contacts },
  [SCREENS.PAY]: { screen: Pay },
}, {
    initialRouteName: `${SCREENS.CONTACTS}`
});

export default AccountStack;
