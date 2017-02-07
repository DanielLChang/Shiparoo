import React from 'react';
import { withRouter, Link, browserHistory } from 'react-router';

import Header from './header/header';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-container">
        <Header auth={this.props.auth}/>
        <h1>Things</h1>
      </div>
    );
  }
}

export default withRouter(About);
