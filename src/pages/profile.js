import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import UserInfo from '../components/user-info';

class Profile extends Component {
  state = {
    user: undefined,
    showConfirmDialog: false,
    verificationCode: '',
    snackbarMessage: ''
  }

  componentDidMount() {
    this.updateUserInfo();
  }

  handleClose = () => {
    this.setState({ showConfirmDialog: false });
  };

  async updateUserInfo() {
    const user = await Auth.currentUserInfo();
    this.setState({ user });
  }

  deleteUser = () => {
    this.setState({ showConfirmDialog: true });
  }

  verificationCodeChange = (e) => {
    this.setState({ verificationCode: e.target.value });
  }

  verifyUser = async () => {
    const { verificationCode } = this.state;

    try {
      await Auth.verifyCurrentUserAttributeSubmit('email', verificationCode);
      this.setState({ snackbarMessage: 'Email successfully verified' });
    } catch(e) {
      this.setState({ snackbarMessage: e.message ? e.message : e });
    }
  }

  deleteProfile = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user.deleteUser(() => { });
    await Auth.signOut();
    this.handleClose();
  }

  handleCloseSnackBar = () => {
    this.setState({ snackbarMessage: '' });
  }

  requestCode = async () => {
    try {
      await Auth.verifyCurrentUserAttribute('email');
      this.setState({ snackbarMessage: 'Verification code was sent' });
    } catch(e) {
      this.setState({ snackbarMessage: e.message });
    }
  }

  render() {
    const { user } = this.state;

    const loading = (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );

    return (
      <React.Fragment>
        <Card>
          <CardHeader title="Profile Info" />
          <CardContent>
            {this.state.user ? <UserInfo user={this.state.user} /> : loading}
          </CardContent>
          <CardActions>
            <Button variant="contained" color="secondary" onClick={this.deleteUser}>
              Delete Profile
            </Button>
          </CardActions>
        </Card>

        {(user && !user.attributes.email_verified) && (
          <Card>
            <CardHeader title="Email Verification" />
            <CardContent>
              <TextField label="Verification Code" fullWidth
                onChange={this.verificationCodeChange} />
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={this.verifyUser}>
                Verify
            </Button>
              <Button variant="contained" color="primary" onClick={this.requestCode}>
                Request New Code
            </Button>
            </CardActions>
          </Card>
        )}

        <Dialog
          open={this.state.showConfirmDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Do you want to Delete your account?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              All content will be deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.deleteProfile} color="secondary">
              Delete
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={this.state.snackbarMessage !== ''}
          autoHideDuration={4000}
          onClose={this.handleCloseSnackBar}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackBar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </React.Fragment>
    )
  }
}

export const ProfilePage = Profile;
