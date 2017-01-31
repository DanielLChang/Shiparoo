import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import AuthService from '../utils/auth_service';
import App from './app';
import Home from './home/home';
import LoginContainer from './login/login_container';

const auth = new AuthService('HQyc8BbQc47Drpa85hJca6t6THDNOAXg', 'justinsuen.auth0.com');

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/session' });
  }
};

class Root extends React.Component {
  render() {
    return(
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={App} auth={auth}>
            <IndexRedirect to="/home" />
            <Route path="home" component={Home} onEnter={requireAuth} />
            <Route path="session" component={LoginContainer} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default Root;
