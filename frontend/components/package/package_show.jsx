import React from 'react';
import { Link } from 'react-router';

import PackageMap from './package_map';

class PackageShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      package: this.props.package,
      carrier: this.props.carrier,
      tracking_number: this.props.trackingNumber,
      details: {},
      visited_locations: []
    }

    this.showDetails = this.showDetails.bind(this);
    this.showTrackingHistory = this.showTrackingHistory.bind(this);
  }

  componentDidMount() {
    const url = `https://api.goshippo.com/v1/tracks/${this.state.carrier}/${this.state.tracking_number}`;

    $.ajax({
      method: "GET",
      url: url,
      success: (data) => {
        if (data.tracking_status !== null) {
          this.setState({details: data});
          let locations = [];
          for (let a = 0; a < data.tracking_history.length; a++) {
            let reversed = data.tracking_history.reverse();
            locations.push(
              new Date(reversed[a].status_date).toString() + ": " +
                this.getAddress(reversed[a].location) + "\n" +
                reversed[a].status
            );
          }
          this.setState({visited_locations: locations});
        }
      }
    });
  }

  // pull into separate file later
  getAddress(location) {
    let address_str = "";
    if (!location) {
      return "Address Unavailable";
    }
    let keys = Object.keys(location);
    for (let index in keys) {
      address_str += location[keys[index]];
      if (keys[index] === "city") address_str += ",";
      if (keys[index] !== "country" && location[keys[index]] !== "") address_str += " ";
    }
    return address_str;
  }

  showDetails() {
    let fromAddress = "", toAddress = "", status = "", status_details = "";
    let status_date_with_location = "", curr_location = "";
    if (this.state.details.tracking_status) {
      let det = this.state.details;
      fromAddress = this.getAddress(det.address_from);
      toAddress = this.getAddress(det.address_to);
      status = det.tracking_status.status;
      status_date_with_location = new Date(det.tracking_status.status_date).toString() + ": " +
        this.getAddress(det.tracking_status.location);
      status_details = det.tracking_status.status_details;

      return (
        <div className="details">
          <h2>{status}</h2>
          <h4>{status_date_with_location}</h4>
          <h4>{status_details}</h4>
          <h6>From: {fromAddress}</h6>
          <h6>To: {toAddress}</h6>
          <div className="tracking-list">
            <ul>

            </ul>
          </div>
        </div>
      );
    } else {
      return <span></span>;
    }
  }

  showTrackingHistory() {

  }

  render() {
    return (
      <div className="package-show">
        {this.showDetails()}
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
