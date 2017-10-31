import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesComponent } from "./movies/movies.component";
import { MatDialog } from "@angular/material";
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {isObject} from "util";

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span class="pageTitle">top 5<mat-icon class="playIcon">play_circle_filled</mat-icon> movies</span>
      <span class="example-spacer"></span>
    <span matTooltip="Profile">
      <button mat-button>
       <mat-icon class="profileIcon">account_circle</mat-icon></button>
      </span>
    </mat-toolbar>
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

      <!-- Director Column -->
      <ng-container matColumnDef="director">
        <mat-header-cell *matHeaderCellDef> Director </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.director}} </mat-cell>
      </ng-container>

      <!-- Runtime Column -->
      <ng-container matColumnDef="runtime">
        <mat-header-cell *matHeaderCellDef> Runtime </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.runtime}} </mat-cell>
      </ng-container>
      
      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
    </mat-table>

    <mat-paginator #paginator
                   [length]="this.data.length"
                   [pageIndex]="0"
                   [pageSize]="10"
                   [pageSizeOptions]="[10, 25, 50]">
    </mat-paginator>
  </div>`,

})

export class AppComponent implements OnInit {
  dialogResult: "";
  displayedColumns = ['title', 'year', 'genre', 'director', 'runtime' ];
  dataSource: ExampleMovieSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.generateList();
    this.dataSource = new ExampleMovieSource(this, this.paginator);
  }


  generateList(){
    this.http.get('/api/movies/asc').subscribe(data => {
      // Read the result field from the JSON response.
      if (isObject(data)) {
        const movieData = ((<MovieData> data));
        this.createList(movieData);
      }
    });
  }

  createList(movieData){
    // Fill up the database with 100 movies.
    for (let i = 0; i < 100 ; i++) { this.addMovie(i, movieData);}
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

  openDialog() {
    let dialogRef = this.dialog.open(MoviesComponent, {
      width: '600px',
      data: 'This text is passed into the dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });
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
  constructor(private _appComponent: AppComponent, private _paginator: MatPaginator) {
    super();
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<MovieData[]> {
    const displayDataChanges = [
      this._appComponent.dataChange,
      this._paginator.page,
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._appComponent.data.slice();
      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}

