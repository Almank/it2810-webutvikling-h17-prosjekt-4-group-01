import { WordcloudComponent } from './movie-view/wordcloud/wordcloud.component';
import {AgWordCloudModule, AgWordCloudData} from 'angular4-word-cloud';
import {BrowserModule, NgModule, BrowserAnimationsModule, HttpClientModule, MatButtonModule, MatDialogModule,
  MatIconModule, MatInputModule, MatPaginatorModule, MatSidenavModule, MatTableModule, MatToolbarModule,
  MatTooltipModule, MatCardModule, MatTabsModule, MatFormFieldModule, MatSnackBarModule, MatGridListModule,
  MatSelectModule, FormsModule, AppComponent, CdkTableModule, MovieListComponent, HeaderComponent, ProfileComponent,
  AuthComponent, MovieListService, Favorite, MovieDetailsComponent, RouterModule, Routes, MovieDetailsService,
  ProfileService, AuthenticationService } from './import-module';

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
