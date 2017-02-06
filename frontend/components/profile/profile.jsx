// Not used...

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

  getCreateDate() {
    const date = this.state.profile.created_at.split("");
    const year = date.slice(0, 4).join("");
    const month = date.slice(5, 7).join("");
    const day = date.slice(8, 10).join("");
    return month + "/" + day + "/" + year;
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
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Member since:</strong> {this.getCreateDate()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
