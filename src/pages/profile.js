import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Button } from '@material-ui/core';

export class ProfilePage extends Component {
    state = {
        userInfo: undefined
    }

    componentDidMount() {
        this.updateUserInfo();
    }

    async updateUserInfo() {
        const user = await Auth.currentUserInfo();
        this.setState({
            userInfo: user
        });
    }

    async deleteUser() {
        const user = await Auth.currentAuthenticatedUser();
        user.deleteUser(() => { });
    }

    render() {
        console.log(this.state.userInfo);
        return (
            <div>
                {this.state.userInfo ? (<pre>{JSON.stringify(this.state.userInfo, null, 2)}</pre>) : 'Loading'}
                <Button variant="contained" color="secondary" onClick={this.deleteUser}>Delete Profile</Button>
            </div>
        )
    }
}

export default ProfilePage
