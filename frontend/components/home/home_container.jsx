import { connect } from 'react-redux';
import Home from './home';


const mapStateToProps = ({ session }) => ({
  loggedIn: Boolean(session.currentUser),
  errors: session.errors
});

export default connect(
  mapStateToProps,
  null
)(Home);
