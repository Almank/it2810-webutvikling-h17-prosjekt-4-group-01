import { Component, Input } from '@angular/core';

import { Movie } from './movie';
@Component({
  selector: 'movie-detail',
  template: `
    <div *ngIf="movie">
      <h2>{{movie.name}} details!</h2>
      <div><label>id: </label>{{movie.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="movie.name" placeholder="name"/>
      </div>
    </div>
  `
})
export class MovieDetailComponent {
  @Input() movie: Movie;
}
