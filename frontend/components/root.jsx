import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

import AuthService from '../utils/auth_services';

import App from './app';
import HomeContainer from './home/home_container';
import LoginContainer from './login/login_container';

class Root extends Component {
  constructor() {
    super();

    this.auth = new AuthService();
  }

  render() {
    return(
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={App} auth={this.auth}>
            <IndexRoute component={HomeContainer}/>
            <Route path="home" component={HomeContainer}/>
            <Route path="login" component={LoginContainer}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default Root;
