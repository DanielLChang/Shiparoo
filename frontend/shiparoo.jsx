import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);
});
