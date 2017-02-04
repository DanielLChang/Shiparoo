import React from 'react';
import { withRouter, Link, browserHistory } from 'react-router';

import Header from '../header/header';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: JSON.parse(localStorage.getItem("profile"))
    };
  }

  pictureCheck() {
    const { profile } = this.state;

    if (profile.identities[0].provider === "facebook") {
      return (<img src={profile.picture_large}></img>);
    } else {
      return (<img src={profile.picture}></img>);
    }
  }

  render() {
    const { profile } = this.state;

    return (
      <div className="home-container">
        <Header auth={this.props.auth}/>
        <div className="main-container profile-page">
          <div className="user-profile">
            { this.pictureCheck() }
            <div className="profile-text">
              <p>Name: {profile.name}</p>
              <p>Email: {profile.email}</p>
              <p>Nickname: {profile.nickname}</p>
              <p>Created At: {profile.created_at}</p>
              <p>Updated At: {profile.updated_at}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
