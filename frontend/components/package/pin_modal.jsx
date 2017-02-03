import React from 'react';

class PinModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: ""
    };

    this.update = this.update.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value
    });
  }

  startUpdate() {

  }

  handleModalSubmit(e) {
    e.preventDefault();
    // debugger;
    this.startUpdate();
  }

  handleModalClose() {
    const modal = document.getElementById("pin-modal");
    modal.style.display = "none";
  }

  render() {
    return (
      <div id="pin-modal"
        className="modal"

        style={{display: 'none'}}>
        <div className="modal-content">
          <div className="modal-header">
            <h3>SMS PIN Verification</h3>
            <i className="fa fa-times-circle close" onClick={this.handleModalClose}></i>
          </div>

          <input
            className="pin-input"
            type="text"
            placeholder="Enter PIN to start tracking!"
            onChange={ this.update("pin")}>
          </input>

          <button className="modal-submit" onClick={ this.handleModalSubmit }>
            Start Tracking!
          </button>

        </div>
      </div>
    );
  }
}

export default PinModal;
