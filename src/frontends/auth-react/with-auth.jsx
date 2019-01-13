import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import Authenticator from './authenticator';

const withAuth = (WrappedComponent) => {
  const C = props => (
    <Authenticator.Context.Consumer>
      {authProps => (
        <WrappedComponent {...props} {...authProps} />
      )}
    </Authenticator.Context.Consumer>
  );

  C.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  C.propTypes = {
    children: PropTypes.any,
  };

  C.defaultProps = {
    children: undefined,
  };

  return hoistStatics(C, WrappedComponent);
};

export default withAuth;
