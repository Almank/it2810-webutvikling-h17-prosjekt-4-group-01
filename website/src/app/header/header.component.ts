import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: String;
  playIcon = 'play_circle_filled';
  changeIcon = true;
  constructor() {
  }

  ngOnInit() {}

  toggleIcon() {
    this.changeIcon = ! this.changeIcon;
    this.changeIcon ? this.playIcon = 'play_circle_filled' : this.playIcon = 'play_circle_outline';
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
