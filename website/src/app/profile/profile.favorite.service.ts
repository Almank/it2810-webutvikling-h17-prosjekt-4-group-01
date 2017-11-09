import {Injectable, HttpClient} from '../import-module';
import {HttpHeaders} from '@angular/common/http';
import {isObject} from 'util';

@Injectable()
export class Favorite {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  token: String;

  constructor(private http: HttpClient) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!(session === null || session.auth === false)) {
      this.token = session.token;
    }
  }

  favorite(id) {
    let params = JSON.stringify({
      token: this.token,
    });
    this.http.post('/api/favorites', params, {headers: this.headers}).subscribe(favorites => {
      if (isObject(favorites)) {
        if (JSON.stringify(favorites).includes(id)) {
          params = JSON.stringify({
            token: this.token,
            movie_id: id,
            newFavorite: false,
          });
          this.http.post('/api/favorites/modify', params, {headers: this.headers}).subscribe(data => {
            if (isObject(data)) {
              console.log("removed favorite");
            }
          });
        } else {
          params = JSON.stringify({
            token: this.token,
            movie_id: id,
            newFavorite: true,
          });
          this.http.post('/api/favorites/modify', params, {headers: this.headers}).subscribe(data => {
            if (isObject(data)) {
              console.log("added favorite");
            }
          });
        }
      }
    });
  }
}
