import { Injectable, MovieList, HttpClient, isObject, HttpParams } from '../import-module';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieListService {

  constructor(private http: HttpClient) {}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // For demo purposes only
    return Promise.reject(error.message || error);
  }

  /** Get movies with filter and sort variables */
  getMovieList(comp): Promise<MovieList[]> {
    const params = new HttpParams()
      .set('have', comp.have) .set('need', comp.need)
      .set('year', comp.startYear + '-' + comp.endYear)
      .set('genre', comp.selectedGenre)
      .set('title', comp.searchTitle)
      .set('director', comp.searchDirector)
      .set('actors', comp.searchActor)
      .set('sort', comp.selectedSort)
      .set('desc', comp.descAsc);
    return this.http.get('/api/movies/list', { params }).toPromise()
      .then(data => {
        if (isObject(data)) {
          return  (<MovieList[]> data);
        }})
      .catch(this.handleError);
  }

  /** Get amount of movies matching search. */
  getAmountOfMovies(comp) {
    const params = new HttpParams()
      .set('year', comp.startYear + '-' + comp.endYear)
      .set('genre', comp.selectedGenre)
      .set('title', comp.searchTitle)
      .set('director', comp.searchDirector)
      .set('actors', comp.searchActor)
      .set('sort', comp.selectedSort)
      .set('desc', comp.descAsc);
    return this.http.get('/api/movies/amount', { params }).toPromise()
      .then(data => {
          return  (data);
        })
      .catch(this.handleError);
  }

  /** Get details for movie modal */
  getMovieModal(listData): Promise<MovieList[]> {
    const params = new HttpParams().set('title', listData.title);
    return this.http.get('/api/movies/modal', { params })
      .toPromise()
      .then(data => {
        if (isObject(data)) {
          return  (<MovieList[]> data);
        }})
      .catch(this.handleError);
  }
}
