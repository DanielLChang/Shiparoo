import { connect } from 'react-redux';
import { login, logout } from '../../actions/session_actions';
import Login from './login';


const mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated, profile } = auth;

  return {
    isAuthenticated,
    profile
  };
};

const mapDispatchToProps = () => {
  return {
    login,
    logout
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
