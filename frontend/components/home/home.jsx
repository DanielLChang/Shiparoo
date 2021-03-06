import React from 'react';
import { withRouter, Link, browserHistory } from 'react-router';

import Header from '../header/header';
import Footer from '../footer/footer';
import Package from '../package/package';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-container">
        <Header auth={this.props.auth}/>
        <Package />
        <Footer />
      </div>
    );
  }
}

export default withRouter(Home);
