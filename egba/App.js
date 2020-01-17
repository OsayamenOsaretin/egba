import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';


import Accounts from './src/screens/Accounts';
import AuthLoading from 'screens/AuthLoading';
import Onboarding from 'screens/Onboarding';
import { SCREENS } from './src/constants';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#054FE5',
    accent: '#f1c40f',
    background: '#EFF7FE',
  },
};

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

const AppContainer = createAppContainer(Navigator);

const App = () => (
  <PaperProvider theme={theme}>
    <AppContainer />
  </PaperProvider>
);

export default App;
