import React from 'react';
import { Link, browserHistory } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.auth.loggedIn(),
      profile: JSON.parse(localStorage.getItem("profile"))
    };

    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile});
    });

    this.redirectHome = this.redirectHome.bind(this);
    this.redirectProfile = this.redirectProfile.bind(this);
    this.redirectPackages = this.redirectPackages.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.auth.logout();
    this.setState({ loggedIn: false, profile: null });
    this.redirectHome();
  }

  redirectProfile() {
    document.getElementById('profile-modal').style.display = "block";
    // browserHistory.push("/profile");
  }

  redirectHome() {
    browserHistory.push("/home");
  }

  redirectPackages() {
    browserHistory.push("/packages");
  }

  headerUser() {
    const { auth } = this.props;
    const { profile } = this.state;

    if (auth.loggedIn()) {
      return (
        <div className="header-user">
          <div className="menu-links">
            <button className="menu-btn" onClick={this.redirectHome}>Track Package</button>
            <button className="menu-btn" onClick={this.redirectPackages}>All Packages</button>
          </div>
          <button className="user-btn" onClick={this.redirectProfile}>
            <img src={profile.picture}></img>
            <h3>{profile.nickname}</h3>
          </button>
          <button className="sess-btn" onClick={this.logout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="header-user">
          <button className="sess-btn" onClick={auth.login.bind(this)}>Login</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="header">
        <button onClick={this.redirectHome} className="logo">
          <img src="https://res.cloudinary.com/dxfu1kzhk/image/upload/v1486068145/logo_white_uem0ko.png"></img>
          <h1>Shiparoo</h1>
        </button>

        { this.headerUser() }
      </div>
    );
  }
}

export default Header;
