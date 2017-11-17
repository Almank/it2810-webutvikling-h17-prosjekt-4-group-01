import {  MovieList, Component, OnInit, ViewChild, MatDialog, DataSource, MatPaginator, BehaviorSubject,
  Observable, HttpClient, MovieDetailsComponent, MatSelectModule, HostListener } from '../../import-module';

import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { MovieListService } from '../movie-view.service';
import { MovieDetailsService } from '../movie-details/movie-details.service';

@Component({
  selector: 'movieList',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})

export class MovieListComponent implements OnInit {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  displayedColumns = ['title', 'year', 'genre', ];
  dataSource: MovieSource | null;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  dialogResult = '';
  movieList: MovieList[];
  searchTitle = '';
  searchActor = '';
  searchDirector = '';
  searchWord = '';
  searchCriteria = 1;
  dataChange: BehaviorSubject<MovieList[]> = new BehaviorSubject<MovieList[]>([]);
  validRefresh = false;
  startYear: any = 0;
  endYear: any = new Date().getFullYear();
  have = 0;
  need = 10;
  pageLength = 0;
  genres = [
    {viewValue: 'Action'},
    {viewValue: 'Adventure'},
    {viewValue: 'Animation'},
    {viewValue: 'Biography'},
    {viewValue: 'Comedy'},
    {viewValue: 'Crime'},
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
  show = true;

  constructor(public dialog: MatDialog, private movieListService: MovieListService, private http: HttpClient,
              private modal: MovieDetailsService) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!(session === null || session.auth === false)) {
      this.auth = session.auth;
      this.token = session.token;
    }
  }

  ngOnInit(): void {
    this.getMovieList();
  }

  toggleButton(): void {
    this.show = !this.show;
    if (!this.show) {
      this.paginator.pageSize = 12;
      this.need = 12;
      this.have = 0;
      this.dataChange = new BehaviorSubject<MovieList[]>([]);
      this.getMovieList();
    }
    if (this.show) {
      this.paginator.pageSize = 10;
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.show) {
      if (document.documentElement.scrollTop + document.documentElement.offsetHeight === document.documentElement.scrollHeight) {
        this.have += 12;
        this.need = 12;
        this.getMovieList();
      }
    }
  }

  getAmountOfMatches(): void {
    this.movieListService.getAmountOfMovies(this).then(length => this.pageLength = length);
  }

  /** Hvorfor heter begge funksjonene get movielist????? */
  getMovieList(): void {
    this.getAmountOfMatches();
    this.movieListService.getMovieList(this).then(movies => this.createList(movies));
  }

  /** Sets the Movie data displyed on in the Pop-up. */
  openDialog(data) {
    this.modal.openDialog(data, this.auth, this.token);
  }
  createList(movieData) {
    this.dataSource = new MovieSource(this, this.paginator);
    /** Fill up the database with 25 movies. */
    for (let i = 0; i < movieData.length ; i++) {
      const copiedData = this.data;
      if (!(this.checkDuplicate(copiedData, i, movieData))) {
        copiedData.push(movieData[i]);
      }
      this.dataChange.next(copiedData);
    }
    if (this.validRefresh === true) {
      this.paginator.length = this.pageLength;
    }
  }

  checkDuplicate(copiedData, i, movieList) {
    for (let k = 0; k < copiedData.length; k++) {
      return movieList[i]._id === copiedData[k]._id;
    }
  }

  get data(): MovieList[] {
    return this.dataChange.value;
  }

  searchDatabase(value) {
    if (value === '' && this.validRefresh === true) {
      this.searchWord = '';
      this.validRefresh = false;
      this.dataChange = new BehaviorSubject<MovieList[]>([]);
      this.paginator.pageIndex = 0;
      this.paginator.length = this.pageLength;
      this.changeValues(this.paginator);

    } else if (value !== '') {
      this.validRefresh = true;
      this.paginator.pageIndex = 0;
      this.have = 0;
      this.need = this.paginator.pageSize;
      this.dataChange = new BehaviorSubject<MovieList[]>([]);
      this.searchWord = value;
      this.searchFor();
    } else {
      this.searchWord = '';
      }
  }

  searchFor() {
    if (this.searchCriteria === 1) {
      this.searchTitle = this.searchWord;

    } else if (this.searchCriteria === 2) {
      this.searchDirector = this.searchWord;

    } else if (this.searchCriteria === 3) {
      this.searchActor = this.searchWord;
    }
    this.getMovieList();
    this.searchTitle = '';
    this.searchDirector = '';
    this.searchActor = '';
  }

  changeValues(event) {
    this.have = this.data.length;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.need = ((this.paginator.pageIndex + 1) * this.paginator.pageSize) - (this.have);
    if (0 < this.need || this.searchWord !== '') {
      this.searchFor();
    } else {
      this.getMovieList();
    }
  }

  setSearch() {
    if (this.searchWord !== '') {
      this.searchDatabase(this.searchWord);
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
export class MovieSource extends DataSource<any> {
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
