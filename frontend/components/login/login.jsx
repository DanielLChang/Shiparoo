import React, { Component, PropTypes } from 'react';
import { withRouter, browserHistory } from 'react-router';

import AuthService from '../../utils/auth_services';

class Login extends Component {
  render() {
    const auth = new AuthService();

    return (
      <div className="login-container">
        <h2>Login</h2>
        <button onClick={auth.login.bind(this)}>Login</button>
      </div>
    );
  }
}

export default withRouter(Login);
