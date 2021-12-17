import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '../contexts/UserProvider';

const PersonalRoute = ({ component: Component, from, to, ...props }) => {
  const { userInfo } = useUser();
  return (
    <Route
      {...props}
      render={props =>
        userInfo.token ? (
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

PersonalRoute.propTypes = {
  component: PropTypes.element.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default PersonalRoute;
