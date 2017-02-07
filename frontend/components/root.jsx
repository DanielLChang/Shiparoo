import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

import AuthService from '../utils/auth_services';

import App from './app';
import NotFound from './not_found';
import About from './about';
// import Profile from './profile/profile';
import HomeContainer from './home/home_container';
import AllPackagesContainer from './package/all_packages_container';
import PackageShowContainer from './package/package_show_container';

class Root extends Component {
  constructor() {
    super();

    this.auth = new AuthService();
    this._ensureLoggedIn = this._ensureLoggedIn.bind(this);
  }

  _ensureLoggedIn(nextState, replace) {
    if (!this.auth.loggedIn() && !localStorage.getItem("profile")) {
      replace('/home');
    }
  }

  render() {
    return(
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={App} auth={this.auth}>
            <IndexRoute component={HomeContainer}/>
            <Route path="home" component={HomeContainer}/>
            <Route path="packages" component={AllPackagesContainer} onEnter={this._ensureLoggedIn}/>
            <Route path=":carrier/:trackingNumber" component={PackageShowContainer}/>
            <Route path="about" component={About}/>
            <Route path="*" component={NotFound}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default Root;
