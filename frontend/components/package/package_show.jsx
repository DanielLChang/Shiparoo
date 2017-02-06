import React from 'react';
import { Link } from 'react-router';

import PackageMap from './package_map';
import Header from '../header/header';

class PackageShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      package: this.props.package,
      // carrier: this.props.carrier,
      // tracking_number: this.props.trackingNumber,
      carrier: this.props.carrier,
      tracking_number: this.props.tracking_number,
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
          this.setState({
            details: data,
            visited_locations: data.tracking_history
          });
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
          <h1 className="carrier">{carriers[this.state.carrier]}</h1>
          <h2>Tracking Number: {this.state.tracking_number}</h2>
          <br/>
          <h2 className="status">{status}</h2>
          <h4>{status_date_with_location}</h4>
          <h4>{status_details}</h4>
          <h5>FROM: {fromAddress}</h5>
          <h5>TO: {toAddress}</h5>
          <div className="tracking-list">
            <ul>
              {this.showTrackingHistory()}
            </ul>
          </div>
        </div>
      );
    } else {
      return <span></span>;
    }
  }

  showTrackingHistory() {
    let history = this.state.visited_locations.reverse().map((location) => {
      let status = location.status;
      let status_details = location.status_details;
      let status_date = new Date(location.status_date).toString();
      let status_location = this.getAddress(location.location)

      return (
        <li key={location.object_id}>
          <span className="status">{status}</span>
          <br/>
          <span className="gray-span">{status_date}</span>
          <br/>
          <span className="gray-span">{status_location}</span>
          <br/>
          <span>{status_details}</span>
          <br/>
        </li>
      );
    });

    return history;
  }

  render() {
    return (
      <div>
        <Header auth={this.props.auth}/>
        <div className="package-show">
          {this.showDetails()}
          <PackageMap
            getPackage={this.props.getPackage}
            package={this.props.package}
            carrier={this.props.carrier}
            trackingNumber={this.props.tracking_number}
            />
        </div>
      </div>
    );
  }
}

const carriers = {
  'ups': 'UPS',
  'usps': 'USPS',
  'fedex': 'FedEX',
  'canada_post': 'Canada Post',
  'lasership': 'Lasership',
  'dhl_express': 'DHL Express',
  'mondial_relay': 'Mondial Relay'
};

export default PackageShow;
