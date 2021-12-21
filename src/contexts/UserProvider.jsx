import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { getMyInfo } from '@apis/user';
import PropTypes from 'prop-types';

const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  const addToken = ({ token, userName, userId, group }) => {
    setUserInfo({
      token,
      userName,
      userId,
      group,
    });
  };

  const removeToken = () => {
    sessionStorage.removeItem('authorization');
    setUserInfo({});
  };

  const getInitialData = async () => {
    const { data } = await getMyInfo();
    setUserInfo({
      token: sessionStorage.getItem('authorization'),
      userName: data.userName,
      userId: data.userId,
      group: data.group,
    });
  };

  useEffect(() => {
    sessionStorage.getItem('authorization') && getInitialData();
  }, []);

  return (
    <UserContext.Provider
      value={useMemo(
        () => ({ userInfo, addToken, removeToken }),
        [userInfo, addToken, removeToken],
      )}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.defaultProps = {
  children: '',
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default UserProvider;
