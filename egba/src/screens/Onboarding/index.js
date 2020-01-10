import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { SCREENS } from 'constants';

import Phone from 'screens/Phone';
import ConfirmDetails from 'screens/ConfirmDetails';

const OnboardingStack = createStackNavigator({
    [SCREENS.PHONE]: Phone,
    [SCREENS.CONFIRM_DETAILS]: ConfirmDetails,
}, {
    initialRouteName: `${SCREENS.PHONE}`
});

export default OnboardingStack;
