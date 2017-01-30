import React from 'react';
import { withRouter } from 'react-router';
import AuthService from 'utils/auth_service';

class Login extends React.Component {
  render() {
    const { auth } = this.props;
    return (
      <div className="login-form">
        <h2>Login</h2>
        <button onClick={auth.login.bind(this)}>Login</button>
      </div>
    );
  }
}

export default withRouter(Login);
