import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isObject } from 'util';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
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
        this.onUserAlert('Password successfully changed', 'dismiss');
      }
    });
  }
  onUserAlert(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
