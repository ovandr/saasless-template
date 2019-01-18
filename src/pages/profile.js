import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import { Button } from '@material-ui/core';
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

import UserInfo from '../components/user-info';

export class ProfilePage extends Component {
  state = {
    user: undefined,
    showConfirmDialog: false
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

  deleteProfile = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user.deleteUser(() => { });
    this.handleClose();
  }

  render() {
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
      </React.Fragment>
    )
  }
}

export default ProfilePage
