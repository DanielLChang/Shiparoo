import Auth0Lock from 'auth0-lock';
import {
  browserHistory
} from 'react-router';

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000/login',
        responseType: 'token'
      }
    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken);
    // navigate to the home route
    browserHistory.replace('/home');
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
    // (err, profile, token) => {
    //   if (err) {
    //     return alert(err);
    //   }
    //
    //   let globalProfile = profile;
    //   let globalToken = token;
    //
    //   browserHistory.replace('/home');
    // }
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken();
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token');
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      // if logged in, includes the authorization header
    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {headers, ...options})
      .then(this._checkStatus) // to raise errors for wrong status
      .then(response => response.json()) // to parse the response as json
  }
}
