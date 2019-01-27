import React, { Component } from 'react'

import { Authenticator } from 'aws-amplify-react';

import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';

import {
  SignIn,
  ConfirmSignIn,
  SignUp,
  ConfirmSignUp,
  ForgotPassword,
  ForgotPasswordReset
} from './index';

import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  }
});

class CustomAuthenticator extends Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Authenticator hideDefault onStateChange={this.props.onStateChange}>
            <SignIn />
            <ConfirmSignIn />
            <SignUp />
            <ConfirmSignUp />
            <ForgotPassword />
            <ForgotPasswordReset />
          </Authenticator>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(CustomAuthenticator);
