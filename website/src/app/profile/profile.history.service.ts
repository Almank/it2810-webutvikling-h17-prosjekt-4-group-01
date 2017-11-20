import {Injectable, HttpClient} from '../import-module';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class ProfileHistoryService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  token: String;
  auth: Boolean;
  currentHistory = [];

  constructor(private http: HttpClient) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!(session === null || session.auth === false)) {
      this.token = session.token;
      this.auth = session.auth;
    }
  }

  // Check if movie already exists in currentHistory
  // then add it to the stack.
  addMovie(movie_id) {
    const index = this.currentHistory.indexOf(movie_id);
    if (index > -1) {
      this.currentHistory.splice(index, 1);
    }
    this.currentHistory.push(movie_id);
  }

  updateUser() {
    // Todo: API request
  }

  getCurrentHistory() {
    return this.currentHistory.reverse();
  }
}
