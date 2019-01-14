import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

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

    render() {
        console.log(this.state.userInfo);
        return (
            <div>
                {this.state.userInfo ? (<pre>{JSON.stringify(this.state.userInfo, null, 2)}</pre>) : 'Loading'}
            </div>
        )
    }
}

export default ProfilePage
