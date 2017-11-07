import {  MovieList, Component, OnInit, ViewChild, MatDialog, DataSource, MatPaginator, BehaviorSubject,
          Observable, HttpClient, MovieDetailsComponent, MatSelectModule } from '../import-module';
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
  movieNum: any;
  pageNum: any;
  searchWord: any;
  have: any;
  need: any;
  pageLength: any;
  genres: any;
  selectedGenre: any;

  constructor(public dialog: MatDialog, private movieListService: MovieListService) {
    this.movieNum = 10;
    this.pageNum = 0;
    this.searchWord = '';
    this.have = 0;
    this.need = 10;
    this.dataChange = new BehaviorSubject<MovieList[]>([]);
    this.pageLength = 322;
    this.startYear = 0;
    this.endYear = new Date().getFullYear();
    this.selectedGenre = [];
    this.genres = [{  viewValue: 'All'},
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
  }

  ngOnInit(): void {
    this.getMovieList();
  }
  /** Hvorfor heter begge funksjonene get movielist????? */
  getMovieList(): void {
    this.movieListService.getMovieList2(this).then(movies => this.createList(movies));
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

  searchDatabase(value){
    let matchSize = 0;
    for (let i = 0; i < this.data.length ; i++){
      for (let k = 0; k < this.data[i].director.length; k++){
        this.data[i].director[k].toLowerCase().match(value.toLowerCase());
      }
      if (this.data[i].title.toLowerCase().match(value.toLowerCase())
        || this.data[i].director[0].toLowerCase().match(value.toLowerCase())
        || this.data[i].actors[0].toLowerCase().match(value.toLowerCase())){

        matchSize += 1;
      }
    }

    if (matchSize === 0) {
      this.searchWord = value;
      this.dataChange = new BehaviorSubject<MovieList[]>([]);
      this.getMovieList();
    }
   /* else {
      this.have = matchSize;
      this.need = matchSize;
      this.dataChange = new BehaviorSubject<MovieData[]>([]);
      this.pageLength = matchSize;
    } */

   /* this.searchWord = str;
    return ("searched"); */
  }
  changeValues(event){

    this.have = this.data.length;
    this.pageNum = event.pageIndex;
    this.movieNum = event.pageSize;
    this.need = ((this.pageNum + 1) * this.movieNum) - (this.have);
    if (0 < this.need) {
      this.getMovieList();
    }
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

  setGenre(event) {
    this.selectedGenre = '';
    if (event.value[0] !== undefined) {
      for (const genre of event.viewValue) {
        this.selectedGenre += genre;
        this.selectedGenre += ',';
      }
    } else { this.selectedGenre = '';
    }
    this.dataChange = new BehaviorSubject<MovieList[]>([]);
    this.getMovieList();
  }


/**
  checkList() {
    for (let i = 0; i < this.visitedIndex.length; i++) {
      if (this.pageNum == this.visitedIndex[i]) {
        return false;
      }
    }
    return true;
  } */


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




