import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class ForgotPassword extends Component {
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

  sendCode = async () => {
    const username = this.props.authData || this.inputs.username;
    try {
      const data = await Auth.forgotPassword(username);
      this.sendSuccess(username, data);
    } catch (err) {
      this.handleError(err);
    }
  }

  sendSuccess(username, data) {
    this.changeState('forgotPasswordReset', username);
  }

  handleError(err) {
    this.setState({ error: err.message || err });
  }

  render() {
    const { authState, authData } = this.props;
    if (authState !== 'forgotPassword') { return null; }

    const { error } = this.state;

    return (
      <form>
        <TextField
          type="text"
          placeholder="Username"
          defaultValue={authData || ''}
          fullWidth
          onChange={event => this.inputs.username = event.target.value}
          autoFocus
        />
        <Button color="primary" onClick={() => this.changeState('signIn')}>
          Back to sign in
        </Button>

        <Button color="primary" variant="contained" onClick={this.sendCode}>Send password reset code</Button>
        {error && <span>{error}</span>}
      </form>
    )
  }
}
