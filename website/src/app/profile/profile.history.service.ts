import {Injectable, HttpClient} from '../import-module';
import {HttpHeaders} from '@angular/common/http';
import {isObject} from 'util';
import {Favorite} from './profile.favorite.service';

@Injectable()
export class ProfileHistoryService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  token: String;
  auth: Boolean;
  currentHistory = [];

  constructor(private http: HttpClient, private fav: Favorite) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!(session === null || session.auth === false)) {
      this.token = session.token;
      this.auth = session.auth;
    }
  }

  // Check if movie already exists in currentHistory
  // then add it to the stack.
  addMovie(movie) {
    function containsObject(obj, list) {
      let i;
      for (i = 0; i < list.length; i++) {
        if (list[i]._id === obj._id) {
          return {exist: true, i: i};
        }
      }
      return {exist: false, i: i};
    }

    const contains = containsObject(movie, this.currentHistory);

    if (contains.exist) {
      this.currentHistory.splice(contains.i, 1);
    }
    this.currentHistory.push(movie);
    this.addHistory();
  }

  updateHistory(token) {
    const params = JSON.stringify({
      token: token,
    });
    return this.http.post('/api/history', params, {headers: this.headers}).toPromise().then(data => {
      return data;
    });
  }

  addHistory() {
    const movie_list = [];
    for (let key in this.currentHistory) {
      movie_list.push(this.currentHistory[key]._id);
    }
    const params = JSON.stringify({
      token: this.token,
      movie_ids: movie_list
    });
    return this.http.post('/api/history/add', params, {headers: this.headers}).toPromise().then(data => {
      if (isObject(data)) {
      }
    });
  }

  loadHistoryMovieData(historyList) {
    const params = JSON.stringify({
      historyList: historyList
    });
    return this.http.post('/api/history/data', params, {headers: this.headers}).toPromise()
      .then(data => {
        return data;
      });
  }

  getCurrentHistory() {
    const history = this.currentHistory;
    return history;
  }
}
