import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withAuth from './with-auth';

class Logout extends PureComponent {
  constructor(props) {
    super(props);
    if (!props.children || typeof props.children !== 'function') {
      throw new Error('Logout only accepts function as a child');
    }
    this.state = {
      error: undefined,
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  _setState(state) {
    if (this._isMounted) {
      this.setState(state);
    }
  }
  async logout() {
    try {
      await this.props.auth.logout();
      this._setState({
        isLoggingOut: false,
      });
    } catch (error) {
      this._setState({
        error,
        isLoggingOut: false,
      });
    }
  }
  render() {
    const { children } = this.props;
    return children({
      logout: this.logout,
    });
  }
}

Logout.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
};

export default withAuth(Logout);
