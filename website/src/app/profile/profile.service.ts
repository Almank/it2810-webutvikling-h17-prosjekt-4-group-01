import {Injectable, HttpClient} from '../import-module';
import {HttpHeaders} from '@angular/common/http';
import {isObject} from 'util';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Injectable()
export class ProfileService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  token: String;

  constructor(private http: HttpClient, public snackBar: MatSnackBar, private router: Router) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!(session === null || session.auth === false)) {
      this.token = session.token;
    }
  }

  // Handles the http post request to change the password.
  onNewPassword(form) {
    const params = JSON.stringify({
      token: this.token,
      oldPassword: form.value.oldPassword,
      newPassword: form.value.newPassword
    });
    return this.http.post('/api/new_password', params, {headers: this.headers})
      .toPromise()
      .then( data => {
      return data;
    });
  }

  // Handles the http post request to validate the jwt token.
  validateToken(token) {
    const params = JSON.stringify({
      token: token,
    });
    this.http.post('/api/login/verify', params, {headers: this.headers}).toPromise().then( data => {
    }, err => {
      if (isObject(err)) {
        this.onUserAlert(err.error.message, 'dismiss', false, 4000);
        this.onLogout();
      }
    });
  }

  // Alerts the user when a user tries to change its password or fails to validate token.
  onUserAlert(message: string, action: string, positive: boolean, duration = 2000) {
    let extra = 'alert-negative';
    if (positive) {
      extra = 'alert-positive';
    }
    this.snackBar.open(message, action, {
      extraClasses: [extra],
      duration: duration
    });
  }

  // Logs out the user by removing the session and therefore removing the JasonWebToken
  // resulting in no more authenticated access to services.
  // Also reloads the website due to interference.
  onLogout() {
    localStorage.removeItem('session');
    console.log('session is removed');
    this.router.navigate(['/']);
    location.reload();
  }
}
