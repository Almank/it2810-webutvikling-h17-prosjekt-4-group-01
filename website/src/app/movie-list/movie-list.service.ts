import { Injectable, MovieList, HttpClient, isObject, HttpParams } from '../import-module';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieListService {

  constructor(private http: HttpClient) {}


  getMovieList(comp): Promise<MovieList[]> {
<<<<<<< HEAD
=======
    if (comp.selectedGenre === undefined || comp.selectedGenre === '') {
      comp.selectedGenre = comp.selectedGenre.slice(0, -1);
    }
>>>>>>> 5707a8d1cf4b29299babaf5e84193a6d361a3530
    const params = new HttpParams()
    /** .set('genre', 'Action').set('year', '2015-2016').set('actors', 'John Krasinski, Pablo Schreiber').set('director', 'Michael Bay'); */
      .set('have', comp.have) .set('need', comp.need)
      .set('year', comp.startYear + '-' + comp.endYear)
      .set('genre', comp.selectedGenre)
      .set('title', comp.searchTitle)
      .set('director', comp.searchDirector)
      .set('actors', comp.searchActor);
    return this.http.get('/api/movies/list', { params })

      .toPromise()
      .then(data => {
        if (isObject(data)) {
          return  (<MovieList[]> data);
        }})
      .catch(this.handleError);
  }

  getAmountOfMovies() {
    return this.http.get('/api/movies/amount').map(val => val);
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
