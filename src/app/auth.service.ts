import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Credentials} from './models/credentials';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private expensesUrl = 'https://expense-backend.azurewebsites.net/auth/';

  private expensesUrl = 'http://localhost:32009/auth/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
  };

  constructor(private httpClient: HttpClient,
              private cookies: CookieService) {
  }

  register(creds: Credentials): void {
    this.httpClient.post(this.expensesUrl + 'register/', creds, this.httpOptions).subscribe(() => this.login(creds));
  }

  login(creds: Credentials): void {
    this.httpClient.post(this.expensesUrl + 'login/', creds, this.httpOptions).subscribe(resp => console.log(resp));
  }

  logout(): void {
    this.httpClient.post(this.expensesUrl + 'logout/', {}, this.httpOptions).subscribe(resp => console.log(resp));
  }

  isLoggedIn(): boolean {
    return this.cookies.check('currentUser');
  }

  getCurrentUser(): string {
    return this.cookies.get('currentUser');
  }
}
