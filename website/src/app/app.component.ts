import { Component, OnInit } from '@angular/core';

import { Movie } from './movie';
import { MoviesComponent } from "./movies/movies.component";
import { MovieService } from './movie.service';
import { MatDialog } from "@angular/material";

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span class="pageTitle">TOP5<mat-icon class="playIcon">play_circle_filled</mat-icon></span>
      <span class="example-spacer"></span>
      <button mat-button>
        <span matTooltip="Profile"><mat-icon class="profileIcon">account_circle</mat-icon></span></button>
    </mat-toolbar>
    <h1>{{title}}</h1>
    <h2>My Movies</h2>
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

  constructor(private movieService: MovieService, public dialog: MatDialog) { }

  getMovies(): void {
    this.movieService.getMovies().then(movies => this.movies = movies);
  }

  ngOnInit(): void {
    this.getMovies();
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
