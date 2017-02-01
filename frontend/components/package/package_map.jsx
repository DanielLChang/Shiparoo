import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';

let _mapOptions = {
  center: {lat: 37.773972, lng: -122.431297}, // San Francisco coords
  zoom: 13
};

class PackageMap extends React.Component {

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, _mapOptions);
    if (this.props) {
      let result = this.props.getPackage('usps', '9205590136271836203422');
    }
  }

  render() {
    return <div className="map" ref="map">Map</div>;
  }
}

export default withRouter(PackageMap);
