import {combineReducers} from 'redux';

import PackageReducer from './package_reducer';

const rootReducer = combineReducers({
  package: PackageReducer
});

export default rootReducer;
