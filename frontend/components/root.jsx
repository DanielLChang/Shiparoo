import React from 'react';
import {Route, Router, IndexRedirect, browserHistory} from 'react-router';
import AuthService from 'utils/AuthService';
import App from './App';
import Home from './home/home';
import Login from './login/login';

const auth = new AuthService('HQyc8BbQc47Drpa85hJca6t6THDNOAXg', 'justinsuen.auth0.com');

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
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
            <Route path="login" component={Login} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default Root;
