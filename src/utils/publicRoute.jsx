import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '@contexts/UserProvider';

const PublicRoute = ({ component: Component, from, to, ...props }) => {
  const { userInfo } = useUser();
  return (
    <Route
      {...props}
      render={props =>
        userInfo.token || sessionStorage.getItem('authorization') ? (
          <Redirect
            to={{
              pathname: to,
              state: { from },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PublicRoute.defaultProps = {
  to: '/signin',
};

PublicRoute.propTypes = {
  component: PropTypes.element.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string,
};

export default PublicRoute;
