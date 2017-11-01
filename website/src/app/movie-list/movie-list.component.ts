import { Component, OnInit, ViewChild, MatDialog, DataSource, MatPaginator, BehaviorSubject, Observable, HttpClient, HttpParams, isObject } from './import-module';
import  'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'movieList',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
  displayedColumns = ['title', 'year', 'genre', 'director', 'runtime' ];
  dataSource: ExampleMovieSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.generateList();
    this.dataSource = new ExampleMovieSource(this, this.paginator);
  }

  generateList() {
    const params = new HttpParams()
      .set('limit', '25').set('page', '0').set('genre', 'Action').set('year', '2015-2016').set('actors', 'John Krasinski, Pablo Schreiber');
    this.http.get('/api/movies', {params}).subscribe(data => {
      /** Read the result field from the JSON response. */
      if (isObject(data)) {
        const movieData = ((<MovieData> data));
        this.createList(movieData);
      }
    });
  }

  createList(movieData){
    /** Fill up the database with 100 movies. */
    for (let i = 0; i < 25 ; i++) { this.addMovie(i, movieData);}
  }

  /** Adds a new movie to the database. */
  addMovie(i, movieList) {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewMovie(i, movieList));
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new movie. */
  private createNewMovie(i, movieList) {
    const readMore = movieList[i].readMore;
    const poster = movieList[i].poster;
    const plot = movieList[i].plot;
    const actors = movieList[i].actors;
    const director= movieList[i].director;
    const genre= movieList[i].genre;
    const runtime = movieList[i].runtime;
    const year = movieList[i].year;
    const title =  movieList[i].title;
    const _id = movieList[i]._id;
    return {
      _id: _id,
      readMore: readMore,
      poster: poster,
      plot: plot,
      actors: actors,
      director: director,
      genre: genre,
      runtime: runtime,
      year: year,
      title: title
    };
  }

  dataChange: BehaviorSubject<MovieData[]> = new BehaviorSubject<MovieData[]>([]);

  get data(): MovieData[] {
    return this.dataChange.value;
  }
}

export interface MovieData {
  _id?: number;
  readMore?: string;
  poster?: string;
  plot?: string;
  actors?: string;
  director?: string;
  genre?: string;
  runtime?: string;
  year?: number;
  title?: string;
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
  connect(): Observable<MovieData[]> {
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
