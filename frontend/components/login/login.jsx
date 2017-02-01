import React from 'react';
import { withRouter } from 'react-router';

import Auth0Lock from 'auth0-lock'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick() {
    const lock = new Auth0Lock('HQyc8BbQc47Drpa85hJca6t6THDNOAXg', 'justinsuen.auth0.com', {
      auth: {
        redirectUrl: 'http://localhost:3000',
        responseType: 'code',
        params: {
          scope: 'openid email'
        }
      }
    });

    lock.show();
  }

  render() {
    return (
        <div className="session-container">
          <div className="session-form">
            <h2>Login</h2>
            <button onClick={this.handleLoginClick}>Login</button>
          </div>
        </div>
    );
  }
}

export default withRouter(Login);
