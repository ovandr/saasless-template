import React, { Component } from 'react'

export default class UserInfo extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <ul>
          <li>Email address: {user.attributes.email}</li>
          <li>Email verified: {user.attributes.email_verified.toString()}</li>
        </ul>
        <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
      </div>
    )
  }
}
