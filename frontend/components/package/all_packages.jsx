import React from 'react';
import { Link, withRouter, browserHistory } from 'react-router';

import Header from '../header/header';

class AllPackages extends React.Component {
  constructor(props) {
    super(props);

    this.redirectHome = this.redirectHome.bind(this);
  }

  componentDidMount() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    this.props.getAllPackages(profile.user_id);
  }

  redirectHome() {
    browserHistory.push("/home");
  }

  render() {
    return (
      <div className="all-packages-container">
        <Header auth={this.props.auth}/>
        <div className="all-packages">
          <h2>All Packages</h2>
          { this.props.packages.map((p, idx) =>
            <h2>{p.tracking_number}</h2>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(AllPackages);
