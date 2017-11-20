import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule,
MatSidenavModule, MatTableModule, MatToolbarModule, MatTooltipModule, MatCardModule, MatTabsModule,
MatFormFieldModule, MatSnackBarModule, MatGridListModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {CdkTableModule} from '@angular/cdk/table';
import { MovieListComponent } from './movie-view/movie-list/movie-list.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { MovieListService } from './movie-view/movie-view.service';
import { Favorite } from './profile/profile.favorite.service';
import { WordcloudComponent } from './movie-view/wordcloud/wordcloud.component';
import {AgWordCloudModule, AgWordCloudData} from 'angular4-word-cloud';

import { MovieDetailsComponent, RouterModule, Routes } from './import-module';
import {MovieDetailsService} from './movie-view/movie-details/movie-details.service';
import {ProfileService} from './profile/profile.service';
import {AuthenticationService} from './auth/auth.service';
import { WordcloudService} from './movie-view/wordcloud/wordcloud.service';
const appRoutes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: AuthComponent},
  { path: 'list', component: MovieListComponent },
  { path: 'wordcloud', component: WordcloudComponent },
  { path: '**', component: MovieListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    HeaderComponent,
    ProfileComponent,
    AuthComponent,
    MovieDetailsComponent,
    WordcloudComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSelectModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    AgWordCloudModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
    ),
  ],
  entryComponents: [
    MovieDetailsComponent,
  ],

  providers: [
    MovieListService,
    Favorite,
    MovieDetailsService,
    ProfileService,
    AuthenticationService,
    WordcloudService
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
