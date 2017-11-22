import { isObject, TestBed, async, ComponentFixture, ViewChild, MatDialogModule, DataSource, MatPaginatorModule, BehaviorSubject,
  Observable, HttpClientModule, MatSelectModule, RouterTestingModule } from '../../import-module';
import {AgWordCloudModule, AgWordCloudData} from 'angular4-word-cloud';
import { WordcloudService } from './wordcloud.service';
import { WordcloudComponent} from './wordcloud.component';
import 'rxjs/add/operator/toPromise';
import { inject } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


class MockWordcloudService {
  constructor(){}
  getWordcloud() {
      var mockData = {
          "Action":243,
          "Adventure":276,
          "Drama":651,
          "Mystery":89,
          "Thriller":131,
          "Crime":194,
          "Music":72,
          "Fantasy":99,
          "Sci-Fi":70,
          "History":77,
          "Comedy":300,
          "Biography":147,
          "Animation":108,
      };
      return mockData;
    };
};

describe('WordcloudComponent', () => {
  let component: WordcloudComponent;
  let fixture: ComponentFixture<WordcloudComponent>;
  let debugElement: DebugElement[];
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, MatDialogModule, MatPaginatorModule, HttpClientModule, MatSelectModule, AgWordCloudModule],
      declarations: [WordcloudComponent],
      providers: [{ provide: WordcloudService, useClass: MockWordcloudService}]
    }).compileComponents();
  }));
   beforeEach(() => {
       fixture = TestBed.createComponent(WordcloudComponent);
       component = fixture.componentInstance;
   });
  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should not have available data at initial render', () =>{
    expect(component.isDataAvailable).toBe(false);
  });
  it('should have no wordData at initial render', () =>{
      var mockData: AgWordCloudData[] = [];
    expect(component.wordData).toEqual(mockData);
  });

  /*it('should have available data after initial render', inject([WordcloudService], (wordcloud: MockWordcloudService) =>{
      component.;
      expect(component.isDataAvailable).toBe(true);
  }));*/


});
