import React from 'react';
import {withRouter, Link, browserHistory} from 'react-router';

import Header from './header/header';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-container">
        <Header auth={this.props.auth}/>
        <div className="about-container">
          <h1>About Shiparoo</h1>
          <h3 className="about-tag">Shiparoo is an elegant, web and mobile
            application for realtime package tracking.</h3>
          <div className="gh-links">
            <h3 className="about-tag">Check us out on GitHub!</h3>
            <a href="https://github.com/DanielLChang/Shiparoo">Web</a>
            <a href="https://github.com/justinsuen/shiparoo-ios">Mobile</a>
          </div>
          <h4>Engineering Team</h4>
          <div className="about-create-container">
            <div className="creator-item">
              <img src={require('../../app/assets/images/Calvin_Yau.png')}
                className="creator-img"></img>
              <h3 className="about-des">Calvin Yau</h3>
              <div className="creator-links">
                <a href="https://github.com/calvinyau"><i className="fa fa-github"></i></a>
                <a href="https://linkedin.com/in/calvin-yau-982065a8/"><i className="fa fa-linkedin-square"></i></a>
                <a href="mailto:calvinj.yau@gmail.com"><i className="fa fa-envelope"></i></a>
              </div>
            </div>
            <div className="creator-item">
              <img src={require('../../app/assets/images/Daniel_Chang.png')}
                className="creator-img"></img>
              <h3 className="about-des">Daniel Chang</h3>
              <div className="creator-links">
                <a href="https://github.com/DanielLChang"><i className="fa fa-github"></i></a>
                <a href="https://www.linkedin.com/in/daniel-chang"><i className="fa fa-linkedin-square"></i></a>
                <a href="mailto:daniellawrencechang@gmail.com"><i className="fa fa-envelope"></i></a>
              </div>
            </div>
            <div className="creator-item">
              <img src={require('../../app/assets/images/Tin_Jeng_Suen.png')}
                className="creator-img"></img>
              <h3 className="about-des">Justin Suen</h3>
              <div className="creator-links">
                <a href="https://github.com/justinsuen"><i className="fa fa-github"></i></a>
                  <a href="https://github.com/justinsuen"><i className="fa fa-github"></i></a>                <a href="https://linkedin.com/in/justin-suen"><i className="fa fa-linkedin-square"></i></a>
                <a href="mailto:jsuen27@gmail.com"><i className="fa fa-envelope"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(About);
