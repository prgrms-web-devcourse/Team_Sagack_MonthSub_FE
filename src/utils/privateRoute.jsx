import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '@contexts/UserProvider';

const PrivateRoute = ({ component: Component, from, to, ...props }) => {
  const { userInfo } = useUser();
  return (
    <Route
      {...props}
      render={props =>
        userInfo.token || sessionStorage.getItem('authorization') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: to,
              state: { from },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.defaultProps = {
  to: '/signin',
};

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string,
};

export default PrivateRoute;
