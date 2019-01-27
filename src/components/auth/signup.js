import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class SignUp extends Component {
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

  signUp = async () => {
    const { password, email } = this.inputs;

    try {
      const user = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email
        }
      });

      if (user.userConfirmed) {
        await Auth.signIn(email, password);
        this.changeState('signedIn', email);
      } else {
        this.signUpSuccess(email)
      }
    } catch (err) {
      this.signUpError(err)
    }
  }

  signUpSuccess(username) {
    this.setState({ error: '' });
    this.changeState('confirmSignUp', username);
  }

  signUpError(err) {
    this.setState({ error: err.message || err });
  }

  render() {
    const { authState } = this.props;
    if (authState !== 'signUp') { return null; }

    const { error } = this.state;

    return (
      <form>
        <TextField
          fullWidth
          type="email"
          placeholder="Email address"
          margin="normal"
          onChange={event => this.inputs.email = event.target.value}
        />
        <TextField
          fullWidth
          type="password"
          placeholder="Password"
          margin="normal"
          onChange={event => this.inputs.password = event.target.value}
        />
        <Button color="primary" onClick={() => this.changeState('signIn')}>
          Back to sign in
        </Button>

        <Button color="primary" onClick={() => this.changeState('confirmSignUp')}>
          Confirm a code
        </Button>
        <Button color="primary" variant="contained"
          onClick={this.signUp}
        >
          Create account
        </Button>
        {error && <span>{error}</span>}
      </form>
    )
  }
}
