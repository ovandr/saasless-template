import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  container: {
    textAlign: 'right'
  },
  spacer: {
    flexGrow: 1
  },
  actionContainer: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'baseline'
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.inputs = {};
    this.state = {
      error: '',
      loading: false
    }
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
      this.setState({ loading: true });
      const user = await Auth.signIn(username, password);
      this.signInSuccess(user);
    } catch (err) {
      this.signInError(err);
    }


    this.setState({ loading: false });
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
    const { classes, authState, authData } = this.props;

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

        <div className={classes.container}>
          <Link component="button" onClick={() => this.changeState('forgotPassword')}>
            Forgot password
          </Link>
        </div>

        <div className={classes.actionContainer}>
          New to us?  
          <Link component="button" onClick={() => this.changeState('signUp')}>
            Sign up
          </Link>
          <div className={classes.spacer}/>

          <Button color="primary" variant="contained"
            onClick={this.signIn}
          >
            {this.state.loading ? 'Wait...' : 'Sign In'}
          </Button>
        </div>

        {error && <span>{error}</span>}
      </form>
    )
  }
}

export default withStyles(styles)(SignIn);
