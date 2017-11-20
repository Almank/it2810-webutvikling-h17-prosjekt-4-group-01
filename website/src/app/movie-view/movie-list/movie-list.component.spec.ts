import {TestBed, async, MovieListComponent,  MatDialogModule, MatIconModule, MatInputModule, MatOptionModule, MatPaginatorModule,
  MatTableModule, HttpClientModule, MatTooltipModule, MatSelectModule, MatGridListModule, MatSnackBarModule} from '../../import-module';
/** Importing these separately as the site crashes if they are barreled */
import {MovieListService} from '../movie-view.service';
import {MovieDetailsService} from '../movie-details/movie-details.service';
import {ProfileService} from '../../profile/profile.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ProfileHistoryService} from '../../profile/profile.history.service';
import {Favorite} from '../../profile/profile.favorite.service';

describe('MovieListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatInputModule, MatIconModule, MatTableModule, MatPaginatorModule, MatDialogModule, HttpClientModule,
        MatOptionModule, MatTooltipModule, MatSelectModule, MatGridListModule, MatSnackBarModule, RouterTestingModule],
      declarations: [MovieListComponent],
      providers: [{provide: MovieListService}, MovieDetailsService, ProfileService, ProfileHistoryService, Favorite],
    }).compileComponents();
  }));
  it('should create the MovieList', async(() => {
    const fixture = TestBed.createComponent(MovieListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
