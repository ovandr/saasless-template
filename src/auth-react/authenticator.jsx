import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const AuthContext = React.createContext();

class Authenticator extends PureComponent {
  constructor(props) {
    super(props);
    if (!props.auth) {
      throw new Error('The \'auth\' prop of an <Authenticator> should be specified');
    }
    this.auth = props.auth;
    this.auth.setNavigationHistory(props.history);
    this.onAuthStateChange = this.onAuthStateChange.bind(this);
    this.state = {
      isAuthenticated: false,
      isReady: false,
    };
  }
  componentDidMount() {
    this.init();
    this.auth.subscribe(this.onAuthStateChange);
  }
  componentWillReceiveProps(nextProps) {
    const { auth } = this;
    const { auth: nextAuth } = nextProps;

    if (auth !== nextAuth) {
      throw new Error('<Authenticator> does not support changing `auth` on the fly.');
    }
  }
  componentWillUnmount() {
    this.auth.unsubscribe(this.onAuthStateChange);
  }
  onAuthStateChange(e) {
    this.updateAuthState(e.eventType === 'loggedIn');
  }
  updateAuthState(isAuthenticated) {
    this.setState({
      isAuthenticated,
    });
  }
  async init() {
    const isAuthenticated = await this.auth.isAuthenticated();
    this.updateAuthState(isAuthenticated);
    this.setState({
      isReady: true,
    });
  }
  render() {
    const { auth, children } = this.props;
    const contextValue = {
      auth,
      isAuthenticated: this.state.isAuthenticated,
    };
    return (
      <AuthContext.Provider value={contextValue}>
        {this.state.isReady ? children : <span>Authenticating...</span>}
      </AuthContext.Provider>
    );
  }
}

Authenticator.Context = AuthContext;

Authenticator.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func,
    user: PropTypes.shape({
      displayName: PropTypes.string,
    }),
    login: PropTypes.func,
    logout: PropTypes.func,
    getProfile: PropTypes.func,
  }),
  history: PropTypes.object.isRequired,
};

Authenticator.defaultProps = {
  auth: undefined,
};

export default withRouter(Authenticator);
