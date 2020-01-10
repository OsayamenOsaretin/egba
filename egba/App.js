import { createAppContainer, createSwitchNavigator } from 'react-navigation';


import Accounts from './src/screens/Accounts';
import AuthLoading from 'screens/AuthLoading';
import Onboarding from 'screens/Onboarding';
import { SCREENS } from './src/constants';

const Navigator = createSwitchNavigator(
  {
    [SCREENS.AUTH_LOADING]: AuthLoading,
    [SCREENS.ACCOUNTS]: Accounts,
    [SCREENS.ONBOARDING]: Onboarding,
  },
  {
    initialRouteName: `${SCREENS.AUTH_LOADING}`,
  },
);

export default createAppContainer(Navigator);
