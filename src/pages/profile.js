import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import UserInfo from '../components/user-info';

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
            <Card>
                <CardHeader title="Profile Info" />
                <CardContent>
                    {this.state.userInfo ? <UserInfo user={this.state.userInfo} /> : 'Loading'}
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="secondary" onClick={this.deleteUser}>
                        Delete Profile
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default ProfilePage
