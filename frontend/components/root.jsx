import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';

import App from './app';
// import HomeContainer from './home/home_container';
import Home from './home/home';

class Root extends React.Component {
  render() {
    return(
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRedirect to="/home" />
            <Route path="home" component={Home}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default Root;
