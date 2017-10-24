import { Component, OnInit } from '@angular/core';

import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span class="pageTitle">Top50</span>
      <span class="example-spacer"></span>
      <button mat-button><mat-icon class="profileIcon">account_circle</mat-icon></button>
    </mat-toolbar>
    <h1>{{title}}</h1>
    <h2>My Movies</h2>
    <ul class="movies">
      <li *ngFor="let movie of movies"
        [class.selected]="movie === selectedMovie"
        (click)="onSelect(movie)">
        <span class="badge">{{movie.id}}</span> {{movie.name}}
      </li>
    </ul>
    <movie-detail [movie]="selectedMovie"></movie-detail>
  `,

  providers: [MovieService]
})
export class AppComponent implements OnInit {
  title = 'Tour of Movies';
  movies: Movie[];
  selectedMovie: Movie;

  constructor(private movieService: MovieService) { }

  getMovies(): void {
    this.movieService.getMovies().then(movies => this.movies = movies);
  }

  ngOnInit(): void {
    this.getMovies();
  }

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  }
}
