import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class ConfirmSignUp extends Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = { message: '', error: '' }
  }

  changeState = (state, data) => {
    const { onStateChange } = this.props;
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

  confirmSignUp = async () => {
    const username = this.props.authData || this.inputs.username;
    const { code } = this.inputs;

    try {
      await Auth.confirmSignUp(username, code);
      this.confirmSuccess(username);
    } catch (err) {
      this.handleError(err)
    }
  }

  resendCode = async () => {
    const username = this.props.authData || this.inputs.username;

    try {
      await Auth.resendSignUp(username);
      this.setState({ message: 'Code was sent' })
    } catch (err) {
      this.handleError(err)
    }
  }

  confirmSuccess(username) {
    this.setState({ message: '', error: '' });
    this.changeState('signIn', username);
  }

  handleError(err) {
    this.setState({ message: '', error: err.message || err });
  }

  render() {
    const { authState, authData } = this.props;
    if (authState !== 'confirmSignUp') { return null; }

    const { message, error } = this.state;

    return (
      <form>
        <TextField
          type="text"
          placeholder="Username"
          defaultValue={authData || ''}
          fullWidth
          onChange={event => this.inputs.username = event.target.value}
        />
        <TextField
          type="text"
          placeholder="Code"
          fullWidth
          onChange={event => this.inputs.code = event.target.value}
          autoFocus
        />
        <Button color="primary" onClick={() => this.changeState('signIn')}>
          Back to sign in
        </Button>
        <Button color="primary" onClick={this.confirmSignUp}>Confirm</Button>
        <Button color="primary" variant="contained" onClick={this.resendCode}>Resend</Button>
        {message && <span>{message}</span>}
        {error && <span>{error}</span>}
      </form>
    )
  }
}
