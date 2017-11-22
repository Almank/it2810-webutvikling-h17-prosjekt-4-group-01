import {Component} from '../../import-module';
/** Importing these separately as the site crashes if they are barreled */
import {Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Favorite} from '../../profile/profile.favorite.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  toggled = false;
  buttonClicked = false;

  constructor(public thisDialogRef: MatDialogRef<MovieDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fav: Favorite) {
  }

  // Toggle favorite
  toggleFavorite(id, favorited) {
    this.fav.favorite(id);
    if (!this.buttonClicked) {
      this.toggled = favorited;
    }
    this.toggled = !this.toggled;
    this.buttonClicked = true;
  }

  // Close modal
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  // Get functions to check favorite status
  get yellow() {
    return this.toggled;
  }
}
