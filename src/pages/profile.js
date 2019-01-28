import React, { Component } from "react";
import { Auth } from "aws-amplify";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import withStyles from '@material-ui/core/styles/withStyles';

import UserInfo from "../components/user-info";


const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 3
  }
});

class Profile extends Component {
  state = {
    user: undefined,
    showConfirmDialog: false,
    verificationCode: "",
    snackbarMessage: "",
    oldPassword: "",
    newPassword: ""
  };

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
  };

  verificationCodeChange = e => {
    this.setState({ verificationCode: e.target.value });
  };

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  verifyUser = async () => {
    const { verificationCode } = this.state;

    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", verificationCode);
      this.setState({ snackbarMessage: "Email successfully verified" });
      this.updateUserInfo();
    } catch (e) {
      this.setState({ snackbarMessage: e.message ? e.message : e });
    }
  };

  deleteProfile = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user.deleteUser(() => {});
    await Auth.signOut();
    this.handleClose();
  };

  handleCloseSnackBar = () => {
    this.setState({ snackbarMessage: "" });
  };

  requestCode = async () => {
    try {
      await Auth.verifyCurrentUserAttribute("email");
      this.setState({ snackbarMessage: "Verification code was sent" });
    } catch (e) {
      this.setState({ snackbarMessage: e.message });
    }
  };

  changePassword = async () => {
    const { oldPassword, newPassword } = this.state;
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldPassword, newPassword);
      this.setState({
        oldPassword: "",
        newPassword: "",
        snackbarMessage: "Password was changed"
      });
    } catch (e) {
      this.setState({ snackbarMessage: e.message });
    }
  };

  render() {
    const { classes } = this.props;
    const { user } = this.state;

    const loading = (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );

    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardHeader title="Profile Info" />
          <CardContent>
            {this.state.user ? <UserInfo user={this.state.user} /> : loading}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.deleteUser}
            >
              Delete Profile
            </Button>
          </CardActions>
        </Card>

        {user && (
          <Card className={classes.card}>
            <CardHeader title="Change Password" />
            <CardContent>
              <form>
                <TextField
                  type="password"
                  placeholder="Old Password"
                  defaultValue={""}
                  fullWidth
                  margin="normal"
                  onChange={e => this.handleChange("oldPassword", e.target.value)}
                  autoFocus
                />

                <TextField
                  type="password"
                  placeholder="New Password"
                  defaultValue={""}
                  fullWidth
                  margin="normal"
                  onChange={e => this.handleChange("newPassword", e.target.value)}
                />
              </form>
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                onClick={this.changePassword}
              >
                Change Password
              </Button>
            </CardActions>
          </Card>
        )}

        {user && !user.attributes.email_verified && (
          <Card className={classes.card}>
            <CardHeader title="Email Verification" />
            <CardContent>
              <TextField
                label="Verification Code"
                fullWidth
                onChange={e => this.handleChange("verificationCode", e.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={this.verifyUser}
              >
                Verify
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.requestCode}
              >
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
          <DialogTitle id="alert-dialog-title">
            {"Do you want to Delete your account?"}
          </DialogTitle>
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
          open={this.state.snackbarMessage !== ""}
          autoHideDuration={4000}
          onClose={this.handleCloseSnackBar}
          ContentProps={{ "aria-describedby": "message-id" }}
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
    );
  }
}

export default withStyles(styles)(Profile)
