import React from 'react';
import {Route, Router, IndexRedirect, browserHistory} from 'react-router';
import AuthService from 'utils/AuthService';
import App from './App';
import HomeContainer from './Home/Home';
import LoginContainer from './Login/Login';

const auth = new AuthService('HQyc8BbQc47Drpa85hJca6t6THDNOAXg', 'justinsuen.auth0.com');

// validate authentication for private routes
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
            <Route path="home" component={HomeContainer} onEnter={requireAuth} />
            <Route path="login" component={LoginContainer} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default Root;
