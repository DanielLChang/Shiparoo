import { EventEmitter } from 'events';
import { browserHistory } from 'react-router';
import Auth0Lock from 'auth0-lock';
import { isTokenExpired } from './jwt_helper';

export default class AuthService extends EventEmitter {
  constructor() {
    super();

    const devUrl = 'http://localhost:3000/home';
    const prodUrl = 'http://shiparoo.herokuapp.com';

    this.lock = new Auth0Lock('HQyc8BbQc47Drpa85hJca6t6THDNOAXg', 'justinsuen.auth0.com', {
      auth: {
        redirectUrl: devUrl,
        responseType: 'token'
      },
    });

    this.lock.on('authenticated', this._doAuthentication.bind(this));
    this.login = this.login.bind(this);
  }

  _doAuthentication(authResult) {
    this.setToken(authResult.idToken);
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error);
      } else {
        this.setProfile(profile);
      }
    });
    browserHistory.replace('/home');
  }

  login() {
    this.lock.show();
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
    this.emit('profile_updated', profile);
  }

  getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) : {};
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }
}
