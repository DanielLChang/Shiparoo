import { connect } from 'react-redux';
import Login from './login';


const mapStateToProps = ({ session }) => ({
  loggedIn: Boolean(session.currentUser),
  errors: session.errors
});

export default connect(
  mapStateToProps,
  null
)(Login);
