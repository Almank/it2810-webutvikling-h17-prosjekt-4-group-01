import {Component} from '../import-module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: String;
  playIcon = 'play_circle_filled';
  changeIcon = true;
  constructor() {
  }

  // Toggle logo icon
  toggleIcon() {
    this.changeIcon = ! this.changeIcon;
    this.changeIcon ? this.playIcon = 'play_circle_filled' : this.playIcon = 'play_circle_outline';
  }

  // Show username
  userStatus() {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session === null) {
      return 'Sign-In';
    } else if (session.username) {
      return session.username;
    }
  }

  // Get function for user status
  get user() {
    return this.userStatus();
  }

}
