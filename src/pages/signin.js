import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';

import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { LoginForm } from '../frontends/auth-react';
import { TextField } from '@material-ui/core';

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
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit * 4,
  },
  buttonsContainer: {
    marginTop: theme.spacing.unit * 10,
    display: 'flex',
    justifyContent: 'space-around',
  },
  logInButton: {
    paddingRight: theme.spacing.unit * 6,
    paddingLeft: theme.spacing.unit * 6,
    display: 'flex-item',
  },
  createAccountButton: {
    display: 'flex-item',
  },
  error: {
    color: theme.palette.error.main
  }
});

function SignIn(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="h5">Sign in</Typography>
          <LoginForm>{({ formData, error, isLoggingIn, onFormDataChange, login }) => (
            //const { email, password } = formData;
            <form className={classes.form}>
              {
                error
                  ? (<div className={classes.error}>Can't login: {error.message}</div>)
                  : null
              }
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Email Address"
                  id="email" name="email" autoComplete="email" autoFocus
                  value={formData.email}
                  onChange={e => onFormDataChange({ email: e.target.value })}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={e => onFormDataChange({ password: e.target.value })}
                />
              </FormControl>
              <div>
                Forgot your password?
                <Button
                  variant="text"
                  color="primary"
                >
                  Reset
                </Button>
              </div>
              <div className={classes.buttonsContainer}>
                <Button
                  className={classes.createAccountButton}
                  variant="text"
                  color="primary"
                  href="/signup"
                >
                  Create account
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.logInButton}
                  onClick={login}
                >
                  {isLoggingIn ? 'Wait...' : 'Log In'}
                </Button>
              </div>
            </form>
          )}
          </LoginForm>
        </Paper>
      </main>
    </React.Fragment>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const SignInPage = withStyles(styles)(SignIn);
