import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { LoginForm } from '../frontends/auth-react';

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

function SignUp(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="h5">Create your account</Typography>
          <LoginForm>{({ formData, error, isLoggingIn, onFormDataChange, signUp }) => (
            //const { email, password } = formData;
            <form className={classes.form}>
              {
                error
                  ? (<div className={classes.error}>Can't sign up: {error.message}</div>)
                  : null
              }
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input type="email"
                  id="email" name="email" autoComplete="email" autoFocus
                  value={formData.email}
                  onChange={e => onFormDataChange({ email: e.target.value })}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={e => onFormDataChange({ password: e.target.value })}
                />
              </FormControl>
              <div className={classes.buttonsContainer}>
                <Button
                  className={classes.createAccountButton}
                  variant="text"
                  color="primary"
                  href="/signin"
                >
                  Sign in instead
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.logInButton}
                  onClick={signUp}
                >
                  {isLoggingIn ? 'Wait...' : 'Create'}
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

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const SignUpPage = withStyles(styles)(SignUp);
