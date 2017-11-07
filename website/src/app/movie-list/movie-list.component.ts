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
  searchTitle: string;
  searchActor: string;
  searchDirector: string;
  dataChange: BehaviorSubject<MovieData[]>;
  pageLength: number;

  have: number;
  need: number;


  constructor(public dialog: MatDialog, private movieListService: MovieListService) {
    this.movieNum = 10;
    this.pageNum = 0;
    this.searchTitle = '';
    this.searchDirector = '';
    this.searchActor = '';
    this.have = 0;
    this.need = 10;
    this.dataChange = new BehaviorSubject<MovieData[]>([]);
    this.pageLength = 322
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
  }

  /** Adds a new movie to the database. */
  addMovie(i, movieList) {
    const copiedData = this.data.slice();
    console.log(copiedData);
    if (this.checkDuplicate(copiedData, i, movieList)) {
      copiedData.push(this.createNewMovie(i, movieList));
    }
    this.dataChange.next(copiedData);
    console.log(this.data);

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

  searchDatabase(value){
    let matchSize = 0;
    if (value != "") {
      for (let i = 0; i < this.data.length; i++) {
        for (let k = 0; k < this.data[i].director.length; k++) {
          if (this.data[i].director[k].toLowerCase().match(value.toLowerCase())) {
            console.log(this.data[i].director, "   # of matches: ", matchSize);
            matchSize += 1;
          }
        }
        for (let j = 0; j < this.data[i].actors.length; j++) {
          if (this.data[i].actors[j].toLowerCase().match(value.toLowerCase())) {
            console.log(this.data[i].actors, "   # of matches: ", matchSize);
            matchSize += 1;
          }
        }
        if (this.data[i].title.toLowerCase().match(value.toLowerCase())) {
          matchSize += 1;
          console.log(this.data[i].title, "   # of matches: ", matchSize);
        }
      }
    }

    if (matchSize == 0) {
      this.dataChange = new BehaviorSubject<MovieData[]>([]);
      this.searchTitle = value;
      this.getMovieList();
      this.searchDirector = value;
      this.getMovieList();
      this.searchActor = value;
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
    this.need =((this.pageNum+1) * this.movieNum) -(this.have);
    console.log(this.have, this.need);
    if (0< this.need) {
      this.getMovieList();
      console.log(this.have, this.need);
    }

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




