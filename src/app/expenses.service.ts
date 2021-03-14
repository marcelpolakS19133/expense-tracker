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

  private expensesUrl = 'https://expense-backend.azurewebsites.net/accounts/6043f43843124e952d95073d/'

  expenses: Expense[] = [];
  expenseSubject = new BehaviorSubject<Expense[]>(this.expenses);

  constructor(private http: HttpClient) {
    this.getAccount().subscribe((acc) => {
      this.expenses = acc.expenses;
      this.emitChanges();
    })
   }

   get expensesList(){
     return this.expenseSubject.asObservable();
   }

   getAccount(): Observable<Account> { 
     return this.http.get<Account>(this.expensesUrl +'?withExpenses=True');
   }

   addExpense(expense: Expense) : void {
     if(!expense.title || !expense.price){
       return;
     }


     this.http.post<Expense>(this.expensesUrl+'expenses', expense, this.httpOptions).subscribe((exp) => {       
       this.expenses.unshift(exp);
       this.emitChanges();
     })
   } 

   deleteExpense(idExpense: string, idArray: number) : void {
     this.http.delete<Expense>(this.expensesUrl + 'expenses/' + idExpense, this.httpOptions).subscribe((exp) => {

      this.expenses.splice(idArray, 1);
       this.emitChanges();
     })
   }

  updateExpense(expense: Expense, idArray: number) {

    this.http.put<Expense>(this.expensesUrl + 'expenses/' + expense.id, expense, this.httpOptions).subscribe((exp) => {
      this.expenses[idArray] = expense;
      this.emitChanges();
    })
  }

  emitChanges() {
    this.expenseSubject.next(this.expenses);
  }

}
