import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Expense} from './models/expense';
import {Account} from './models/account';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
  };

  // private expensesUrl = 'https://expense-backend.azurewebsites.net/accounts/604e9b87b41645081337c91f/';
  private expensesUrl = 'http://localhost:32009/accounts/604e9b87b41645081337c91f/';
  expenses: Expense[] = [];
  expenseSubject = new BehaviorSubject<Expense[]>(this.expenses);

  constructor(private http: HttpClient) {
    this.getCSRF().subscribe((eee) => {
      this.getAccount().subscribe((acc) => {
        this.expenses = acc.expenses;
        this.emitChanges();
      });
    });
  }

  get expensesList(): Observable<Expense[]> {
    return this.expenseSubject.asObservable();
  }

  getCSRF(): Observable<string> {
    return this.http.get<string>('http://localhost:32009/api/FBAuth/step2', this.httpOptions);
  }

  getAccount(): Observable<Account> {
    return this.http.get<Account>(this.expensesUrl + '?withExpenses=true', this.httpOptions);
  }

  addExpense(expense: Expense): void {
    if (!expense.title || !expense.price) {
      return;
    }


    this.http.post<Expense>(this.expensesUrl + 'expenses', expense, this.httpOptions)
      .subscribe((exp) => {
        this.expenses.unshift(exp);
        this.emitChanges();
      });
  }

  deleteExpense(idExpense: string, idArray: number): void {
    this.http.delete<Expense>(this.expensesUrl + 'expenses/' + idExpense, this.httpOptions)
      .subscribe(() => {
        this.expenses.splice(idArray, 1);
        this.emitChanges();
      });
  }

  updateExpense(expense: Expense, idArray: number): void {

    console.log(expense);


    this.http.put<Expense>(this.expensesUrl + 'expenses/' + expense.id, expense, this.httpOptions)
      .subscribe(() => {
        this.expenses[idArray] = expense;
        this.emitChanges();
      });
  }

  emitChanges(): void {
    this.expenseSubject.next(this.expenses);
  }

}
