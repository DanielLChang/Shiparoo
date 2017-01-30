import React from 'react';
import { withRouter } from 'react-router';

class App extends React.Component {
  render() {
    return(
      <div className="app-container">
        { this.props.children }
      </div>
    );
  }
}

export default withRouter(App);
