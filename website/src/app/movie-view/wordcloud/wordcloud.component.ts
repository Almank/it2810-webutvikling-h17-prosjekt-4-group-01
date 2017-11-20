import {  Component, OnInit, ViewChild, MatDialog, DataSource, MatPaginator, BehaviorSubject,
  Observable, HttpClient, MovieDetailsComponent, MatSelectModule } from '../../import-module';
  import {AgWordCloudModule, AgWordCloudData} from 'angular4-word-cloud';
  import { WordcloudService } from './wordcloud.service';
@Component({
  selector: 'wordcloud',
  template: `
  <div class="cloudIconContainer"><mat-icon class="cloudIcon">cloud</mat-icon></div>
  <h4 class="cloudtitle">Moviegenres in our database; the bigger they are, the more we got!</h4>
  <div class="cloudcontainer">
    <div class="cloud" AgWordCloud [wordData]="wordData" [options]="options" ></div>
  </div>
  `,
  styleUrls: ['./wordcloud.component.css'],
})
export class WordcloudComponent implements OnInit {
   wordData: AgWordCloudData[] = [];

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

  constructor(private wordcloud: WordcloudService) {

  }

  ngOnInit(): void {
      this.constructWordcloud().then(data => this.wordData = data);
  }

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
