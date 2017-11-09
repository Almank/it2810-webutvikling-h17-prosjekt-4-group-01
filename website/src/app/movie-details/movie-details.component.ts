import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Favorite} from '../profile/profile.favorite.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<MovieDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fav: Favorite) {
  }

  ngOnInit() {
  }

  toggleFavorite(id) {
    this.fav.favorite(id);
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}
