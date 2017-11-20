import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {FormsModule} from '@angular/forms';
import {MatCardModule, MatDialogModule, MatSnackBarModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Favorite} from './profile.favorite.service';
import {MovieDetailsService} from '../movie-view/movie-details/movie-details.service';
import {MovieListService} from '../movie-view/movie-view.service';
import {ProfileService} from './profile.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatCardModule, RouterTestingModule, HttpClientModule, MatSnackBarModule,
        BrowserAnimationsModule, MatDialogModule],
      declarations: [ProfileComponent],
      providers: [Favorite, MovieDetailsService, MovieListService, ProfileService]
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
