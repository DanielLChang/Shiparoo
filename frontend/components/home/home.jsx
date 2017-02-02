import React from 'react';
import { withRouter, Link, browserHistory } from 'react-router';

import Package from '../package/package';
import Auth0Lock from 'auth0-lock';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: !!localStorage.getItem('profile')
    };

    this.lock = new Auth0Lock('HQyc8BbQc47Drpa85hJca6t6THDNOAXg', 'justinsuen.auth0.com', {
      auth: {
        redirectUrl: 'http://localhost:3000/home',
        responseType: 'token'
      }
    });

    this.lock.on = this.lock.on.bind(this);
    this.lock.getUserInfo = this.lock.getUserInfo.bind(this);

    this.lock.on("authenticated", function(authResult) {
      this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          return;
        }

        localStorage.setItem("accessToken", authResult.accessToken);
        localStorage.setItem("profile", JSON.stringify(profile));
        browserHistory.replace('/');
      });
    });

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLoginClick() {
    this.lock.show();
  }


  handleLogoutClick() {
    localStorage.removeItem("profile");
    localStorage.removeItem("accessToken");
    this.setState({loggedIn: false});
  }

  render() {
    return (
      <div className={"home-container"}>
        <Package />
        { this.state.loggedIn ?
          <button onClick={this.handleLogoutClick}>Logout</button> :
          <button onClick={this.handleLoginClick}>Login</button> }
      </div>
    );
  }
}

export default withRouter(Home);
