// actions/index.js
import Auth0Lock from 'auth0-lock';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const loginSuccess = (profile) => {
  return {
    type: LOGIN_SUCCESS,
    profile
  };
};

const loginError = (err) => {
  return {
    type: LOGIN_ERROR,
    err
  };
};

export const logoutSuccess = (profile) => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const login = () => {
  const lock = new Auth0Lock('AUTH0_CLIENT_ID', 'AUTH0_DOMAIN');

  return dispatch => {
    lock.show((err, profile, token) => {
      if(err) {
        return dispatch(loginError(err));
      }

      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', token);
      return dispatch(loginSuccess(profile));
    });
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    return dispatch(logoutSuccess());
  };
}
