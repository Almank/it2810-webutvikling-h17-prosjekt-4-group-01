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
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  dialogResult = '';
  movieList: MovieList[];
  searchTitle: string;
  searchActor: string;
  searchDirector: string;
  searchResults: number;
  dataChange: BehaviorSubject<MovieData[]>;
  pageLength: number;
  validRefresh: boolean;

  have: number;
  need: number;

  constructor(public dialog: MatDialog, private movieListService: MovieListService) {
    this.have = 0;
    this.need = 10;
    this.dataChange = new BehaviorSubject<MovieData[]>([]);
    this.pageLength = 322
    this.validRefresh = false;
    this.searchTitle = '';
    this.searchDirector = '';
    this.searchActor = '';

  }

  ngOnInit(): void {
    this.getMovieList();
  }
  /** Hvorfor heter begge funksjonene get movielist????? */
  getMovieList(): void {
    this.movieListService.getMovieList2(this).then(movies => this.createList(movies))
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


  createList(movieData) {
    this.dataSource = new ExampleMovieSource(this, this.paginator);
    /** Fill up the database with 25 movies. */
    for (let i = 0; i < movieData.length ; i++) {
      this.addMovie(i, movieData);
    }
    if (this.validRefresh === true) {
      console.log(movieData.length);
      this.searchResults += movieData.length;
      this.paginator.length = this.searchResults;
    }
  }

  /** Adds a new movie to the database. */
  addMovie(i, movieList) {
    const copiedData = this.data.slice();
    if (this.checkDuplicate(copiedData, i, movieList)) {
      copiedData.push(this.createNewMovie(i, movieList));
    }
    this.dataChange.next(copiedData);

  }

  checkDuplicate(copiedData, i, movieList){
    for (let k=0; k<copiedData.length; k++){
      if (movieList[i]._id == copiedData[k]._id){
        console.log(movieList[i].title, "is already in the list");
        return false;
      }
    }
    return true;
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

  get data(): MovieData[] {
    return this.dataChange.value;
  }

  searchDatabase(value) {
    if (value === "" && this.validRefresh === true) {
      this.validRefresh = false;
      this.dataChange = new BehaviorSubject<MovieData[]>([]);
      console.log(this.have, this.need);
      this.paginator.pageIndex = 0;
      this.paginator.length = 322;
      this.have = 0
      this.need =((this.paginator.pageIndex+1) * this.paginator.pageSize)
      this.changeValues(this.paginator);
    }

    else if (value !== "") {
      this.searchResults = 0;
      this.validRefresh = true;
      this.have = 0;
      this.need = this.paginator.pageSize;
      this.paginator.pageIndex = 0;
      this.dataChange = new BehaviorSubject<MovieData[]>([]);

      this.searchTitle = value;
      this.getMovieList();

      this.searchTitle = '';
      this.searchDirector = value;
      this.getMovieList();

      this.searchDirector = '';
      this.searchActor = value;
      this.getMovieList();

      this.searchActor = '';
      }

    else{
      console.log("Searchfield is empty");
      }
    }

  changeValues(event){

    this.have = this.data.length;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.need =((this.paginator.pageIndex+1) * this.paginator.pageSize) -(this.have);
    console.log(this.have, this.need);
    if (0< this.need) {
      this.getMovieList();
      console.log(this.have, this.need);
    }

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
      var data = this._movieComponent.data.slice();
  /** Grab the page's slice of data. */
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }
  disconnect() {}

}




