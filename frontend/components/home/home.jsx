import React from 'react';
import { withRouter, Link, browserHistory } from 'react-router';

import Package from '../package/package';

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
