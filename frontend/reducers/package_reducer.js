import { RECEIVE_PACKAGE } from '../actions/package_action';

import merge from 'lodash/merge';

const _nullState = {
  package: null,
  errors: []
};

const PackageReducer = (state = _nullState, action) => {
  Object.freeze(state);

  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_PACKAGE:
      newState.package = action.package;
      return newState;
    default:
      return state;
  }
};

export default PackageReducer;
