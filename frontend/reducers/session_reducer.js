import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } from '../actions/session_actions';
import jwtDecode from 'jwt-decode';

const checkTokenExpiry = () => {
  let jwt = localStorage.getItem('id_token');

  if(jwt) {
    let jwtExp = jwtDecode(jwt).exp;
    let expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);

    if(new Date() < expiryDate) {
      return true;
    }
  }

  return false;
};

const getProfile = () => {
  return JSON.parse(localStorage.getItem('profile'));
};

const _defaultState = {
  isAuthenticated: checkTokenExpiry(),
  profile: getProfile(),
  error: ''
};

const SessionReducer = (state = _defaultState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        profile: action.profile,
        error: ''
      });
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null,
        error: action.error
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null
      });
    default:
      return state;
    }
};

export default SessionReducer;
