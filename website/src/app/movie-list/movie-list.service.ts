import { Injectable, MovieList, HttpClient, isObject, HttpParams } from '../import-module';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieListService {

  constructor(private http: HttpClient) {}

  getMovieList2(movieNum, pageNum, searchWord): Promise<MovieList[]> {
    const params = new HttpParams()
    /** .set('genre', 'Action').set('year', '2015-2016').set('actors', 'John Krasinski, Pablo Schreiber').set('director', 'Michael Bay'); */
      .set('limit', movieNum).set('page', pageNum)
      .set('title', searchWord);
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
