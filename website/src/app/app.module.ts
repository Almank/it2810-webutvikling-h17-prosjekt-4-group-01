import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule,
MatSidenavModule, MatTableModule, MatToolbarModule, MatTooltipModule, MatCardModule, MatTabsModule,
MatFormFieldModule,
} from '@angular/material';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import {CdkTableModule} from '@angular/cdk/table';
import { MovieListComponent } from './movie-list/movie-list.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';

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
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
    ),
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
