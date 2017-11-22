import {async, ComponentFixture, TestBed, AppComponent, HeaderComponent, RouterTestingModule, MatIconModule,
  MatToolbar, MatToolbarRow} from './import-module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatIconModule],
      declarations: [AppComponent, HeaderComponent, MatToolbar, MatToolbarRow]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
