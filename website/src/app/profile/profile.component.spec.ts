import {async, ComponentFixture, TestBed, ProfileComponent, FormsModule, MatCardModule, MatSnackBarModule,
  RouterTestingModule, HttpClientModule, BrowserAnimationsModule} from '../import-module';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatCardModule, RouterTestingModule, HttpClientModule, MatSnackBarModule,
        BrowserAnimationsModule],
      declarations: [ProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
