import { Injectable, HttpClient, isObject, HttpParams } from '../../import-module';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WordcloudService {

    constructor(private http: HttpClient) {}
    //Gets wordcloud data from the API
    getWordcloud() {
      const params = new HttpParams();
      return this.http.get('/api/wordcloud', { params }).toPromise()
        .then(data => {
          if (isObject(data)) {
            return  (data);
          }});
    }
}
