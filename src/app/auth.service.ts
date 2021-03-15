import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Credentials} from './models/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private expensesUrl = 'https://expense-backend.azurewebsites.net/auth/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  register(creds: Credentials): void {
    this.httpClient.post(this.expensesUrl + 'register/', creds, this.httpOptions).subscribe(resp => console.log(resp));
  }

  login(creds: Credentials): void {
    this.httpClient.post(this.expensesUrl + 'login/', creds, this.httpOptions).subscribe(resp => console.log(resp));
  }

  logout(): void {
    this.httpClient.post(this.expensesUrl + 'logout/', {}, this.httpOptions).subscribe(resp => console.log(resp));
  }
}
