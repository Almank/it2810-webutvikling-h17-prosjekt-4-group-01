
import {  MovieList, Component, OnInit, ViewChild, MatDialog, DataSource, MatPaginator, BehaviorSubject,
          Observable, HttpClient, MovieDetailsComponent, MatGridListModule } from '../import-module';
import { MovieListService } from './movie-list.service';
import { MovieListComponent } from './movie-list.component';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent implements OnInit {

  movies: MovieList[] = [
      {title: 'Mr. Nice' },
      {title: 'Narco' },
      {title: 'Narco' },
      {title: 'Narco' },
      {title: 'Narco' },
      {title: 'Narco' },
      {title: 'Narco' },
    ];
    ngOnInit() {

    }
}
