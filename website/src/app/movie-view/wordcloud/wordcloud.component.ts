import {  MovieList, Component, OnInit, ViewChild, MatDialog, DataSource, MatPaginator, BehaviorSubject,
  Observable, HttpClient, MovieDetailsComponent, MatSelectModule } from '../../import-module';
  import { HttpHeaders } from '@angular/common/http';
  import { MovieListService } from '../movie-view.service';
  import { MovieListComponent } from '../movie-list/movie-list.component';
  import {AgWordCloudModule, AgWordCloudData} from 'angular4-word-cloud';

@Component({
  selector: 'wordcloud',
  template: `
  <div class="cloudcontainer">
    <div class="cloud" AgWordCloud [wordData]="wordData" [options]="options" ></div>
  </div>
  `,
  styleUrls: ['./wordcloud.component.css'],
})
export class WordcloudComponent {
   wordData: AgWordCloudData[] = [
        {size: 500, text: 'Action'},
        {size: 301, text: 'Adventure'},
        {size: 123, text: 'Animation'},
        {size: 321, text: 'Biography'},
        {size: 231, text: 'Comedy'},
        {size: 123, text: 'Crime'},
        {size: 346, text: 'Documentary'},
        {size: 107, text: 'Drama'},
        {size: 436, text: 'Family'},
        {size: 731, text: 'Fantasy'},
        {size: 80, text: 'Film-Noir'},
        {size: 96, text: 'Horror'},
        {size: 531, text: 'History'},
        {size: 109, text: 'Music'},
        {size: 972, text: 'Musical'},
        {size: 213, text: 'Mystery'},
        {size: 294, text: 'Romance'},
        {size: 472, text: 'Sci-Fi'},
        {size: 297, text: 'Sport'},
        {size: 456, text: 'Thriller'},
        {size: 123, text: 'War'},
        {size: 376, text: 'Western'},
    ];

  options = {
	  settings: {
  		minFontSize: 50,
	  	maxFontSize: 500,
	  },
	  margin: {
		  top: 20,
		  right: 20,
		  bottom: 20,
		  left: 20
	  },
	  labels: true // false to hide hover labels
  };
  ngOnInit(): void {
    console.log();
  }

  constructor() {
  }

  countOccurances(arr): void {
    }

}
