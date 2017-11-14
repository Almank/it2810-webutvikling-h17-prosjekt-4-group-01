import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isObject } from 'util';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  username: String;
  token: String;

  // TODO get username from api
  constructor(private router: Router, private http: HttpClient, public snackBar: MatSnackBar) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session === null || session.auth === false) {
      this.router.navigate(['/login']);
    } else {
      this.validateToken(session.token);
      this.username = session.username;
      this.token = session.token;
    }
  }
  ngOnInit() {
  }
  onLogout() {
    localStorage.removeItem('session');
    this.router.navigate(['/']);
  }
  get user() {
    return this.username;
  }
  onNewPassword(form) {
    const params = JSON.stringify({
      token: this.token,
      oldPassword: form.value.oldPassword,
      newPassword: form.value.newPassword
    });
    this.http.post('/api/new_password', params, {headers: this.headers}).subscribe(data => {
      if (isObject(data)) {
        this.onUserAlert('Password successfully changed', 'dismiss', true);
      }
    }, error => {
      this.onUserAlert(error.error.message, 'dismiss', false);
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

  validateToken(token) {
    const params = JSON.stringify({
      token: token,
    });
    this.http.post('/api/login/verify', params, {headers: this.headers}).subscribe(data => {}, err => {
      if (isObject(err)) {
        this.onUserAlert(err.error.message, 'dismiss', false, 4000);
        this.onLogout();
      }
    });
  }

}
