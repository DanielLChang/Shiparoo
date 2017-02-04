import React from 'react';
import { withRouter, Link, browserHistory } from 'react-router';

import Header from '../header/header';

class ProfileModal extends React.Component {
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

  handleModalClose() {
    const modal = document.getElementById("profile-modal");
    modal.style.display = "none";
  }

  render() {
    const { profile } = this.state;

    return (
      <div id="profile-modal"
        className="profile-modal"
        style={{display: 'none'}}>
        <div className="profile-modal-content">
          <div className="pm-header">
            <i className="fa fa-times-circle close" onClick={this.handleModalClose}></i>
          </div>
          { this.pictureCheck() }
          <div className="profile-text">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email ? profile.email : "No email provided"}</p>
            <p><strong>Nickname:</strong> {profile.nickname}</p>
            <p><strong>Member since:</strong> {this.getCreateDate()}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileModal;