import React from 'react';
import { Link } from 'react-router';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer">
        <Link to="about">About</Link>
      </div>
    );
  }
}

export default Footer;
