import React from 'react';
import { withRouter } from 'react-router';
import Package from '../package/package';

import PackageShowContainer from '../package/package_show_container';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Package />
        <PackageShowContainer />
      </div>
    );
  }
}

export default withRouter(Home);
