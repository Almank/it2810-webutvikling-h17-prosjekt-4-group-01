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
              console.log('removed favorite');
              const session = JSON.parse(localStorage.getItem('session'));
              const index = session['favorites'].indexOf(id);
              const favorite = session.favorites;
              favorite.splice(index, 1);
              const new_session = {
                auth: session.auth,
                favorites: favorite,
                token: session.token,
                username: session.username
              };
              localStorage.setItem('favorites', JSON.stringify(new_session));
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
              console.log('added favorite');
              const session = JSON.parse(localStorage.getItem('session'));
              const favorite = session.favorites;
              favorite.push(id);
              const new_session = {
                auth: session.auth,
                favorites: favorite,
                token: session.token,
                username: session.username
              };
              localStorage.setItem('session', JSON.stringify(new_session));
            }
          });
        }
      }
    });
  }

  loadFavorites() {
    const params = JSON.stringify({
      token: this.token,
    });
    this.http.post('/api/favorites', params, {headers: this.headers}).subscribe(favorites => {
      if (isObject(favorites)) {
        const session = JSON.parse(localStorage.getItem('session'));
        session['favorites'] = favorites;
        localStorage.setItem('session', JSON.stringify(session));
      }
    });
  }
}
