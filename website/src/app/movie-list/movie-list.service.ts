import { Injectable, MovieList, HttpClient, isObject, HttpParams } from '../import-module';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieListService {

  constructor(private http: HttpClient) {}

  getMovieList(comp): Promise<MovieList[]> {
    const params = new HttpParams()
    /** .set('genre', 'Action').set('year', '2015-2016').set('actors', 'John Krasinski, Pablo Schreiber').set('director', 'Michael Bay'); */
      .set('have', comp.have) .set('need', comp.need)
      .set('title', comp.searchWord)
      .set('year', comp.startYear + '-' + comp.endYear)
      .set('genre', comp.selectedGenre.slice(0, -1));
    return this.http.get('/api/movies/list', { params })

      .toPromise()
      .then(data => {
        if (isObject(data)) {
          return  (<MovieList[]> data);
        }})
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
