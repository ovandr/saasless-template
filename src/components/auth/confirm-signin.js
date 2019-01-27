import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Auth, JS } from 'aws-amplify';

export default class ConfirmSignIn extends Component {
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

  confirmSignIn = async () => {
    const user = this.props.authData;
    const { code } = this.inputs;

    const mfaType = user.challengeName === 'SOFTWARE_TOKEN_MFA'
      ? 'SOFTWARE_TOKEN_MFA'
      : null;

    try {
      await Auth.confirmSignIn(user, code, mfaType);
      this.confirmSuccess(user);
    } catch (err) {
      this.confirmError(err);
    }
  }

  confirmSuccess(user) {
    this.setState({ error: '' });
    this.checkContact(user);
  }

  confirmError(err) {
    this.setState({ error: err.message || err });
  }

  checkContact = async (user) => {
    try {
      const data = await Auth.verifiedContact(user);
      
      if (!JS.isEmpty(data.verified)) {
        this.changeState('signedIn', user);
      } else {
        user = Object.assign(user, data);
        this.changeState('verifyContact', user);
      }
    } catch (err) {
      
    }
  }

  render() {
    const { authState } = this.props;
    if (authState !== 'confirmSignIn') { return null; }
    const { error } = this.state;

    return (
      <form>
        <TextField
          type="text"
          placeholder="Code"
          fullWidth
          onChange={event => this.inputs.code = event.target.value}
          autoFocus
        />
        <Button size="small" preventDefault onClick={() => this.changeState('signIn')}>
          Back to sign in
        </Button>

        <Button variant="contained" color="primary"
          onClick={this.confirmSignIn}
        >
          Confirm
          </Button>
        {error && <span>{error}</span>}
      </form>
    )
  }
}
