import React from 'react';
import { useUser } from '@contexts/UserProvider';
import LaptopHeader from './LaptopHeader';
import ResponsiveHeader from './ResponsiveHeader';

const Header = () => {
  const { userInfo } = useUser();
  return (
    <>
      <LaptopHeader userId={userInfo.userId} />
      <ResponsiveHeader userId={userInfo.userId} />
      {userInfo.userId}
    </>
  );
};

export default Header;
