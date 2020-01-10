import React, { useEffect, useContext } from 'react';
import { View, StatusBar } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from 'react-navigation-hooks';
import UserContext from 'shared/contexts/user';
import { SCREENS } from 'constants';

const AuthLoading = () => {
  const userContext = useContext(UserContext);
  const { navigate } = useNavigation();

  const checkOnboardingStatus = async () => {
    const onboardingStatus = await userContext.getOnboardingStatus();
    if (!onboardingStatus) {
      navigate(SCREENS.ONBOARDING);
    } else {
      navigate(SCREENS.ACCOUNTS);
    }
  }

  useEffect(() => {
    checkOnboardingStatus();
  });

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoading;
