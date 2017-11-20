import {  MovieList, Component, OnInit, ViewChild, MatDialog, MatPaginator, BehaviorSubject,
  HostListener, MovieSource } from '../../import-module';
/** Importing these separately as the site crashes if they are barreled */
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
  displayedColumns = ['title', 'year', 'genre'];
  dataSource: MovieSource | null;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
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
  need = 16;
  pageLength = 0;
  genres = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Drama', 'Family', 'Fantasy',
    'Film-Noir', 'Horror', 'History', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Sport', 'War',
    'Western'];
  selectedGenre: any = [];
  auth: boolean;
  token: string;
  show = false;
  showFilter = false;
  arrow = 'keyboard_arrow_down';
  viewIcon = 'format_list_bulleted';
  viewTooltip = 'Grid view';
  fixedSearch = false;
  colNum = 4;
  sorts = ['Title Desc', 'Title Asc', 'Year Desc', 'Year Asc', 'Genre Desc', 'Genre Asc'];
  selectedSort: string;
  descAsc: string;
  sortCriteria = 1;

  constructor(public dialog: MatDialog, private movieListService: MovieListService,
              private modal: MovieDetailsService) {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!(session === null || session.auth === false)) {
      this.auth = session.auth;
      this.token = session.token;
    }
  }

  /** Get movies and resize columns of movies based on screen size. */
  ngOnInit(): void {
    this.getMovieList();
    this.onResize();
  }

  /** Change button and how the movies a loaded Grid/List */
  toggleButton(): void {
    this.show = !this.show;
    this.show ? this.viewIcon = 'view_comfy' : this.viewIcon = 'format_list_bulleted';
    this.show ? this.viewTooltip = 'Grid view' : this.viewTooltip = 'List view';
    if (!this.show) {
      this.paginator.pageSize = 16;
      this.need = 16;
      this.have = 0;
      this.dataChange = new BehaviorSubject<MovieList[]>([]);
      if (this.searchWord !== '' || this.searchWord !== undefined) {
        this.searchFor();
      } else {
        this.getMovieList();
      }
    }
    if (this.show) {
      this.paginator.pageSize = 10;
      this.fixedSearch = false;
    }
  }

  /** Change filter icon when clicked. */
  toggleFilterButton(): void {
      this.showFilter = !this.showFilter;
      this.showFilter ? this.arrow = 'keyboard_arrow_up' : this.arrow = 'keyboard_arrow_down';
  }

  /** Load more movies when user scroll to the bottom. */
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.show) {
      if ((document.documentElement.scrollTop > 140) || (document.body.scrollTop > 140)) {
        this.fixedSearch = true;
      } else if ((document.documentElement.scrollTop < 140) || (document.body.scrollTop < 140)) {
        this.fixedSearch = false;
      }
      if ((document.documentElement.scrollTop + document.documentElement.offsetHeight === document.documentElement.scrollHeight)
      || (document.body.scrollTop + document.body.offsetHeight === document.body.scrollHeight)) {
        this.have += 16;
        this.need = 16;
        if (this.searchWord !== '' || this.searchWord !== undefined) {
          this.searchFor();
        } else {
          this.getMovieList();
        }
      }
    }
  }

  /** Resize amount of columns based on screen width */
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 480) {
      this.colNum = 1;
    } else {
      this.colNum = 4;
    }
  }

  /** Get amount of matches from search. */
  getAmountOfMatches(): void {
    this.movieListService.getAmountOfMovies(this).then(length => this.pageLength = length);
  }

  /** Get movies and amount from service file. */
  getMovieList(): void {
    this.getAmountOfMatches();
    this.movieListService.getMovieList(this).then(movies => this.createList(movies));
  }

  /** Sets the Movie data displyed on in the Pop-up. */
  openDialog(data) {
    this.modal.openDialog(data, this.auth, this.token);
  }

  /** Create a new list of movies */
  createList(movieData) {
    this.dataSource = new MovieSource(this, this.paginator);
    for (let i = 0; i < movieData.length ; i++) {
      const copiedData = this.data;
        copiedData.push(movieData[i]);
      this.dataChange.next(copiedData);
    }
    if (this.validRefresh === true) {
      this.paginator.length = this.pageLength;
    }
  }

  /** Get data information */
  get data(): MovieList[] {
    return this.dataChange.value;
  }

  /** Reset list when searching. */
  searchDatabase(value) {
    if (!this.show) {
      this.paginator.pageSize = 16;
    }
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

  /** Decide if it should search for title, director or actor */
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

  /** Change page in list. */
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

  /** Search on changing searching value */
  setSearch(num) {
    this.searchCriteria = num.value;
    if (this.searchWord !== '') {
      this.searchDatabase(this.searchWord);
    }
  }

  /** Get year from filter. */
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

  /** Set genres from filter */
  setGenre(event) {
    this.selectedGenre = '';
    if (event.value[0] !== undefined && event.value[0] !== 'All') {
      for (const genre of event.value) {
        this.selectedGenre += genre;
        this.selectedGenre += ',';
      }
    } else { this.selectedGenre = '';
    }
    this.validRefresh = true;
    this.searchDatabase(this.searchWord);
  }

  /** Set sort variables */
  setSort(event) {
    const selected = event.value.toLowerCase();
    const index = selected.indexOf(' ');
    this.selectedSort = selected.substr(0, index);
    const direction = selected.substr(index + 1);
    if (direction === 'desc') {
            this.descAsc = 'true';
        }else if (direction === 'asc)') {
            this.descAsc = 'false';
    }
    if (direction === 'desc') {
            this.descAsc = 'false';
        }else if (direction === 'asc') {
            this.descAsc = 'true';
    }
    this.validRefresh = true;
    this.searchDatabase(this.searchWord);
  }
}
