import React from 'react';
import merge from 'lodash/merge';
import PinModal from './pin_modal';
import PackageShowContainer from './package_show_container';
import { browserHistory } from 'react-router';

class Package extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      package: {},
      tracking_number: "",
      carrier: "ups",
      phone_number: "",
      pin: "",
      realtime_updates: false,
      invalidPhone: false,
      invalidTracking: false,
      errorVisible: false,
      paramErrors: false,
      processing: false,
      showMapRoute: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.toggleUpdates = this.toggleUpdates.bind(this);
    this.startTracking = this.startTracking.bind(this);
    this.handleValidTracking = this.handleValidTracking.bind(this);
    this.validPhoneNumber = this.validPhoneNumber.bind(this);
    this.createPackage = this.createPackage.bind(this);
    this.renderMap = this.renderMap.bind(this);
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
          this.setState({ processing: false, errorVisible: true, invalidTracking: true });
        }
      },
      error: () => {
        this.setState({ processing: false, errorVisible: true, invalidTracking: true });
      }
    });
  }

  handleValidTracking() {
    if (this.state.phone_number !== '') {
      if (this.validPhoneNumber(this.state.phone_number)) {
        this.setState({ realtime_updates: true });
        this.createPackage();
      } else {
        this.setState({ processing: false, invalidPhone: true });
      }
    } else {
      this.setState({ processing: false });
      // console.log("RENDER SHOW");
      browserHistory.push(`${this.state.carrier}/${this.state.tracking_number}`);
    }
  }

  validPhoneNumber(phoneNumber) {
    if (phoneNumber.length !== 10) {
      return false;
    }
    return (phoneNumber.match(/\d{10}/) !== null);
  }

  createPackage() {
    let p;
    if (localStorage.getItem("profile")) {
      p = {
        tracking_number: this.state.tracking_number,
        phone_number: this.state.phone_number,
        realtime_updates: this.state.realtime_updates,
        carrier: this.state.carrier,
        user_id: JSON.parse(localStorage.getItem('profile')).clientID
      };
    } else {
      p = {
        tracking_number: this.state.tracking_number,
        phone_number: this.state.phone_number,
        realtime_updates: this.state.realtime_updates,
        carrier: this.state.carrier
      };
    }

    $.ajax({
      method: "POST",
      url: "api/packages",
      data: { package: p },
      success: (res) => {
        this.setState({ processing: false });
        if (res.package.verified) {
          // console.log("render show");
          browserHistory.push(`${this.state.carrier}/${this.state.tracking_number}`);
        } else {
          this.setState({ package: res.package });
          document.getElementById('pin-modal').style.display = "block";
        }
      },
      error: () => {
        this.setState({ errorVisible: true, paramErrors: true, processing: false });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    //processing
    this.setState({ processing: true });
    //reset errors
    this.setState({ errorVisible: false, invalidPhone: false, paramErrors: false, invalidTracking: false });
    this.startTracking();

    // Testing modal css
    // document.getElementById('pin-modal').style.display = "block";

    this.setState({ showMapRoute: true});

  }

  renderMap() {
    if (this.state.showMapRoute === true) {
      return (<PackageShowContainer carrier={this.state.carrier} trackingNumber={this.state.tracking_number} />);
    } else {
      return (<div></div>);
    }
  }

  renderErrors() {
    if (this.state.errorVisible) {
      return (
        <div className="package-errors">
          { this.state.invalidTracking ? <h4>Invalid tracking number or carrier</h4> : null }
          { this.state.invalidPhone ? <h4>Invalid phone number</h4> : null }
          { this.state.paramErrors ? <h4>Error! Check your parameters</h4> : null }
        </div>
      );
    }
  }

  disableButton() {
    if (this.state.processing) {
      return true;
    } else if (this.state.carrier === "") {
      return true;
    } else if (this.state.tracking_number === "") {
      return true;
    } else if (this.state.phone_number === "") {
      return false;
    } else {
      return !this.validPhoneNumber(this.state.phone_number);
    }
  }

  buttonText() {
    if (this.state.processing) {
      return "Processing Request";
    } else {
      return this.trackButtonText();
    }
  }

  trackButtonText() {
    if (this.state.phone_number === "") {
      return "Find Package";
    } else {
      return "Receive Updates";
    }
  }

  render() {
    return(
      <form className="form-container"
            onSubmit={ this.handleSubmit }>
        <img className="logo-img"
          src="https://res.cloudinary.com/dxfu1kzhk/image/upload/v1486068145/logo_white_uem0ko.png">
        </img>
        <h3 className="tagline">Never lose track of a package again.</h3>
        <div className="input-container">
          <div className="tracking-number-container">
            <input
              type="text"
              className="tracking-number-input"
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
              placeholder="Phone Number (Optional)"
              onChange={ this.update("phone_number")}>
            </input>
          </div>


          <button className="package-form-submit"
            disabled={this.disableButton()}
            type="submit">{this.buttonText()}</button>
          { this.renderErrors() }
        </div>
        <PinModal package={this.state.package}/>

        {/*this.renderMap()*/}

      </form>
    );
  }
}

export default Package;
