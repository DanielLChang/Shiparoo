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
      <div className="home-container">
        <Header auth={this.props.auth}/>
        <div className="all-packages">
          <h2 className="ap-title">All Packages</h2>
          <div className="ap-header">
            <div className="pli-id">#</div>
            <div className="pli-carr">Carrier</div>
            <div className="pli-track">Tracking Number</div>
          </div>
          { this.props.packages.map((p, idx) =>
            <Link key={idx}
              to={`${p.carrier}/${p.tracking_number}`}
              className="package-list-item">
              <div className="pli-id">{idx + 1}</div>
              <div className="pli-carr">{p.carrier}</div>
              <div className="pli-track">{p.tracking_number}</div>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(AllPackages);
