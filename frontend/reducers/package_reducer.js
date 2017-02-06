import { RECEIVE_PACKAGE, RECEIVE_ALL_PACKAGES } from '../actions/package_actions';
import merge from 'lodash/merge';

const _nullPackageSource = Object.freeze({
  packages: {},
  errors: []
});

const PackageReducer = (state = _nullPackageSource, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_PACKAGE:
      const newPackage = {[action.package.tracking_number]: action.package};
      return merge({}, state, newPackage);
    case RECEIVE_ALL_PACKAGES:
      const packages = action.packages;
      return merge({}, state, { packages });
    default:
      return state;
  }
};

export default PackageReducer;
