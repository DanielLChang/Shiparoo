import React, { Component, PropTypes } from 'react';
import { withRouter, browserHistory } from 'react-router';

class Login extends Component {
  render() {
    const { auth } = this.props;

    return (
      <div className="login-container">
        <h2>Login</h2>
        <button onClick={auth.login.bind(this)}>Login</button>
      </div>
    );
  }
}

export default withRouter(Login);
