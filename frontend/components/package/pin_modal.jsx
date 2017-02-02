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

  componentDidMount() {
    const modal = document.getElementById("pin-modal");
    const span = document.getElementsByClassName("close")[0];

    span.onclick = () => {
      modal.style.display = "none";
    };
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value
    });
  }

  startUpdate() {
    modal.style.display = "none";
  }

  handleModalSubmit(e) {
    e.preventDefault();
    debugger;
    this.startUpdate();
  }

  render() {
    return (
      <div id="pin-modal"
        className="modal"

        style={{display: 'none'}}>
        <div className="modal-content">
          <div className="modal-header">
            <span className="close">X</span>
            <h2>Verify Your Number To Start Tracking!</h2>
          </div>

          <div className="modal-body">
            <input
              className="pin-input"
              type="text"
              placeholder="Enter PIN"
              onChange={ this.update("pin")}>
            </input>
          </div>

          <button className="modal-submit" onClick={ this.handleModalSubmit }>
            Start Tracking!
          </button>

        </div>
      </div>
    );
  }
}

export default PinModal;
