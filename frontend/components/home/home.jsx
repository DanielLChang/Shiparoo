import React from 'react';
import { withRouter, Link, browserHistory } from 'react-router';
import { isEmpty } from 'lodash';

import Package from '../package/package';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { auth } = this.props;

    return (
      <div className={"home-container"}>
        <Package />
        <Link to="login">Login</Link>
      </div>
    );
  }
}

export default withRouter(Home);
