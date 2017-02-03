import React from 'react';
import { Link, withRouter } from 'react-router';

import Header from './header/header';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="not-found-container">
        <Header auth={this.props.auth}/>
        <div className="not-found">
          <h1>Did you try to look for your package?</h1>
          <h2>It's not here &#128550;</h2>
          <Link className="rdr-home" to="home">
            <img src="https://res.cloudinary.com/dxfu1kzhk/image/upload/v1486068145/logo_white_uem0ko.png"></img>
            <h2>Let us do it for you!</h2>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(NotFound);
