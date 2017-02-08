import React from 'react';
import { Link } from 'react-router';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer">
        <Link to="about"><i className="fa fa-info-circle"></i>About</Link>
        <a href="https://github.com/DanielLChang/Shiparoo"><i className="fa fa-github"></i>GitHub</a>
      </div>
    );
  }
}

export default Footer;
