import {async, Component, ComponentFixture, TestBed, MovieDetailsComponent, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef,
  MatFormFieldModule, CommonModule, Favorite, RouterTestingModule, FormsModule, HttpClientModule,
} from '../../import-module';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let debugElement: DebugElement[];
  let htmlElement: HTMLElement;

  /** Mock for favorite service is needed to check toggleFavorite func in movie details component.
   * Function is empty because the call does not affect the function itself */
  class MockFavoriteService {
    favorite(id) {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, CommonModule, RouterTestingModule, FormsModule, HttpClientModule, MatFormFieldModule],
      declarations: [MovieDetailsComponent],
      providers: [{provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA}, {provide: Favorite, useClass: MockFavoriteService }],
    }).compileComponents();
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

  it('should display director or actors', () => {
    debugElement = fixture.debugElement.queryAll(By.css('.infoType'));
    for (let i = 0; i < debugElement.length; i++) {
      htmlElement = debugElement[i].nativeElement;
      expect(['Director:', 'Actors:']).toContain(htmlElement.textContent);
    }
  });

  it('should display cancel or stars', () => {
    debugElement = fixture.debugElement.queryAll(By.css('.favIcon'));
    for (let i = 0; i < debugElement.length; i++) {
      htmlElement = debugElement[i].nativeElement;
      expect(['stars', 'cancel']).toContain(htmlElement.textContent);
    }
  });

  it('should display subtitle', () => {
    debugElement = fixture.debugElement.queryAll(By.css('.subTitle'));
    for (let i = 0; i < debugElement.length; i++) {
      htmlElement = debugElement[i].nativeElement;
      expect(htmlElement.textContent).toContain('Movie / ' + component.data.runtime + ' / ' + component.data.genre);
    }
  });

  it('should display title', () => {
    debugElement = fixture.debugElement.queryAll(By.css('.titleContainer h2'));
    for (let i = 0; i < debugElement.length; i++) {
      htmlElement = debugElement[i].nativeElement;
      expect(htmlElement.textContent).toContain(component.data.title + ' (' + component.data.year + ')');
    }
  });

  it('should display readmore', () => {
    debugElement = fixture.debugElement.queryAll(By.css('.readMore'));
    for (let i = 0; i < debugElement.length; i++) {
      htmlElement = debugElement[i].nativeElement;
      expect(htmlElement.textContent).toContain('Read more');
    }
  });

  it('should display actor or director name', () => {
    debugElement = fixture.debugElement.queryAll(By.css('.infoDetails'));
    for (let i = 0; i < debugElement.length; i++) {
      htmlElement = debugElement[i].nativeElement;
      expect([component.data.director, component.data.actors]).toContain(htmlElement.textContent);
    }
  });

  it('should display movie plot', () => {
    debugElement = fixture.debugElement.queryAll(By.css('.modalContent p'));
    for (let i = 0; i < debugElement.length; i++) {
      htmlElement = debugElement[i].nativeElement;
      expect(htmlElement.textContent).toEqual(component.data.plot);
    }
  });

  it('should change toggled when toggle favorite is ran', () => {
    expect(component.toggled).toBeFalsy()
    component.toggleFavorite('', false);
    expect(component.toggled).toBeTruthy()
  });

  it('should change buttonClicked when toggle favorite is ran', () => {
    expect(component.buttonClicked).toBeFalsy()
    component.toggleFavorite('', false);
    expect(component.buttonClicked).toBeTruthy()
  });

  it('yellow function should return correct toggle variable', () => {
    expect(component.yellow).toBeFalsy();
    component.toggleFavorite('', false);
    expect(component.yellow).toBeTruthy();
  });
});
