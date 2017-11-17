import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {isObject} from '../import-module';
import {AuthenticationService} from './auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit {

  // Upon clicking the sign-in icon on the navbar, the login page shows based on of the user
  // is already logged in or not. The constructor ensures that the browser navigates properly.
  constructor(private auth: AuthenticationService, private router: Router, public snackBar: MatSnackBar) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session === null) {
      this.router.navigate(['/login']);
    } else if (session.auth === true) {
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit() {
  }

  // When the register form is invoked in the HTML it calls onRegister,
  // which calls the api to create a new user.
  onRegister(form) {
    const register = this.auth.onRegister(form);
    register.then(data => {
      if (isObject(data)) {
        this.onLogin(form);
      }
    }, err => {
      this.onUserError(err.error.message, 'dismiss', false);
    });
  }

  // onLogin does almost the same as onRegister, but logs the user in instead.
  onLogin(form) {
    const login = this.auth.onLogin(form);
    login.then(data => {
      if (isObject(data)) {
        // if data is valid, save data to localstorage as a session for the client to use.
        if (data['auth']) {
          localStorage.setItem('session', JSON.stringify({
            token: data['token'],
            auth: data['auth'],
            username: form.value.username,
            favorites: [],
          }));
          console.log('token saved to LS and user is logged in');
          this.router.navigate(['/profile']);
          location.reload();
        }
      }
    }, err => {
      this.onUserError(err.error.message, 'dismiss', false);
    });
  }

  // onUserError is invoked when a user tries to login with wrong credentials or
  // registering an already exisiting user. It shows a little notice about the error.
  onUserError(message: string, action: string, positive: boolean) {
    let extra = 'alert-negative';
    if (positive) {
      extra = 'alert-positive';
    }
    this.snackBar.open(message, action, {
      extraClasses: [extra],
      duration: 2000
    });
  }
}
