import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { SCREENS } from 'constants';

import Phone from 'screens/Phone';
import ConfirmDetails from 'screens/ConfirmDetails';
import ContactPermissions from 'screens/ContactPermissions';

const OnboardingStack = createStackNavigator({
    [SCREENS.PHONE]: Phone,
    [SCREENS.CONFIRM_DETAILS]: ConfirmDetails,
    [SCREENS.CONTACT_PERMISSIONS]: ContactPermissions,
}, {
    initialRouteName: `${SCREENS.PHONE}`
});

export default OnboardingStack;
