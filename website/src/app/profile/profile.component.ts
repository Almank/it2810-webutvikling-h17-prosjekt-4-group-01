import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  http: HttpClient;

  // TODO get username from api
  constructor(private router: Router) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session === null || session.auth === false) {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit() {
  }
  onLogout() {
    const session = JSON.parse(localStorage.getItem('session'));
    session.auth = false;
    localStorage.setItem('session', JSON.stringify(session));
    this.router.navigate(['/']);
  }

}
