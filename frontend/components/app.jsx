import React from 'react';
import { withRouter } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let children = null;

    return (
      <div className="app-container">
        { this.props.children }
      </div>
    );
  }
}

export default withRouter(App);
