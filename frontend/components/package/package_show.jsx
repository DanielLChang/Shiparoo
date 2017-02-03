import React from 'react';
import { Link } from 'react-router';

import PackageMap from './package_map';

class PackageShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="package-show">
        <PackageMap
          getPackage={this.props.getPackage}
          package={this.props.package}
          carrier={this.props.carrier}
          trackingNumber={this.props.tracking_number}
          />
      </div>
    );
  }
}

export default PackageShow;
