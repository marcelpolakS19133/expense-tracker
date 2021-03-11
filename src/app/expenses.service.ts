import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Observer } from 'rxjs';
import { Expense } from '../app/models/expense';
import { Account } from '../app/models/account';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private expensesUrl = 'https://expense-backend.azurewebsites.net/accounts/6043f43843124e952d95073d?withExpenses=True'

  expenses: Expense[] = [];
  expenseSubject = new BehaviorSubject<Expense[]>([]);

  constructor(private http: HttpClient) {
    this.getAccount().subscribe((acc) => {
      this.expenses = acc.expenses;
      this.update();
    })
   }

   getAccount(): Observable<Account> { 
      return this.http.get<Account>(this.expensesUrl);
   }

  subscribe(observer: Observer<Expense[]>) {
    this.expenseSubject.subscribe(observer);
  }

  update() {
    this.expenseSubject.next(this.expenses);
  }

}
