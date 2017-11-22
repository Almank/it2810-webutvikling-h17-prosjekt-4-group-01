import {Injectable, HttpClient, HttpHeaders, isObject} from '../import-module';


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

  // Main logic behind favoriting movies.
  // If a user favorites or unfavorites a movie, this function will be invoked and sends a http request
  // to the api telling it what to handle.
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
              const session = JSON.parse(localStorage.getItem('session'));
              const index = session['favorites'].indexOf(id);
              const favorite = session.favorites;
              favorite.splice(index, 1);
              const new_session = {
                auth: session.auth,
                favorites: favorite,
                token: this.token,
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
              const session = JSON.parse(localStorage.getItem('session'));
              const favorite = session.favorites;
              favorite.push(id);
              const new_session = {
                auth: session.auth,
                favorites: favorite,
                token: this.token,
                username: session.username
              };
              localStorage.setItem('session', JSON.stringify(new_session));
            }
          });
        }
      }
    });
  }

  // Handles loading of the favorite ID list by session by http
  loadFavorites(token) {
    const params = JSON.stringify({
      token: token,
    });
    return this.http.post('/api/favorites', params, {headers: this.headers}).toPromise().then(favorites => {
      if (isObject(favorites)) {
        const session = JSON.parse(localStorage.getItem('session'));
        session['favorites'] = favorites;
        localStorage.setItem('session', JSON.stringify(session));
        return favorites;
      }
    });
  }

  // Handles the http request for matching favorite ID's up against movies in database.
  loadFavoriteListData(favorites) {
    const params = JSON.stringify({
      favoriteList: favorites
    });
    return this.http.post('/api/favorites/data', params, {headers: this.headers}).toPromise()
      .then(data => {
        return data;
      });
  }
}
