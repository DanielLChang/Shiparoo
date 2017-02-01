import { connect } from 'react-redux';
import { login, logout, signup } from '../../actions/session_actions';
import Login from './login';


const mapStateToProps = ({ session }) => ({
  loggedIn: Boolean(session.currentUser),
  errors: session.errors
});

const mapDispatchToProps = (dispatch, { location }) => {
  return {
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
