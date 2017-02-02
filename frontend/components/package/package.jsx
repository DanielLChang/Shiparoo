import React from 'react';
import merge from 'lodash/merge';
import PinModal from './pin_modal';

class Package extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracking_number: "",
      carrier: "ups",
      phone_number: "",
      pin: "",
      realtime_updates: false,
      invalidPhone: false,
      errorVisible: false,
      alreadyTracking: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.toggleUpdates = this.toggleUpdates.bind(this);
    this.startTracking = this.startTracking.bind(this);
    this.handleValidTracking = this.handleValidTracking.bind(this);
    this.validPhoneNumber = this.validPhoneNumber.bind(this);
    this.createPackage = this.createPackage.bind(this);
  }

  toggleUpdates(field) {
    return (e) => this.setState({
      [field]: !this.state.realtime_updates
    });
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value
    });
  }

  startTracking() {
    const url = `https://api.goshippo.com/v1/tracks/${this.state.carrier}/${this.state.tracking_number}`;

    $.ajax({
      method: "GET",
      url: url,
      success: (result) => {
        if (result.tracking_status !== null) {
          this.handleValidTracking();
        } else {
          this.setState({ errorVisible: true });
        }
      },
      error: () => {
        this.setState({ errorVisible: true });
      }
    });
  }

  handleValidTracking() {
    if (this.validPhoneNumber(this.state.phone_number)) {
      this.createPackage();
    } else {
      this.setState({ invalidPhone: true });
    }
  }

  validPhoneNumber(phoneNumber) {
    if (phoneNumber.length !== 10) {
      return false;
    }
    return (phoneNumber.match(/\d{10}/) !== null);
  }

  createPackage() {
    const p = {
      tracking_number: this.state.tracking_number,
      phone_number: this.state.phone_number,
			realtime_updates: this.state.realtime_updates,
      carrier: this.state.carrier
    };

    $.ajax({
      method: "POST",
      url: "/packages",
      data: { package: p },
      success: (res) => {
        document.getElementById('pin-modal').style.display = "block";
      },
      error: () => {
        this.setState({ alreadyTracking: true });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ errorVisible: false, invalidPhone: false, alreadyTracking: false });
    this.startTracking();
  }

  renderErrors() {
    if (this.state.errorVisible) {
      return (
        <div className="package-errors">
          <h4>Invalid tracking number or carrier</h4>
        </div>
      );
    } else if (this.state.invalidPhone) {
      return (
        <div className="package-errors">
          <h4>Invalid phone number</h4>
        </div>
      );
    } else if (this.state.alreadyTracking) {
      return (
        <div className="package-errors">
          <h4>Already tracking package!</h4>
        </div>
      );
    }
  }

  render() {
    return(
      <form className="form-container"
            onSubmit={ this.handleSubmit }>
        <img src="https://res.cloudinary.com/dxfu1kzhk/image/upload/v1485839980/Logomakr_5f0q7A_z7smff.png"></img>
        <h2>Shiparoo</h2>

        <div className="tracking-number-container">
          <input
            type="text"
            placeholder="Tracking Number"
            onChange={ this.update("tracking_number") }>
          </input>

          <select onChange={ this.update("carrier") }>
            <option value="ups">UPS</option>
            <option value="usps">USPS</option>
            <option value="fedex">FedEX</option>
            <option value="canada_post">Canada Post</option>
            <option value="lasership">Lasership</option>
            <option value="dhl_express">DHL Express</option>
            <option value="mondial_relay">Mondial Relay</option>
          </select>
        </div>

        <div className="phone-number-container">
          <input
            className="phone-number-input"
            type="text"
            placeholder="Phone Number"
            onChange={ this.update("phone_number")}>
          </input>

          <label className="package-updates">
            <input
              type="checkbox"
              onChange={ this.toggleUpdates("realtime_updates") }>
            </input>
            Check to receive SMS updates.
          </label>
        </div>

        { this.renderErrors() }

        <button className="package-form-submit"
          type="submit">Get PIN</button>

        <PinModal />

      </form>
    );
  }
}

export default Package;
