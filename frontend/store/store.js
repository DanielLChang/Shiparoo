import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer from '../reducers/root_reducer.js';

const _defaultState = {};

const configureStore = (preloadedState = _defaultState) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  )
);

export default configureStore;
