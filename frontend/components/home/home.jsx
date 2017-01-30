import React from 'react';
import { withRouter } from 'react-router';

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h2>Home</h2>
      </div>
    );
  }
}

export default withRouter(Home);
