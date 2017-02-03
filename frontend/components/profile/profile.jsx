import React from 'react';
import { withRouter, Link, browserHistory } from 'react-router';

import Header from '../header/header';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-container">
        <Header auth={this.props.auth}/>
        <div className="main-container">

        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
