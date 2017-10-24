import {Component} from "@angular/core";
export class Movie{
  id: number;
  name: string;
}

const MOVIES: Movie[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

@Component({
  selector: 'content-root',
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
    <div *ngIf="selectedMovie">
      <h2>{{selectedMovie.name}} details!</h2>
      <div><label>id: </label>{{selectedMovie.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="selectedMovie.name" placeholder="name"/>
      </div>
    </div>

  `
})

export class AppComponent {
  title = 'Movie database';
  movies = MOVIES;
  selectedMovie: Movie;

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  };
}
