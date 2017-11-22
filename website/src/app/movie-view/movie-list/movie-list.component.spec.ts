import {TestBed, async, ComponentFixture, MovieListComponent,  MatDialogModule, MatIconModule, MatInputModule, MatOptionModule, MatPaginatorModule,
  MatTableModule, HttpClientModule, MatTooltipModule, MatSelectModule, MatGridListModule, MatSnackBarModule} from '../../import-module';
/** Importing these separately as the site crashes if they are barreled */
import {MovieListService} from '../movie-view.service';
import {MovieDetailsService} from '../movie-details/movie-details.service';
import {ProfileService} from '../../profile/profile.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ProfileHistoryService} from '../../profile/profile.history.service';
import {Favorite} from '../../profile/profile.favorite.service';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  class MockMovieListService {
    getMovieList(){};
    getAmountOfMovies() {};
    getMovieModal() {};

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatInputModule, MatIconModule, MatTableModule, MatPaginatorModule, MatDialogModule, HttpClientModule,
        MatOptionModule, MatTooltipModule, MatSelectModule, MatGridListModule, MatSnackBarModule, RouterTestingModule],
      declarations: [MovieListComponent],
      providers: [{provide: MovieListService, useClass: MockMovieListService}, MovieDetailsService, ProfileService, ProfileHistoryService, Favorite],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });

  it('should create the MovieList', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should toggle gridview button', async(() => {
    expect(component.show).toBeFalsy();
    component.toggleButton();
    expect(component.show).toBeTruthy();
  }));

  it('should toggle filter button', async(() => {
    expect(component.showFilter).toBeFalsy();
    component.toggleFilterButton();
    expect(component.showFilter).toBeTruthy();
  }));
});
