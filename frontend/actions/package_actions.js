import * as PackageUtil from '../utils/package_util';

export const RECEIVE_PACKAGE = "RECEIVE_PACKAGE";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receivePackage = (p) => ({
  type: RECEIVE_PACKAGE,
  package: p
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const getPackage = (carrier, trackingNumber) => (dispatch) => (
  PackageUtil.fetchPackage(carrier, trackingNumber).then(
    (result) => dispatch(receivePackage(result)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    )
);
