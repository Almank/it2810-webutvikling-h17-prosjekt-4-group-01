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

  onLogout() {
    localStorage.removeItem('session');
    console.log('session is removed');
    this.router.navigate(['/']);
    location.reload();
  }

  validateToken(token) {
    const params = JSON.stringify({
      token: token,
    });
    this.http.post('/api/login/verify', params, {headers: this.headers}).toPromise().then(data => {
    }, err => {
      if (isObject(err)) {
        this.onUserAlert(err.error.message, 'dismiss', false, 4000);
        this.onLogout();
      }
    });
  }


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

}
