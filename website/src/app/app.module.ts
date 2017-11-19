import {BrowserModule, NgModule, BrowserAnimationsModule, HttpClientModule, MatButtonModule, MatDialogModule, 
  MatIconModule, MatInputModule, MatPaginatorModule, MatSidenavModule, MatTableModule, MatToolbarModule, 
  MatTooltipModule, MatCardModule, MatTabsModule, MatFormFieldModule, MatSnackBarModule, MatGridListModule, 
  MatSelectModule, FormsModule, AppComponent, CdkTableModule, MovieListComponent, HeaderComponent, ProfileComponent, 
  AuthComponent, MovieListService, Favorite, MovieDetailsComponent, RouterModule, Routes, MovieDetailsService, 
  ProfileService, AuthenticationService } from './import-module';

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

  providers: [
    MovieListService,
    Favorite,
    MovieDetailsService,
    ProfileService,
    AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
