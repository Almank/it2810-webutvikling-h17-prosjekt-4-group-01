import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isObject } from 'util';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
  }
  onRegister(form) {
    const params = new HttpParams().set('username', form.value.username).set('password', form.value.password);
    this.http.post('/api/register', {params}).subscribe(data => {
      if (isObject(data)) {
        console.log(data);
      }
    });
  }
  onLogin(form) {
    const params = new HttpParams().set('username', form.value.username).set('password', form.value.password);
    this.http.post('/api/login', {params}).subscribe(data => {
      if (isObject(data)) {
        console.log(data);
      }
    });

    // TODO if login == successfull -> localstorage save
  }
}
