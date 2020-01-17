import React from 'react';
import { MaterialHeaderButtons, Item } from 'components/HeaderButton';
import useSignOut from 'shared/hooks/signOut';

const SignOutButton = () => {
  const { clearContext } = useSignOut(); 

  return (
    <MaterialHeaderButtons>
      <Item title="add" iconName="eject" onPress={clearContext} />
    </MaterialHeaderButtons>
  )
};

export default SignOutButton;
