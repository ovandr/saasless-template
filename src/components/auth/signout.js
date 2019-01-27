import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import Button from '@material-ui/core/Button';

export default class SignOut extends Component {
  
  signOut = async () => {
    await Auth.signOut();
  }

  render() {
    return (
      <Button onClick={this.signOut}
      >
        Sign Out
      </Button>
    )
  }
}
