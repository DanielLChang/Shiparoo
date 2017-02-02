import { connect } from 'react-redux';
import { getPackage } from '../../actions/package_actions';

import PackageShow from './package_show';

const mapStateToProps = (state) => {
  return {
    package: state.package
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPackage: (carrier, trackingNumber) => dispatch(getPackage(carrier, trackingNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PackageShow);
