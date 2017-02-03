import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import range from 'lodash/range';

let _mapOptions = {
  center: {lat: 37.773972, lng: -122.431297}, // San Francisco coords
  zoom: 10
};

class PackageMap extends React.Component {
  constructor(props) {
    super(props);

    this.drawMarkers = this.drawMarkers.bind(this);
  }

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, _mapOptions);
    if (this.props) {
      this.props.getPackage(this.props.carrier, this.props.trackingNumber);
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.package) {
      let tracking_history = nextProps.package[this.props.trackingNumber].tracking_history;
      debugger;
      this.routeCoordinates = [];
      for (let a = 0; a < tracking_history.length; a++) {
        if (tracking_history[a].location) {
          // this.getAddress(tracking_history[a].location)
          if (tracking_history[a].location.zip) {
            $.ajax({
              url: `https://maps.googleapis.com/maps/api/geocode/json?address=${tracking_history[a].location.zip}`,
              method: 'GET',
              success: (response) => {
                console.log(response.results[0].address_components[0].long_name);
                let coords = response.results[0].geometry.location;
                this.routeCoordinates[a] = {lat: coords.lat, lng: coords.lng};
                console.log(this.routeCoordinates);
              }
            });
          }
        }
      }
    }
  }

  componentDidUpdate() {
    $(document).ajaxStop(() => {
      this.routeCoordinates = this.routeCoordinates.filter((element) => {
         return element !== undefined;
      });
      this.drawMarkers();
    });
  }

  getAddress(location) {

  }

  drawMarkers() {
    let route = new google.maps.Polyline({
      path: this.routeCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    route.setMap(this.map);

    let marker;
    for (let a = 0; a < this.routeCoordinates.length; a++) {
      let position = this.routeCoordinates[a];
      marker = new google.maps.Marker({
        position: position,
        map: this.map,
        draggable: false,
        animation: google.maps.Animation.DROP
      });
    }
  }

  render() {
    return <div className="map" ref="map">Map</div>;
  }
}

export default withRouter(PackageMap);
