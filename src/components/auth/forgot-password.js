import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  spacer: {
    flexGrow: 1
  },
  actionContainer: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'baseline'
  }
});

class ForgotPassword extends Component {
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
    const { classes, authState, authData } = this.props;
    if (authState !== 'forgotPassword') { return null; }

    const { error } = this.state;

    return (
      <form>
        <TextField
          type="email"
          placeholder="Email"
          defaultValue={authData || ''}
          fullWidth
          margin="normal"
          onChange={event => this.inputs.username = event.target.value}
          autoFocus
        />

        <div className={classes.actionContainer}>
          <Link component="button" onClick={() => this.changeState('signIn')}>
            Back to sign in
          </Link>
          <div className={classes.spacer} />
          <Button color="primary" variant="contained" onClick={this.sendCode}>Send reset code</Button>
        </div>

        {error && <span>{error}</span>}
      </form>
    )
  }
}

export default withStyles(styles)(ForgotPassword)
