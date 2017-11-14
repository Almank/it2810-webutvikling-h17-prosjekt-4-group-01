import {TestBed, async, MovieListComponent} from '../import-module';
import {MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {MovieListService} from './movie-list.service';
import {HttpClientModule} from '@angular/common/http';


describe('MovieListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatInputModule, MatIconModule, MatTableModule, MatPaginatorModule, MatDialogModule, HttpClientModule],
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
