import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isObject } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient, private router: Router) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session === null) {
      this.router.navigate(['/login']);
    } else if ( session.auth === true ) {
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit() {
  }
  onRegister(form) {
    const params = JSON.stringify({
      username: form.value.username,
      password: form.value.password,
    });
    this.http.post('/api/register', params, {headers: this.headers}).subscribe(data => {
      if (isObject(data)) {
        console.log(data);
        this.router.navigate(['/profile']);
      }
    }, err => {
      console.log(err.error.message);
    });
  }
  onLogin(form) {
    const params = JSON.stringify({
      username: form.value.username,
      password: form.value.password,
    });
    this.http.post('/api/login', params, {headers: this.headers}).subscribe(data => {
      if (isObject(data)) {
        if (data['auth']) {
          localStorage.setItem('session', JSON.stringify({
            token: data['token'],
            auth: data['auth'],
            username: form.value.username,
          }));
          console.log('token saved to LS and user is logged in');
          this.router.navigate(['/profile']);
        }
      }
    }, err => {
      console.log(err.error.message);
    });
  }
}
