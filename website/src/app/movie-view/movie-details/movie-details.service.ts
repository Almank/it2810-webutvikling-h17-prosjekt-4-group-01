import {Injectable, HttpClient, MatDialog} from '../../import-module';
import {MovieDetailsComponent} from './movie-details.component';
import {HttpHeaders} from '@angular/common/http';
import {MovieListService} from '../movie-view.service';
import 'rxjs/add/operator/toPromise';
import {ProfileService} from '../../profile/profile.service';
import {ProfileHistoryService} from '../../profile/profile.history.service';

@Injectable()
export class MovieDetailsService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  dialogResult: String;

  constructor(private http: HttpClient, public dialog: MatDialog, private movieListService: MovieListService,
              private profile: ProfileService, public history: ProfileHistoryService) {
  }

  openDialog(data, auth, token) {
    // If user is logged in, check if movie is favorited
    if (auth) {
      this.profile.validateToken(token);
      this.history.addMovie(data);
      const params = JSON.stringify({
        token: token,
        movie_id: data._id,
      });
      this.http.post('/api/favorites/exists', params, {headers: this.headers}).subscribe(favorites => {
        if (favorites) {
          this.generateModal(data, auth, true);
        } else {
          this.generateModal(data, auth, false);
        }
      });
    } else {
      this.generateModal(data, auth, false);
    }
  }

  generateModal(data, auth, exists) {
    // Generate modal data
    this.movieListService.getMovieModal(data).then(movies => {
      data = {
        '_id': data._id,
        'title': data.title,
        'poster': movies[0].poster,
        'plot': movies[0].plot,
        'runtime': movies[0].runtime,
        'actors': data.actors,
        'director': data.director,
        'genre': data.genre,
        'year': data.year,
        'favorited': exists,
        'auth': auth
      };
      const dialogRef = this.dialog.open(MovieDetailsComponent, {
        data,
      });

      dialogRef.afterClosed().subscribe(result => {
        this.dialogResult = result;
      });
    });
  }

}
