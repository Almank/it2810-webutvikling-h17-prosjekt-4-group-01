import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MovieDetailsComponent} from './movie-details.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatFormFieldModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {Favorite} from '../../profile/profile.favorite.service';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

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
