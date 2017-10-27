import { Component, OnInit, ViewChild } from '@angular/core';

import { Movie } from './movies/movie';
import { MoviesComponent } from "./movies/movies.component";
import { MovieService } from './movies/movie.service';
import { MatDialog } from "@angular/material";
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {MOVIES} from "./movies/mock-movies";
import {HttpClient} from "@angular/common/http";
import {isObject} from "util";

@Component({
  selector: 'app-root',
  template: `<mat-toolbar color="primary">
      <span class="pageTitle">top 5<mat-icon class="playIcon">play_circle_filled</mat-icon> movies</span>
      <span class="example-spacer"></span>
    <span matTooltip="Profile">
      <button mat-button>
       <mat-icon class="profileIcon">account_circle</mat-icon></button>
      </span>
    </mat-toolbar>
    <div>
  <div class="searchWrap">    
  <form class="example-form">
    <mat-form-field class="example-full-width">
      <input matInput placeholder="Search for Top 50 Movies">
      <mat-hint><strong></strong>Type in Title, Year or Genre and hit enter to save the search if you are logged in </mat-hint>
    </mat-form-field>
  </form>
  </div>
      <div class="example-container mat-elevation-z8">
    <mat-table #table [dataSource]="dataSource">

      <!--- Note that these columns can be defined in any order.
            The actual rendered columns are set as a property on the row definition" -->

      <!-- ID Column -->
      <ng-container matColumnDef="_id">
        <mat-header-cell *matHeaderCellDef> # </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.id}} </mat-cell>
      </ng-container>

      <!-- Title Column -->
      <ng-container matColumnDef="title">
        <mat-header-cell *matHeaderCellDef> Title </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.title}} </mat-cell>
      </ng-container>

      <!-- Year Column -->
      <ng-container matColumnDef="year">
        <mat-header-cell *matHeaderCellDef> Year </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.year}} </mat-cell>
      </ng-container>

      <!-- Genre Column -->
      <ng-container matColumnDef="genre">
        <mat-header-cell *matHeaderCellDef> Genre </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.genre}} </mat-cell>
      </ng-container>
      
      <!-- Plot Column -->
      <ng-container matColumnDef="plot">
        <mat-header-cell *matHeaderCellDef> Plot </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.plot}} </mat-cell>
      </ng-container>

      <!-- Actors Column -->
      <ng-container matColumnDef="actors">
        <mat-header-cell *matHeaderCellDef> Actors </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.actors}} </mat-cell>
      </ng-container>

      <!-- Director Column -->
      <ng-container matColumnDef="director">
        <mat-header-cell *matHeaderCellDef> Director </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.director}} </mat-cell>
      </ng-container>

      <!-- Progress Column -->
      <ng-container matColumnDef="runtime">
        <mat-header-cell *matHeaderCellDef> Runtime </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.runtime}} </mat-cell>
      </ng-container>
      

      
      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
    </mat-table>

    <mat-paginator #paginator
                   [length]="exampleDatabase.data.length"
                   [pageIndex]="0"
                   [pageSize]="10"
                   [pageSizeOptions]="[10, 25, 50]">
    </mat-paginator>
  </div>
  
  
    <ul class="movies">
      <li *ngFor="let movie of movies"
        [class.selected]="movie === selectedMovie"
        (click)="openDialog(movie)">
        <span class="badge">{{movie._id}}</span> {{movie.title}}
      </li>
    </ul>
    <movie-detail [movie]="selectedMovie"></movie-detail>
    </div> `,

  providers: [MovieService]
})

export class AppComponent implements OnInit {
  title = 'Movies';
  movies: Movie[];
  selectedMovie: Movie;
  dialogResult: "";
  displayedColumns = ['_id', 'title', 'year', 'genre', 'plot', 'actors', 'director', 'runtime' ];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private movieService: MovieService, public dialog: MatDialog, private http: HttpClient) { }

  getMovies(): void {
    this.movieService.getMovies().then(movies => this.movies = movies);
  }

  ngOnInit(): void {
    this.getMovies();
    this.http.get('/api/movies').subscribe(data => {
      // Read the result field from the JSON response.
      let apekatt: UserData = isObject(data)
          ? (<UserData> data)
          : {}
      console.log(apekatt.genre);


    });
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator);
  }

  openDialog() {
    let dialogRef = this.dialog.open(MoviesComponent, {
      width: '600px',
      data: 'This text is passed into the dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    })
  }
}

var dbMovies;
const myMovies = [
  { _id: 1,  readMore: 'Websitelol', poster: 'ayylmao', plot: 'ffs', actors:'Bryce Dallas', director: 'J.A Bayona',
    genre:'Action, adventure', runtime:'N/A', year: 2008, title: 'Beauty and the Beast'},
  { _id: 2,  readMore: 'Websitelol', poster: 'ayylmao', plot: 'GDS', actors:'Bryce Dallas', director: 'J.A Bayona', genre:'Action, adventure', runtime:'50min', year: 2008, title: 'Beauty  the Beast'},
  { _id: 2,  readMore: 'Websitelol', poster: 'ayylmao', plot: 'ffs', actors:'Bryce Dallas', director: 'J.A Bayona', genre:'Action, adventure', runtime:'N/A', year: 2008, title: 'Beauty  the Beast'},
  { _id: 2,  readMore: 'Websitelol', poster: 'ayylmao', plot: 'ffs', actors:'Bryce Dallas', director: 'J.A Bayona', genre:'Action, adventure', runtime:'N/A', year: 2008, title: 'Beauty  the Beast'},
  { _id: 3,  readMore: 'Websitelol', poster: 'ayylmao', plot: 'ffs', actors:'Bryce Dallas', director: 'J.A Bayona', genre:'Action, adventure', runtime:'N/A', year: 2008, title: 'Beauty and  Beast'},
  { _id: 4,  readMore: 'Websitelol', poster: 'ayylmao', plot: 'ffs', actors:'Bryce Dallas', director: 'J.A Bayona', genre:'Action, adventure', runtime:'N/A', year: 2008, title: 'Beauty and the Beast'},
  { _id: 5,  readMore: 'Websitelol', poster: 'ayylmao', plot: 'ffs', actors:'Bryce Dallas', director: 'J.A Bayona', genre:'Action, adventure', runtime:'N/A', year: 2008, title: 'Beauty and the Beast'},
  { _id: 6,  readMore: 'Websitelol', poster: 'ayylmao', plot: 'ffs', actors:'Bryce Dallas', director: 'J.A Bayona', genre:'Action, adventure', runtime:'N/A', year: 2008, title: ' and the Beast'},
  { _id: 7,  readMore: 'Websitelol', poster: 'ayylmao', plot: 'ffs', actors:'Bryce Dallas', director: 'J.A Bayona', genre:'Action, adventure', runtime:'N/A', year: 2008, title: 'Beauty and the Beast'},
  { _id: 8,  readMore: 'Websitelol', poster: 'ayylmao', plot: 'ffs', actors:'Bryce Dallas', director: 'J.A Bayona', genre:'Action, adventure', runtime:'N/A', year: 2008, title: 'Beauty and  Beast'},
  { _id: 9,  readMore: 'Websitelol', poster: 'ayylmao', plot: 'ffs', actors:'Bryce Dallas', director: 'J.A Bayona', genre:'Action, adventure', runtime:'N/A', year: 2008, title: 'Beauty and the Beast'},
  { _id: 10, readMore: 'Websitelol', poster: 'ayylmao', plot: 'ffs', actors:'Bryce Dallas', director: 'J.A Bayona', genre:'Action, adventure', runtime:'N/A', year: 2008, title: 'Beauty  the Beast'}
]

  /* [{"_id":
  "readMore":
  "poster":
  "plot":
  "actors":
  "director":
  "genre":
  "runtime":
  "year":
  "title": */






export interface UserData {
  _id?: string;
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

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);


  get data(): UserData[] {
    return this.dataChange.value; }

  constructor() {
    const movieList = myMovies;

    // Fill up the database with 100 users.
    for (let i = 0; i < movieList.length; i++) { this.addUser(i, movieList);}
  }


  /** Adds a new user to the database. */
  addUser(i, movieList) {


    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser(i, movieList));
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser(i, movieList) {

    const readMore = movieList[i].readMore;
    const poster = movieList[i].poster;
    const plot = movieList[i].plot;
    const actors = movieList[i].actors;
    const director= movieList[i].director;
    const genre= movieList[i].genre;
    const runtime = movieList[i].runtime;
    const year = movieList[i].year;
    const title =  movieList[i].title;




    return {
      _id: (this.data.length + 1).toString(),
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
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._exampleDatabase.data.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}

