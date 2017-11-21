import {  Component, OnInit, ViewChild, MatDialog, DataSource, MatPaginator, BehaviorSubject,
  Observable, HttpClient, MovieDetailsComponent, MatSelectModule } from '../../import-module';
  import {AgWordCloudModule, AgWordCloudData} from 'angular4-word-cloud';
  import { WordcloudService } from './wordcloud.service';
@Component({
  selector: 'wordcloud',
  template: `
  <div>
      <h4 class="cloudtitle">Moviegenres in our database; the bigger they are, the more we got! <mat-icon class="cloudIcon">cloud</mat-icon></h4>
      <div class="cloudcontainer" *ngIf="isDataAvailable">
        <div class="cloud" AgWordCloud [wordData]="wordData" [options]="options" [width]=700 [color]="colors"></div>
      </div>
  </div>

  `,
  styleUrls: ['./wordcloud.component.css'],
})
export class WordcloudComponent implements OnInit {
   wordData: AgWordCloudData[] = [];
   isDataAvailable:boolean = false

   colors = ["#BFF2E8", "#89BDC6", "#F4FAFF", "#7C9EB2", "#E876A0"]

  options = {
	  settings: {
  		minFontSize: 10,
	  	maxFontSize: 100,
	  },
	  margin: {
		  top: 5,
		  right: 5,
		  bottom: 5,
		  left: 5
	  },
	  labels: false // false to hide hover labels
  };

  constructor(private wordcloud: WordcloudService) {

  }

  ngOnInit(): void {
      //Stores data from API in the wordData variable.
      this.constructWordcloud().then(data => {
      this.wordData = data;
      //Used to render wordcloud after data load
      this.isDataAvailable = true;
  });
  }
//Gets the wordcloud data from the API
  constructWordcloud(){
      return this.wordcloud.getWordcloud().then(data => {
          let result = [];
          for (let key in data){
              result.push({size: data[key] , text: key})
          }
          return result;
      });
  }
}
