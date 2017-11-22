import {Injectable, HttpClient, HttpHeaders} from '../import-module';
import 'rxjs/add/operator/toPromise';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) {
  }

  // The AuthService onRegister sends the register http request to the api.
  onRegister(form) {
    const params = JSON.stringify({
      username: form.value.username,
      password: form.value.password,
    });
    return this.http.post('/api/register', params, {headers: this.headers})
      .toPromise()
      .then(data => {
        console.log('REGISTER: ', data);
        return data;
      });
  }

  // The AuthService onLogin sends the login http request to the api.
  onLogin(form) {
    const params = JSON.stringify({
      username: form.value.username,
      password: form.value.password,
    });
    return this.http.post('/api/login', params, {headers: this.headers})
      .toPromise()
      .then(data => {
        return data;
      });
  }
}
