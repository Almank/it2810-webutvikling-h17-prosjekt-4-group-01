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


import { MovieDetailsComponent, RouterModule, Routes } from './import-module';
const appRoutes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: AuthComponent},
  { path: 'list', component: MovieListComponent },
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
    RouterModule.forRoot(
      appRoutes,
    ),
  ],
  entryComponents: [
    MovieDetailsComponent,
  ],

  providers: [MovieListService, Favorite],
  bootstrap: [AppComponent]
})
export class AppModule {}
