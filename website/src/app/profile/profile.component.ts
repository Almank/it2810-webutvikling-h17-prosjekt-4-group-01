import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {isObject} from 'util';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Favorite} from './profile.favorite.service';
import {MovieDetailsService} from "../movie-view/movie-details/movie-details.service";

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

  // TODO get username from api
  constructor(private router: Router, private http: HttpClient, public snackBar: MatSnackBar, private fav: Favorite,
              private modal: MovieDetailsService) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session === null || session.auth === false) {
      this.router.navigate(['/login']);
    } else {
      this.validateToken(session.token);
      this.auth = session.auth;
      this.username = session.username;
      this.token = session.token;
      this.favoriteList = session.favorites;
      console.log(this.favoriteList);
    }
  }

  ngOnInit() {
    this.loadFavorites();
  }

  onLogout() {
    localStorage.removeItem('session');
    console.log('session is removed');
    this.router.navigate(['/']);
  }

  get user() {
    return this.username;
  }

  onNewPassword(form) {
    const params = JSON.stringify({
      token: this.token,
      oldPassword: form.value.oldPassword,
      newPassword: form.value.newPassword
    });
    this.http.post('/api/new_password', params, {headers: this.headers}).subscribe(data => {
      if (isObject(data)) {
        this.onUserAlert('Password successfully changed', 'dismiss', true);
      }
    }, error => {
      this.onUserAlert(error.error.message, 'dismiss', false);
    });
  }

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

  validateToken(token) {
    const params = JSON.stringify({
      token: token,
    });
    this.http.post('/api/login/verify', params, {headers: this.headers}).subscribe(data => {
    }, err => {
      if (isObject(err)) {
        this.onUserAlert(err.error.message, 'dismiss', false, 4000);
        this.onLogout();
      }
    });
  }

  loadFavorites() {
    this.fav.loadFavorites();
    for (const key in this.favoriteList) {
      this.favoriteDisplay.push(this.favoriteList[key]);
    }
    this.loadFavoriteListData(this.favoriteDisplay).then(data => {
      this.favoriteListData = data;
    });
  }

  loadFavoriteListData(favorites) {
    const params = JSON.stringify({
      favoriteList: favorites
    });
    return this.http.post('/api/favorites/data', params, {headers: this.headers}).toPromise()
      .then(data => {
        return (data);
      });
  }

  openDialog(favorite) {
    this.modal.openDialog(favorite, this.auth, this.token);
  }

  get favorites() {
    return this.favoriteListData;
  }
}
