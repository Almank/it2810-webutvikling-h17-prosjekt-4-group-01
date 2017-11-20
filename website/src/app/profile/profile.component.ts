import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {isObject} from 'util';
import {Router} from '@angular/router';
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

  constructor(private router: Router, private http: HttpClient, private fav: Favorite,
              private modal: MovieDetailsService, private profile: ProfileService) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session === null || session.auth === false) {
      this.router.navigate(['/login']);
    } else {
      this.profile.validateToken(session.token);
      this.auth = session.auth;
      this.username = session.username;
      this.token = session.token;
      this.loadFavorites();
    }
  }

  ngOnInit() {
  }

  // Calls the service onLogout()
  onLogout() {
    this.profile.onLogout();
  }

  // Invokes a http request with old password to change to a new one.
  // Alerts user wether or not the password change was applied.
  onNewPassword(form) {
    const newPassword = this.profile.onNewPassword(form);
    newPassword.then(data => {
      if (isObject(data)) {
        this.profile.onUserAlert('Password successfully changed', 'dismiss', true);
      }
    }, error => {
      this.profile.onUserAlert(error.error.message, 'dismiss', false);
    });
  }

  // Loads all favorite ID's from a users session in the database.
  // This it is then passed to loadFavoriteListData() which gets all details from the
  // Movie objects in the database.
  loadFavorites() {
    const favorites = this.fav.loadFavorites(this.token);
    favorites.then(favorite => {
      for (const key in favorite) {
        this.favoriteDisplay.push(favorite[key]);
      }
      this.fav.loadFavoriteListData(this.favoriteDisplay).then(data => {
        this.favoriteListData = data;
      });
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
