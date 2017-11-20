import {async, ComponentFixture, TestBed, MovieDetailsComponent, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef,
  MatFormFieldModule, CommonModule, Favorite, RouterTestingModule, FormsModule, HttpClientModule
} from '../../import-module';


describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, CommonModule, RouterTestingModule, FormsModule, HttpClientModule, MatFormFieldModule],
      declarations: [MovieDetailsComponent],
      providers: [{provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA}, {provide: Favorite} ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    component.data = {
      '_id': 0,
      'title': 'test modal',
      'poster': 'https://source.unsplash.com/random/200x200',
      'plot': 'The craziest plot ever',
      'runtime': '2 hours',
      'actors': 'Hahah, none',
      'director': 'Spielberg',
      'genre': 'Adventure',
      'year': 2070,
      'favorited': true,
      'auth': true,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
