import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.auth.loggedIn()
    };
  }

  logout() {
    this.props.auth.logout();
    this.setState({ loggedIn: false });
  }

  render() {
    const { auth } = this.props;

    return (
      <div className="header">
        <Link to="home" className="logo">
          <img src="https://res.cloudinary.com/dxfu1kzhk/image/upload/v1486068145/logo_white_uem0ko.png"></img>
          <h1>Shiparoo</h1>
        </Link>
        { auth.loggedIn() ?
          <button className="sess-btn" onClick={this.logout.bind(this)}>Logout</button> :
          <button className="sess-btn" onClick={auth.login.bind(this)}>Login</button>
        }
      </div>
    );
  }
}

export default Header;
