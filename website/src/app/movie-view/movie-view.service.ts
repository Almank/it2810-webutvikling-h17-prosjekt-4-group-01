import { Injectable, MovieList, HttpClient, isObject, HttpParams } from '../import-module';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieListService {

  constructor(private http: HttpClient) {}

  getMovieList(comp): Promise<MovieList[]> {
    if (!(comp.selectedGenre === undefined || comp.selectedGenre === '')) {
      comp.selectedGenre = comp.selectedGenre.slice(0, -1);
    }
    const params = new HttpParams()
      .set('have', comp.have) .set('need', comp.need)
      .set('year', comp.startYear + '-' + comp.endYear)
      .set('genre', comp.selectedGenre)
      .set('title', comp.searchTitle)
      .set('director', comp.searchDirector)
      .set('actors', comp.searchActor);
    return this.http.get('/api/movies/list', { params }).toPromise()
      .then(data => {
        if (isObject(data)) {
          return  (<MovieList[]> data);
        }})
      .catch(this.handleError);
  }

  getAmountOfMovies(comp) {
    const params = new HttpParams()
      .set('year', comp.startYear + '-' + comp.endYear)
      .set('genre', comp.selectedGenre)
      .set('title', comp.searchTitle)
      .set('director', comp.searchDirector)
      .set('actors', comp.searchActor);
    return this.http.get('/api/movies/amount', { params }).toPromise()
      .then(data => {
          return  (data);
        })
      .catch(this.handleError);
  }

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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
