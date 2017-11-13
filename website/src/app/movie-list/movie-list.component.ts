import {  MovieList, Component, OnInit, ViewChild, MatDialog, DataSource, MatPaginator, BehaviorSubject,
  Observable, HttpClient, MovieDetailsComponent, MatSelectModule } from '../import-module';

import { HttpHeaders } from '@angular/common/http';
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
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
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
  searchWord: string;
  dataChange: BehaviorSubject<MovieList[]>;
  validRefresh: boolean;
  startYear: any = 0;
  endYear: any = new Date().getFullYear();
  have: any = 0;
  need: any = 10;
  pageLength: any = this.movieListService.getAmountOfMovies().subscribe(length => this.pageLength = length);
  genres: any = [
    {viewValue: 'Action'},
    {viewValue: 'Adventure'},
    {viewValue: 'Animation'},
    {viewValue: 'Biography'},
    {viewValue: 'Comedy'},
    {viewValue: 'Crime'},
    {viewValue: 'Documentary'},
    {viewValue: 'Drama'},
    {viewValue: 'Family'},
    {viewValue: 'Fantasy'},
    {viewValue: 'Film-Noir'},
    {viewValue: 'Horror'},
    {viewValue: 'History'},
    {viewValue: 'Music'},
    {viewValue: 'Musical'},
    {viewValue: 'Mystery'},
    {viewValue: 'Romance'},
    {viewValue: 'Sci-Fi'},
    {viewValue: 'Sport'},
    {viewValue: 'Thriller'},
    {viewValue: 'War'},
    {viewValue: 'Western'}];
  selectedGenre: any = [];
  auth: boolean;
  token: string;

  constructor(public dialog: MatDialog, private movieListService: MovieListService, private http: HttpClient) {
    this.have = 0;
    this.need = 10;
    this.dataChange = new BehaviorSubject<MovieList[]>([]);
    this.validRefresh = false;
    this.searchTitle = '';
    this.searchDirector = '';
    this.searchActor = '';
    this.searchWord = '';
    const session = JSON.parse(localStorage.getItem('session'));
    if (!(session === null || session.auth === false)) {
      this.auth = session.auth;
      this.token = session.token;
    }
  }

  ngOnInit(): void {
    this.getMovieList();
  }
  /** Hvorfor heter begge funksjonene get movielist????? */
  getMovieList(): void {

    this.movieListService.getMovieList(this).then(movies => this.createList(movies));
  }
  /** Sets the Movie data displyed on in the Pop-up. */
  openDialog(data) {
    // If user is logged in, check if movie is favorited
    if (this.auth) {
      const params = JSON.stringify({
        token: this.token,
        movie_id: data._id,
      });
      this.http.post('/api/favorites/exists', params, {headers: this.headers}).subscribe(favorites => {
        if (favorites) {
          this.generateModal(data, true);
        } else {
          this.generateModal(data, false);
        }
      });
    } else {
      this.generateModal(data, false);
    }
  }

  generateModal(data, exists) {
    // Generate modal data
    this.movieListService.getMovieModal(data).then( movies => {
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
        'auth': this.auth,
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
      this.searchResults += movieData.length;
      this.movieListService.getAmountOfMovies().subscribe(length => this.pageLength = length);
      this.paginator.length = this.pageLength;
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

  get data(): MovieList[] {
    return this.dataChange.value;
  }

  searchDatabase(value) {
    if (value === "" && this.validRefresh === true) {
      this.searchWord = '';
      this.validRefresh = false;
      this.dataChange = new BehaviorSubject<MovieList[]>([]);
      console.log(this.have, this.need);
      this.paginator.pageIndex = 0;
      this.paginator.length = 322;
      this.changeValues(this.paginator);
      this.getMovieList();

    }

    else if (value !== "") {
      console.log("SEARCH FUNCTION");
      console.log(value);
      this.searchResults = 0;
      this.validRefresh = true;
      this.have = 0;
      this.need = this.paginator.pageSize;
      this.paginator.pageIndex = 0;

      this.dataChange = new BehaviorSubject<MovieList[]>([]);
      this.searchTitle = value;
      this.getMovieList();

      this.searchTitle = '';
      this.searchDirector = value;
      this.getMovieList();

      this.searchDirector = '';
      this.searchActor = value;
      this.getMovieList();

      this.searchActor = '';
      this.searchWord = value;
    } else {
      console.log("Searchfield is empty");
      this.searchWord = '';
      }

  }


  changeValues(event) {
    this.have = this.data.length;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.need = ((this.paginator.pageIndex + 1) * this.paginator.pageSize) - (this.have);
    if (0 < this.need && this.searchWord === '') {
      this.getMovieList();
    }
  }


  setYear(event, type) {
    if (type === 'start') {
      this.startYear = event;
    } else {
      this.endYear = event;
    }
    if (this.startYear === '') {
      this.startYear = 0;
    }
    if (this.endYear === '') {
      this.endYear = new Date().getFullYear();
    }
    this.validRefresh = true;
    this.searchDatabase(this.searchWord);
  }

  setGenre(event) {
    this.selectedGenre = '';
    if (event.value[0] !== undefined) {
      for (const genre of event.value) {
        this.selectedGenre += genre;
        this.selectedGenre += ',';
      }
    } else { this.selectedGenre = '';
    }
    this.validRefresh = true;
    this.searchDatabase(this.searchWord);



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
