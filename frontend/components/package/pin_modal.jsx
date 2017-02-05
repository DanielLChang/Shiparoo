import React from 'react';

class PinModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinToVerify: "",
      errorVisible: false,
      processing: false
    };

    this.update = this.update.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.verifyPin = this.verifyPin.bind(this);
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value
    });
  }

  checkPin() {
    if (this.state.pinToVerify === this.props.package.pin) {
      this.verifyPin();
    } else {
      this.setState({ processing: false, errorVisible: true });
    }
  }

  verifyPin() {
    let id = this.props.package.id;

    $.ajax({
      method: "PATCH",
      url: `api/packages/${id}`,
      data: { package: {
        tracking_number: this.props.package.tracking_number,
        carrier: this.props.package.carrier,
        pin: this.state.pinToVerify
      } },
      success: () => {
        this.handleModalClose();
        console.log("RENDER SHOW");
      },
      error: () => {
        this.setState({ processing: false, errorVisible: true });
      }
    });
  }

  handleModalSubmit(e) {
    e.preventDefault();
    this.setState({ errorVisible: false, processing: true });
    this.checkPin();
  }

  handleModalClose() {
    const modal = document.getElementById("pin-modal");
    modal.style.display = "none";
  }

  renderErrors() {
    if (this.state.errorVisible) {
      return (
        <div className="package-errors">
          Invalid PIN
        </div>
      );
    }
  }

  buttonText() {
    if (this.state.processing) {
      return "Processing Request";
    } else {
      return "Submit";
    }
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
          <div className="pin-modal-instruct">1. Find your PIN in your messages</div>
          <div className="pin-modal-details"></div>
          <div className="pin-modal-instruct">2. Enter your PIN below</div>
          <div className="pin-modal-form">
            <input
              className="pin-input"
              type="text"
              placeholder="Enter PIN"
              onChange={ this.update("pinToVerify")}>
            </input>

            {this.renderErrors()}

            <button
              className="modal-submit"
              onClick={ this.handleModalSubmit }>
              { this.buttonText() }
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PinModal;
