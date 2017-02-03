import React from 'react';
import { withRouter, Link, browserHistory } from 'react-router';

import Header from '../header/header';
import Package from '../package/package';
import PackageShowContainer from '../package/package_show_container';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-container">
        <Header auth={this.props.auth}/>
        <div className="main-container">
          <Package />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
