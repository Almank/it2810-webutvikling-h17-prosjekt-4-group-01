import {TestBed, async, MovieListComponent,  MatDialogModule, MatIconModule, MatInputModule, MatOptionModule, MatPaginatorModule,
  MatTableModule, HttpClientModule} from '../../import-module';
/** Importing these separately as the site crashes if they are barreled */
import {MovieListService} from '../movie-view.service';


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
