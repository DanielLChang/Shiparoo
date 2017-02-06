import { connect } from 'react-redux';
import { getAllPackages } from '../../actions/package_actions';
import { allPackages } from '../../reducers/selectors';
import AllPackages from './all_packages.jsx';

const mapStateToProps = (state, ownProps) => {
  return ({
    packages: allPackages(state.package),
    errors: state.errors
  });
};

const mapDispatchToProps = dispatch => ({
  getAllPackages: (userId) => dispatch(getAllPackages(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPackages);
