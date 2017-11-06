import { Injectable, MovieList, HttpClient, isObject, HttpParams } from '../import-module';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieListService {
  constructor(private http: HttpClient) {}

  getMovieList(component): Promise<MovieList[]> {
    console.log(component.startYear + '-' + component.endYear);
    const params = new HttpParams().set('limit', '25').set('page', '0').set('year', component.startYear + '-' + component.endYear);
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
