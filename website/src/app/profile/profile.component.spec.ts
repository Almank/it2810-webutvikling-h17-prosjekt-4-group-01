import {async, ComponentFixture, TestBed, ProfileComponent, FormsModule, MatCardModule, MatDialogModule,
  MatSnackBarModule, RouterTestingModule, HttpClientModule, BrowserAnimationsModule} from '../import-module';

import {Favorite} from './profile.favorite.service';
import {MovieDetailsService} from '../movie-view/movie-details/movie-details.service';
import {MovieListService} from '../movie-view/movie-view.service';
import {ProfileService} from './profile.service';
import {ProfileHistoryService} from './profile.history.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatCardModule, RouterTestingModule, HttpClientModule, MatSnackBarModule,
        BrowserAnimationsModule, MatDialogModule],
      declarations: [ProfileComponent],
      providers: [Favorite, MovieDetailsService, MovieListService, ProfileService, ProfileHistoryService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    //Mock values
    component.username = 'test';
    component.favoriteListData = [
        {"_id":"5a1424524bc8d140dcfe1ede","poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg","actors":["Leonardo DiCaprio","Joseph Gordon-Levitt","Ellen Page","Tom Hardy"],"director":["Christopher Nolan"],"genre":["Action","Adventure","Sci-Fi"],"year":2010,"title":"Inception"}
    ];
    component.history.currentHistory = [
        {"_id":"5a1424534bc8d140dcfe22fa","poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg","actors":["Martin Balsam","John Fiedler","Lee J. Cobb","E.G. Marshall"],"director":["Sidney Lumet"],"genre":["Crime","Drama"],"year":1957,"title":"12 Angry Men"}
    ];


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display actual username', () => {
    debugElement = fixture.debugElement.query(By.css('#profileusername'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toEqual('test');
  });

  it('should display favorite movie title', () => {
    debugElement = fixture.debugElement.query(By.css('#favTitle'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toEqual('Inception');
  });

  it('should display search history title', () => {
    debugElement = fixture.debugElement.query(By.css('#historyTitle'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toEqual('12 Angry Men');
  });

});
