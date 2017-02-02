import React, { Component, PropTypes } from 'react';
import { withRouter, browserHistory } from 'react-router';

import AuthService from '../../utils/auth_services';
import Auth0Lock from 'auth0-lock';

class Login extends Component {
  constructor(props) {
    super(props);

    this.lock = new Auth0Lock('HQyc8BbQc47Drpa85hJca6t6THDNOAXg', 'justinsuen.auth0.com', {
      auth: {
        redirectUrl: 'http://localhost:3000/home',
        responseType: 'token',
      },
    });

    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <div className={"home-container"}>
        <button onClick={this.login.bind(this)}>Login</button>
      </div>
    );
  }
}

export default withRouter(Login);
