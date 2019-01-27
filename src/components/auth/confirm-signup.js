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

class ConfirmSignUp extends Component {
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
    const { classes, authState, authData } = this.props;
    if (authState !== 'confirmSignUp') { return null; }

    const { message, error } = this.state;

    return (
      <form>
        <TextField
          type="text"
          placeholder="Username"
          defaultValue={authData || ''}
          fullWidth
          margin="normal"
          onChange={event => this.inputs.username = event.target.value}
        />
        <TextField
          type="text"
          placeholder="Code"
          fullWidth
          margin="normal"
          onChange={event => this.inputs.code = event.target.value}
          autoFocus
        />

        <div className={classes.container}>
          <Link component="button" onClick={this.resendCode}>Resend</Link>
        </div>

        <div className={classes.actionContainer}>
          <Link component="button" onClick={() => this.changeState('signIn')}>
            Back to sign in
          </Link>
          <div className={classes.spacer} />

          <Button color="primary" variant="contained" onClick={this.confirmSignUp}>Confirm</Button>
        </div>

        {message && <span>{message}</span>}
        {error && <span>{error}</span>}
      </form>
    )
  }
}

export default withStyles(styles)(ConfirmSignUp)
