import React from 'react';
import { withRouter } from 'react-router';

import ProfileModal from './profile/profile_modal';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth
      });
    }

    return (
      <div className="app-container">
        <ProfileModal auth={this.props.route.auth}/>
        { children }
      </div>
    );
  }
}

export default withRouter(App);
