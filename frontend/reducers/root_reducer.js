import {combineReducers} from 'redux';

import SessionReducer from './session_reducer';
import PackageReducer from './package_reducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  packages: PackageReducer
});

export default rootReducer;
