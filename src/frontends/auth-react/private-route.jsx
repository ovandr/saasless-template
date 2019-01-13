import React from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
  Route,
  Redirect,
} from 'react-router-dom';

import withAuth from './with-auth';

const PrivateRoute = ({
  auth,
  isAuthenticated,
  location,
  ...props
}) => (
  isAuthenticated ?
    <Route {...props} /> :
    <Redirect to={{ pathname: auth.getLoginPath(), search: `redirect=${location.pathname}` }} />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withAuth(withRouter(PrivateRoute));
