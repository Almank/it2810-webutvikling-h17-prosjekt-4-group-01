import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatDialogModule, MatCardModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSidenavModule, MatTableModule, MatToolbarModule, MatTooltipModule,} from '@angular/material';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import {CdkTableModule} from '@angular/cdk/table';
import { MovieListComponent } from './movie-list/movie-list.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const appRoutes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: MovieListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    HeaderComponent,
    ProfileComponent,
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
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

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
