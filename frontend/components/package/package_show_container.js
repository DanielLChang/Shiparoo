import { connect } from 'react-redux';
import { getPackage } from '../../actions/package_actions';

import PackageShow from './package_show';

const mapStateToProps = () => {
  return;
};

const mapDispatchToProps = (dispatch) => ({
  getPackage: (carrier, trackingNumber) => dispatch(getPackage(carrier, trackingNumber))
});

export default connect(
  null,
  mapDispatchToProps,
)(PackageShow);
