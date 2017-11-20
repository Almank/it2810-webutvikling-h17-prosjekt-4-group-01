import {async, ComponentFixture, TestBed, AuthComponent, MatCard, MatFormFieldModule, MatInkBar, MatInputModule,
  MatRipple, MatSnackBarModule, MatTab, MatTabBody, MatTabGroup, MatTabHeader, MatTabLabel, MatTabLabelWrapper,
  FormsModule, PortalModule, HttpClientModule, RouterTestingModule, BrowserAnimationsModule  } from '../import-module';
import {AuthenticationService} from './auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, PortalModule, HttpClientModule, RouterTestingModule, MatSnackBarModule, MatFormFieldModule
        , MatInputModule, BrowserAnimationsModule],
      declarations: [AuthComponent, MatTab, MatTabGroup, MatCard, MatTabHeader, MatTabBody, MatTabLabel,
        MatTabLabelWrapper, MatRipple, MatInkBar],
      providers: [AuthenticationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
