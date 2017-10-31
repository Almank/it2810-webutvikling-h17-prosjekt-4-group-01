import {OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {isObject} from "util";
import {MovieData} from "../app.component";
import { MoviesComponent } from "./movies.component";


export class MovieDb implements OnInit
{

  movieList: object;

  constructor(private http: HttpClient) {console.log("HEEY")}

  ngOnInit(): void {
    this.http.get('/api/movies/asc').subscribe(data => {
      // Read the result field from the JSON response.
      if (isObject(data)) {
        const movieData = ((<MovieData> data));
        this.movieList = movieData;
        // Prints the first movie title.
        console.log(movieData[0].title);
      }
    });


  }
  list(){
    return this.movieList;
  }
}
