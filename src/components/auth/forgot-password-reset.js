import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class JForgotPasswordReset extends Component {
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

  submit = async () => {
    const username = this.props.authData;
    if (!username) {
      this.setState({ error: 'missing username' });
      return;
    }

    const { code, password } = this.inputs;
    try {
      const data = Auth.forgotPasswordSubmit(username, code, password);
      this.submitSuccess(username, data);
    } catch (err) {
      this.handleError(err)
    }
  }

  submitSuccess(username, data) {
    this.changeState('signIn', username);
  }

  handleError(err) {
    this.setState({ error: err.message || err });
  }

  render() {
    const { authState } = this.props;
    if (authState !== 'forgotPasswordReset') { return null; }

    const { error } = this.state;

    return (
      <form>
        <TextField
          type="text"
          placeholder="Code"
          onChange={event => this.inputs.code = event.target.value}
          autoFocus
        />
        <TextField
          type="password"
          placeholder="Password"
          full
          onChange={event => this.inputs.password = event.target.value}
        />
        <Button color="primary" onClick={() => this.changeState('forgotPassword')}>
          Back to forgot password
        </Button>
        <Button color="primary" onClick={this.submit}>Reset password</Button>
        {error && <span>{error}</span>}
      </form>
    )
  }
}
