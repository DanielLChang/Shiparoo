import React from 'react';
import { withRouter, browserHistory } from 'react-router';

import Auth0Lock from 'auth0-lock';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: !!localStorage.getItem('profile')
    };

    this.lock = new Auth0Lock('HQyc8BbQc47Drpa85hJca6t6THDNOAXg', 'justinsuen.auth0.com', {
      auth: {
        redirectUrl: 'http://localhost:3000/home',
        responseType: 'id_token',
        params: {scope: 'openid email username name nickname user_id'}
      },
    });

    this.lock.on = this.lock.on.bind(this);
    this.lock.getProfile = this.lock.getProfile.bind(this);

    this.lock.on("authenticated", function(authResult) {
      this.lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
          return;
        }

        localStorage.setItem("idToken", authResult.idToken);
        localStorage.setItem("profile", JSON.stringify(profile));
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
    localStorage.removeItem("idToken");
    this.setState({loggedIn: false});
  }

  render() {
    return (
      <div className={"home-container"}>
        <button onClick={this.handleLoginClick}>Login</button>
      </div>
    );
  }
}

export default withRouter(Login);
