import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/session_actions';
import jwtDecode from 'jwt-decode';

// const checkTokenExpiry = () => {
//   let jwt = localStorage.getItem('id_token');
//
//   if(jwt) {
//     let jwtExp = jwtDecode(jwt).exp;
//     let expiryDate = new Date(0);
//     expiryDate.setUTCSeconds(jwtExp);
//
//     if(new Date() < expiryDate) {
//       return true;
//     }
//   }
//
//   return false;
// };
//
// const getProfile = () => {
//   return JSON.parse(localStorage.getItem('profile'));
// };

const _defaultState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
};

const SessionReducer = (state = _defaultState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    default:
      return state;
  }
};

export default SessionReducer;
