import { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions';
import { useNavigation } from 'react-navigation-hooks';
import { SCREENS } from 'constants';

export const useCheckContactPermission = () => {
  const { navigate } = useNavigation();
  const [grantStatus, setGrantStatus] = useState(false);

  useEffect(() => {
    let didCancel = false;
    const checkPermission = async () => {
      const { status } = await Permissions.getAsync(Permissions.CONTACTS);
      if (status !== 'granted' && !didCancel) {
        navigate(SCREENS.CONTACT_PERMISSIONS);
      } else {
        setGrantStatus(true);
      }
    };
    checkPermission();
    return () => {
      didCancel = true;
    };
  });

  return [grantStatus];
};

export const useAskContactPermission = grantCallback => {
  const [status, setStatus] = useState('');
  const askContactPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    setStatus(status);
  };
  useEffect(() => {
    if (status === 'granted') {
      grantCallback();
    }
  }, [status]);

  return { askContactPermission };
};
