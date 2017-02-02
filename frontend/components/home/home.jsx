import React from 'react';
import { withRouter, Link, browserHistory } from 'react-router';

import Package from '../package/package';

class Home extends React.Component {
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
      <div className={"home-container"}>
        <Package />
        { auth.loggedIn() ?
          <button onClick={this.logout.bind(this)}>Logout</button> :
          <Link to="login">Login</Link>
        }
      </div>
    );
  }
}

export default withRouter(Home);
