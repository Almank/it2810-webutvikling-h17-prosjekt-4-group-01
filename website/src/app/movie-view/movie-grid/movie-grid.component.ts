
import {  MovieList, Component, OnInit, MatDialog, MovieDetailsComponent} from '../../import-module';
import { MovieListService } from '../movie-view.service';

@Component({
  selector: 'grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css'],
  providers: [MovieListService]
})

export class MovieGridComponent implements OnInit {
  movies: MovieList[];
  dialogResult: string;

  constructor(public dialog: MatDialog, private movieListService: MovieListService) {
    this.movieListService.getMovieList('').then(movies => this.getData(movies));
  }

  getData(movies){
    console.log(movies.poster);
    this.movies = movies;
  }
  openDialog(data) {
    this.movieListService.getMovieModal(data).then( movies => {
      data = {
        'title': data.title,
        'poster': movies[0].poster,
        'plot': movies[0].plot,
        'runtime': movies[0].runtime,
        'actors': data.actors,
        'director': data.director,
        'genre': data.genre,
        'year': data.year,
      };
      const dialogRef = this.dialog.open(MovieDetailsComponent, {
        data,
      });

      dialogRef.afterClosed().subscribe(result => {
        this.dialogResult = result;
      });
    });
  }
  ngOnInit(){

  }

}
