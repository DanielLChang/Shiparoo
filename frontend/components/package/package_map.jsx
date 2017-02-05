import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import range from 'lodash/range';

let _mapOptions = {
  center: {lat: 37.773972, lng: -122.431297}, // San Francisco coords
  zoom: 11
};

class PackageMap extends React.Component {
  constructor(props) {
    super(props);

    this.drawMarkers = this.drawMarkers.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.getGeocode = this.getGeocode.bind(this);
  }

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, _mapOptions);
    if (this.props) {
      this.props.getPackage(this.props.carrier, this.props.trackingNumber);
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.carrier != this.props.carrier || nextProps.trackingNumber != this.props.trackingNumber) {
      nextProps.getPackage(nextProps.carrier, nextProps.trackingNumber);
    }

    if (nextProps.package && nextProps.package[this.props.trackingNumber]) {
      let tracking_history = nextProps.package[this.props.trackingNumber].tracking_history;
      this.routeCoordinates = [];
      let seen_addresses = {};
      for (let index = 0; index < tracking_history.length; index++) {
        let dest = tracking_history[index];
        if (dest.status !== "TRANSIT" && dest.status !== "DELIVERED") {
          continue;
        }
        if (dest.location) {
          let curr_address = this.getAddress(dest.location);
          if (seen_addresses[curr_address]) {
            continue;
          } else {
            seen_addresses[curr_address] = true;
            this.getGeocode(curr_address, index);
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
      this.map.setCenter(this.routeCoordinates[this.routeCoordinates.length - 1]);
    });
  }

  getGeocode(address, index) {
    $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCBasOCP_OzvUC6i0ct92QQ-midDnDqE0U`,
      method: 'GET',
      success: (response) => {
        let coords = response.results[0].geometry.location;
        this.routeCoordinates[index] = {lat: coords.lat, lng: coords.lng};
      }
    });
  }

  getAddress(location) {
    let address_str = "";
    let keys = Object.keys(location);
    for (let index in keys) {
      address_str += location[keys[index]];
      if (keys[index] === "city") address_str += ",";
      if (keys[index] !== "country" && location[keys[index]] !== "") address_str += " ";
    }
    return address_str;
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
