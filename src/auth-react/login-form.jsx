import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withAuth from './with-auth';

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    if(!props.children || typeof props.children !== 'function') {
      throw new Error('LoginForm only accepts function as a child');
    }
    this.state = {
      formData: {
        email: '',
        password: '',
      },
      isLoggingIn: false,
      error: undefined,
    };
    this.onFormDataChange = this.onFormDataChange.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.sendConfirmationCode = this.sendConfirmationCode.bind(this);
    this.verify = this.verify.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onFormDataChange(formData) {
    this._setState({
      formData: {
        ...this.state.formData,
        ...formData,
      },
    });
  }
  _setState(state) {
    if(this._isMounted) {
      this.setState(state);
    }
  }
  async login() {
    this._setState({
      isLoggingIn: true,
      error: undefined,
    });
    try {
      await this.props.auth.login(this.state.formData);
      this._setState({
        isLoggingIn: false,
      });
    } catch(error) {
      this._setState({
        error,
        isLoggingIn: false,
      });
    }
  }
  async signUp() {
    this._setState({
      isLoggingIn: true,
      error: undefined,
    });
    try {
      await this.props.auth.signUp(this.state.formData);
      this._setState({
        isLoggingIn: false,
      });
    } catch(error) {
      this._setState({
        error,
        isLoggingIn: false,
      });
    }
  }
  async sendConfirmationCode() {
    this._setState({
      isLoggingIn: true,
      error: undefined,
    });
    try {
      await this.props.auth.sendConfirmationCode(this.state.formData);
      this._setState({
        _setState: false,
      });
    } catch(error) {
      this._setState({
        error,
        isLoggingIn: false,
      });
    }
  }

  async verify() {
    this._setState({
      isLoggingIn: true,
      error: undefined,
    });
    try {
      await this.props.auth.verify(this.state.formData);
      this._setState({
        isLoggingIn: false,
      });
    } catch(error) {
      this._setState({
        error,
        isLoggingIn: false,
      });
    }
  }

  render() {
    const { children } = this.props;
    return children({
      onFormDataChange: this.onFormDataChange,
      login: this.login,
      signUp: this.signUp,
      sendConfirmationCode: this.sendConfirmationCode,
      verify: this.verify,
      ...this.state,
    });
  }
}

LoginForm.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
};

export default withAuth(LoginForm);
