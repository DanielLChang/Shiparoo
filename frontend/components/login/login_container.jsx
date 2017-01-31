import { connect } from 'react-redux';
import { login, logout } from '../../actions/session_actions';
import Login from './login';


const mapStateToProps = ({ session }) => {
  const { isAuthenticated, profile } = session;

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
