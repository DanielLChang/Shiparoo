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
        <div className="package-map">
          <PackageMap
            getPackage={this.props.getPackage}
            />
          <span>Hello</span>
        </div>
      </div>
    );
  }
}

export default PackageShow;
