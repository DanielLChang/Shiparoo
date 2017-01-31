import { RECEIVE_PACKAGE } from '../actions/package_actions';
import merge from 'lodash/merge';

const PackageReducer = (state = {}, action) => {
  Object.freeze(state)

  switch(action.type) {
    case RECEIVE_PACKAGE:
      const newPackage = {[action.p.id]: action.p};
      return merge({}, state, newPackage);
    default:
      return state;
  }
};

export default BenchesReducer;
