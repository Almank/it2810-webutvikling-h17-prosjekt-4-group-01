import {TestBed, async, MovieListComponent} from '../../import-module';
import {
  MatDialogModule, MatGridListModule, MatIconModule, MatInputModule, MatOptionModule, MatPaginatorModule,
  MatSelectModule, MatSnackBarModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import {MovieListService} from '../movie-view.service';
import {HttpClientModule} from '@angular/common/http';
import {MovieDetailsService} from '../movie-details/movie-details.service';
import {ProfileService} from '../../profile/profile.service';
import {RouterTestingModule} from "@angular/router/testing";


describe('MovieListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatInputModule, MatIconModule, MatTableModule, MatPaginatorModule, MatDialogModule, HttpClientModule,
        MatOptionModule, MatTooltipModule, MatSelectModule, MatGridListModule, MatSnackBarModule, RouterTestingModule],
      declarations: [MovieListComponent],
      providers: [{provide: MovieListService}, MovieDetailsService, ProfileService],
    }).compileComponents();
  }));
  it('should create the MovieList', async(() => {
    const fixture = TestBed.createComponent(MovieListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
