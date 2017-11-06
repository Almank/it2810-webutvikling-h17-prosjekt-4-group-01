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
  movieNum: number;
  pageNum: number;
  searchWord: string;
  dataChange: BehaviorSubject<MovieData[]>;


  constructor(public dialog: MatDialog, private movieListService: MovieListService) {
    this.movieNum = 25;
    this.pageNum = 0;
    this.searchWord = '13 Hours';
  }

  ngOnInit(): void {
    this.getMovieList();
  }
  /** Hvorfor heter begge funksjonene get movielist????? */
  getMovieList(): void {
    console.log(this.searchWord);
    this.dataChange = new BehaviorSubject<MovieData[]>([]);
    this.movieListService.getMovieList2(this.movieNum, this.pageNum, this.searchWord).then(movies => this.createList(movies));
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
    var copiedData = [];
    this.dataSource = new ExampleMovieSource(this, this.paginator);
    /** Fill up the database with 25 movies. */
    for (let i = 0; i < movieData.length ; i++) {
      this.addMovie(i, movieData, copiedData);
    }
  }

  /** Adds a new movie to the database. */
  addMovie(i, movieList, copiedData) {
    copiedData = this.data.slice();
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

  get data(): MovieData[] {
    return this.dataChange.value;
  }

  searchDatabase(value){

    if (value.length >= 1){
      console.log(this.data);
      console.log(this.data.length);
      console.log(value);
      this.matchFunction(value);
    }
  }
  matchFunction(str){
    var searchArray = [];
    var matchSize = 0;
    for (let i = 0; i < this.data.length ; i++){
      if (this.data[i].title.toLowerCase().match(str.toLowerCase())){
        searchArray.push(this.data[i]);
        matchSize += 1;
        console.log(this.data[i].title);
      }
    }
    console.log(searchArray);
    console.log("MATCH SIZE = ", matchSize);
    this.movieNum = matchSize;
    this.searchWord = str;


   /* this.searchWord = str;
    return ("searched"); */
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




