import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isObject } from 'util';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) {}

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
      }
    });
  }
  onLogin(form) {
    const params = JSON.stringify({
      username: form.value.username,
      password: form.value.password,
    });
    this.http.post('/api/login', params, {headers: this.headers}).subscribe(data => {
      if (isObject(data)) {
        console.log(data);
      }
    });

    // TODO if login == successfull -> localstorage save
  }
}
