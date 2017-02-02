import React from 'react';
import { withRouter, Link, browserHistory } from 'react-router';

import Package from '../package/package';
import Auth0Lock from 'auth0-lock';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"home-container"}>
        <Package />
        <Link to="login">Login</Link>
      </div>
    );
  }
}

export default withRouter(Home);
