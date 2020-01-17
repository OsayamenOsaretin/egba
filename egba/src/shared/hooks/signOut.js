import React, { useContext } from 'react';
import UserContext from 'shared/contexts/user';
import { useNavigation } from 'react-navigation-hooks';
import { SCREENS } from 'constants';


const useSignOut = () => {
  const userContext = useContext(UserContext);
  const { navigate } = useNavigation();
  const clearContext = async () => {
    await userContext.clearUserContext();
    navigate(SCREENS.AUTH_LOADING);
  } 
  return { clearContext };
};

export default useSignOut;
