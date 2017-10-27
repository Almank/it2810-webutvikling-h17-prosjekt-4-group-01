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
      <ng-container matColumnDef="userId">
        <mat-header-cell *matHeaderCellDef> # </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.id}} </mat-cell>
      </ng-container>

      <!-- Progress Column -->
      <ng-container matColumnDef="progress">
        <mat-header-cell *matHeaderCellDef> Title </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.progress}}% </mat-cell>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="userName">
        <mat-header-cell *matHeaderCellDef> Year </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.name}} </mat-cell>
      </ng-container>

      <!-- Color Column -->
      <ng-container matColumnDef="color">
        <mat-header-cell *matHeaderCellDef> Genre </mat-header-cell>
        <mat-cell *matCellDef="let row" [style.color]="row.color"> {{row.color}} </mat-cell>
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
        <span class="badge">{{movie.id}}</span> {{movie.name}}
      </li>
    </ul>
    <movie-detail [movie]="selectedMovie"></movie-detail>
  `,

  providers: [MovieService]
})

export class AppComponent implements OnInit {
  title = 'Movies';
  movies: Movie[];
  selectedMovie: Movie;
  dialogResult: "";
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private movieService: MovieService, public dialog: MatDialog) { }

  getMovies(): void {
    this.movieService.getMovies().then(movies => this.movies = movies);
  }

  ngOnInit(): void {
    this.getMovies();
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

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }

  constructor() {
    // Fill up the database with 100 users.
    for (let i = 0; i < 100; i++) { this.addUser(); }
  }

  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
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

