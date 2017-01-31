import {combineReducers} from 'redux';

import SessionReducer from './session_reducer';
import PackageReducer from './package_reducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  package: PackageReducer
});

export default rootReducer;
