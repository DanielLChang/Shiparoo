import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './app';

const Root = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>

    </Route>
  </Router>
);

export default Root;
