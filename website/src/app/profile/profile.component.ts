import {Component, OnInit, HttpClient, HttpHeaders, isObject} from '../import-module';
/** Importing these separately as the site crashes if they are barreled */
import {Router} from '@angular/router';
import {Favorite} from './profile.favorite.service';
import {MovieDetailsService} from '../movie-view/movie-details/movie-details.service';
import {ProfileService} from './profile.service';
import {ProfileHistoryService} from './profile.history.service';
import {ViewEncapsulation} from '@angular/core';

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
  searchHistory: Object[];

  constructor(private router: Router, private http: HttpClient, private fav: Favorite,
              private modal: MovieDetailsService, private profile: ProfileService,
              public history: ProfileHistoryService) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session === null || session.auth === false) {
      this.router.navigate(['/login']);
    } else {
      this.profile.validateToken(session.token);
      this.auth = session.auth;
      this.username = session.username;
      this.token = session.token;
      this.loadFavorites();
      this.loadHistory();
    }
  }

  ngOnInit() {
    this.searchHistory = this.history.getCurrentHistory();
  }

  // Calls the service onLogout()
  onLogout() {
    this.profile.onLogout();
  }

  // Invokes a http request with old password to change to a new one.
  // Alerts user wether or not the password change was applied.
  onNewPassword(form) {
    this.profile.onNewPassword(form).then(data => {
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
    this.fav.loadFavorites(this.token).then(favorite => {
      for (const key in favorite) {
        this.favoriteDisplay.push(favorite[key]);
      }
      this.fav.loadFavoriteListData(this.favoriteDisplay).then(data => {
        this.favoriteListData = data;
      });
    });
  }

  // Uses the profile.hsistory service to update the profile content to match
  // the servers session object.
  loadHistory() {
    this.history.updateHistory(this.token).then(data => {
      this.searchHistory = [];
      this.history.loadHistoryMovieData(data).then(liste => {
        let result = [];
        const mapping = liste['mapping'];
        const mapped = liste['mapped'];
        for (let map in mapping) {
          result.push(mapped[mapping[map]]);
        }
        this.searchHistory = result;
        this.history.currentHistory = result;
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

  // Passes history data to HTML
  get userHistory() {
    const history = this.history.currentHistory;
    return history.reverse();
  }
}
