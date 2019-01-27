import React, { Component } from 'react';
import { Auth, JS } from 'aws-amplify';
import { withFederated } from 'aws-amplify-react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const FederatedButtons = (props) => (
  <Button color="secondary" variant="contained"
    onClick={props.facebookSignIn}
  >
    Facebook
  </Button>
);

const Federated = withFederated(FederatedButtons);

const federated_data = {
  google_client_id: '',
  facebook_app_id: '__replace_with_your_facebook_app_id__',
  amazon_client_id: ''
};

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.inputs = {};
    this.state = { error: '' }
  }

  changeState = (state, data) => {
    const { onStateChange } = this.props;
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

  signIn = async () => {
    const { username, password } = this.inputs;

    try {
      const user = await Auth.signIn(username, password);
      this.signInSuccess(user);
    } catch (err) {
      this.signInError(err);
    }
  }

  signInSuccess(user) {
    this.setState({ error: '' });

    // There are other sign in challenges we don't cover here.
    // SMS_MFA, SOFTWARE_TOKEN_MFA, NEW_PASSWORD_REQUIRED, MFA_SETUP ...
    if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
      this.changeState('confirmSignIn', user);
    } else {
      this.checkContact(user);
    }
  }

  signInError(err) {
    /*
      err can be in different structure:
        1) plain text message;
        2) object { code: ..., message: ..., name: ... }
    */
    this.setState({ error: err.message || err });
  }

  checkContact = async (user) => {
    try {
      const data = await Auth.verifiedContact(user);
      // if (!JS.isEmpty(data.verified)) {
        this.changeState('signedIn', user);
      // } else {
      //   user = Object.assign(user, data);
      //   this.changeState('verifyContact', user);
      // }
    } catch (err) {

    }
  }

  render() {
    const { authState, authData } = this.props;

    if (!['signIn', 'signedOut', 'signedUp'].includes(authState)) { return null; }
    const { error } = this.state;

    return (
      <form>
        <TextField
          type="text"
          placeholder="Email"
          margin="normal"
          fullWidth
          defaultValue={authData || ''}
          onChange={event => this.inputs.username = event.target.value}
          autoFocus
        />
        <TextField
          type="password"
          placeholder="Password"
          margin="normal"
          fullWidth
          onChange={event => this.inputs.password = event.target.value}
        />
        New to us?{' '}
        <Button color="primary" size="small" onClick={() => this.changeState('signUp')}>
          Sign up
        </Button>

        <Button color="primary" size="small" onClick={() => this.changeState('forgotPassword')}>
          Forgot password
        </Button>
        <Button color="primary" variant="contained"
          onClick={this.signIn}
        >
          Sign In
        </Button>
        <Federated federated={federated_data} onStateChange={this.changeState} />
        {error && <span>{error}</span>}
      </form>
    )
  }
}
