import React from 'react';
import { withRouter } from 'react-router';
// import AuthService from '../../utils/auth_service';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLoginClick() {
    this.props.login();
  }

  handleLogoutClick() {
    this.props.logout();
  }

  render() {
    const { isAuthenticated, profile } = this.props;
    return (
        <div className="session-container">
          {!isAuthenticated ? (
            <div className="session-form">
              <h2>Login</h2>
              <button onClick={this.handleLoginClick}>Login</button>
            </div>
          ) : (
            <div className="session-form">
              <h2>Welcome, { profile.name }</h2>
              <button onClick={this.handleLogoutClick}>Logout</button>
            </div>
          )}
        </div>
    );
  }
}

export default withRouter(Login);
