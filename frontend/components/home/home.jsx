import React from 'react';
import { withRouter } from 'react-router';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tracking_number: "",
      carrier: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger;
  }

  render() {
    return (
      <form className="home-container"
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
            <option value="UPS">UPS</option>
            <option value="USPS">USPS</option>
            <option value="Parcelforce">Parcelforce</option>
            <option value="Deutsche Post">Deutsche Post</option>
            <option value="UberRUSH">UberRUSH</option>
            <option value="DHL Express">DHL Express</option>
          </select>
        </div>

        <input type="submit" value="Start Tracking"></input>
      </form>
    );
  }
}

export default withRouter(Home);
