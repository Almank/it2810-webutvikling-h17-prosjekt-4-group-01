import {Injectable, HttpClient,HttpHeaders, isObject  } from '../import-module';
/** Importing these separately as the site crashes if they are barreled */
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
    return this.http.post('/api/login/verify', params, {headers: this.headers}).toPromise().then( data => {
      return data;
    });
  }
}
