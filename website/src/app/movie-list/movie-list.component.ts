import {  MovieList, Component, OnInit, ViewChild, MatDialog, DataSource, MatPaginator, BehaviorSubject,
          Observable, HttpClient, MovieDetailsComponent } from '../import-module';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { MovieListService } from './movie-list.service';

@Component({
  selector: 'movieList',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
  displayedColumns = ['title', 'year', 'genre', ];
  dataSource: ExampleMovieSource | null;
  dataChange: BehaviorSubject<MovieList[]>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  dialogResult = '';
  movieList: MovieList[];
  startYear: any;
  endYear: any;

  constructor(public dialog: MatDialog, private movieListService: MovieListService) {
    this.startYear = 0;
    this.endYear = 2017;
    this.dataChange = new BehaviorSubject<MovieList[]>([]);
  }

  getMovieList(): void {
    this.movieListService.getMovieList(this).then(movies => this.createList(movies));
  }

  /** Sets the Movie data displyed on in the Pop-up. */
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

  ngOnInit(): void {
    this.getMovieList();
    this.dataSource = new ExampleMovieSource(this, this.paginator);
  }

  createList(movieData) {
    /** Fill up the database with 100 movies. */
    for (let i = 0; i < 25 ; i++) {
      this.addMovie(i, movieData);
    }
  }

  /** Adds a new movie to the database. */
  addMovie(i, movieList) {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewMovie(i, movieList));
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new movie. */
  private createNewMovie(i, movieList) {
    return {
      _id: movieList[i]._id,
      readMore: movieList[i].readMore,
      poster: movieList[i].poster,
      plot: movieList[i].plot,
      actors: movieList[i].actors,
      director: movieList[i].director,
      genre: movieList[i].genre,
      runtime: movieList[i].runtime,
      year: movieList[i].year,
      title: movieList[i].title
    };
  }

  get data(): MovieList[] {
    return this.dataChange.value;
  }

  setYear(event, type) {
    if (type === 'start') {
      this.startYear = event;
    } else {
      this.endYear = event;
    }
    this.dataChange = new BehaviorSubject<MovieList[]>([]);
    this.getMovieList();
  }

}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 **/
export class ExampleMovieSource extends DataSource<any> {
  constructor(private _movieComponent: MovieListComponent, private _paginator: MatPaginator) {
    super();
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<MovieList[]> {
    const displayDataChanges = [
      this._movieComponent.dataChange,
      this._paginator.page,
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._movieComponent.data.slice();
  /** Grab the page's slice of data. */
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }
  disconnect() {}
}
