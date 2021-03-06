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

class SignUp extends Component {
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

  signUp = async () => {
    const { password, email } = this.inputs;

    try {
      this.setState({ loading: true });
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

    this.setState({ loading: false });
  }

  signUpSuccess(username) {
    this.setState({ error: '' });
    this.changeState('confirmSignUp', username);
  }

  signUpError(err) {
    this.setState({ error: err.message || err });
  }

  render() {
    const { classes, authState } = this.props;
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

        <div className={classes.container}>
          <Link component="button" onClick={() => this.changeState('confirmSignUp')}>
            Confirm a code
          </Link>
        </div>

        <div className={classes.actionContainer}>
          <Link component="button" onClick={() => this.changeState('signIn')}>
            Back to sign in
          </Link>
          <div className={classes.spacer} />

          <Button color="primary" variant="contained"
            onClick={this.signUp}
          >
            {this.state.loading ? 'Wait...' : 'Create account'}
          </Button>
        </div>

        {error && <span>{error}</span>}
      </form>
    )
  }
}

export default withStyles(styles)(SignUp);
