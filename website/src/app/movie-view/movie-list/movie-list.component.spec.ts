import {TestBed, async, MovieListComponent} from '../../import-module';
import {
  MatDialogModule, MatIconModule, MatInputModule, MatOptionModule, MatPaginatorModule,
  MatTableModule
} from '@angular/material';
import {MovieListService} from '../movie-view.service';
import {HttpClientModule} from '@angular/common/http';


describe('MovieListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatInputModule, MatIconModule, MatTableModule, MatPaginatorModule, MatDialogModule, HttpClientModule,
        MatOptionModule],
      declarations: [MovieListComponent],
      providers: [{provide: MovieListService}],
    }).compileComponents();
  }));
  it('should create the MovieList', async(() => {
    const fixture = TestBed.createComponent(MovieListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
