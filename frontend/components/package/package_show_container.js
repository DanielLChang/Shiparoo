import { connect } from 'react-redux';
import { getPackage } from '../../actions/package_actions';

import PackageShow from './package_show';

const mapStateToProps = (state, ownProps) => {
  return {
    package: state.package,
    // carrier: ownProps.carrier,
    // tracking_number: ownProps.trackingNumber
    carrier: ownProps.params.carrier,
    tracking_number: ownProps.params.trackingNumber
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPackage: (carrier, trackingNumber) => dispatch(getPackage(carrier, trackingNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PackageShow);
