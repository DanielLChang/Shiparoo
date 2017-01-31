import React from 'react';
import { withRouter } from 'react-router';
import Package from '../package/package';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Package />
    );
  }
}

export default withRouter(Home);
