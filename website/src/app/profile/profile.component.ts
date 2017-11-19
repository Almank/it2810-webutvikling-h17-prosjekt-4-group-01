import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {isObject} from 'util';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Favorite} from './profile.favorite.service';
import {MovieDetailsService} from '../movie-view/movie-details/movie-details.service';
import {ProfileService} from './profile.service';

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
  auth: Boolean;
  favoriteList: Object;
  favoriteDisplay = [];
  favoriteListData;

  constructor(private router: Router, private http: HttpClient, public snackBar: MatSnackBar, private fav: Favorite,
              private modal: MovieDetailsService, private profile: ProfileService) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session === null || session.auth === false) {
      this.router.navigate(['/login']);
    } else {
      this.validateToken(session.token);
      this.auth = session.auth;
      this.username = session.username;
      this.token = session.token;
      this.loadFavorites();
    }
  }

  ngOnInit() {
  }

  // Logs out the user by removing the session and therefore removing the JasonWebToken
  // resulting in no more authenticated access to services.
  // Also reloads the website due to interference.
  onLogout() {
    localStorage.removeItem('session');
    this.router.navigate(['/']);
    location.reload();
  }

  // Invokes a http request with old password to change to a new one.
  // Alerts user wether or not the password change was applied.
  onNewPassword(form) {
    this.profile.onNewPassword(form).then(data => {
      if (isObject(data)) {
        this.onUserAlert('Password successfully changed', 'dismiss', true);
      }
    }, error => {
      this.onUserAlert(error.error.message, 'dismiss', false);
    });
  }

  // Validates the current token to see if it has expired. If the token has expired,
  // the user will be logged out and prompted to login again.
  validateToken(token) {
    this.profile.validateToken(token).then(data => {
    }, err => {
      if (isObject(err)) {
        this.onUserAlert(err.error.message, 'dismiss', false, 4000);
        this.onLogout();
      }
    });
  }

  // Loads all favorite ID's from a users session in the database.
  // This it is then passed to loadFavoriteListData() which gets all details from the
  // Movie objects in the database.
  loadFavorites() {
    this.fav.loadFavorites(this.token).then(favorite => {
      for (const key in favorite) {
        this.favoriteDisplay.push(favorite[key]);
      }
      this.fav.loadFavoriteListData(this.favoriteDisplay).then(data => {
        this.favoriteListData = data;
      });
    });
  }

  // Alerts the user when a user tries to change its password or fails to validate token.
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

  // Handles the opening of the modal of favorited movies.
  openDialog(favorite) {
    this.modal.openDialog(favorite, this.auth, this.token);
  }

  // Passes favorites to HTML
  get favorites() {
    return this.favoriteListData;
  }

  // Passes username to HTML
  get user() {
    return this.username;
  }
}
