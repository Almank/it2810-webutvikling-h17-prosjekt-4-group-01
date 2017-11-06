import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: String;
  constructor() {
  }

  ngOnInit() {
  }
  userStatus() {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session === null) {
      return 'Sign-In';
    } else if (session.username) {
      return session.username;
    }
  }
  get user() {
    return this.userStatus();
  }

}
