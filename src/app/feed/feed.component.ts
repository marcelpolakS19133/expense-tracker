import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../expenses.service';
import { Expense } from '../models/expense';
import { Account } from '../models/account';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private expenseService: ExpensesService) { }

  expenses = new Observable<Expense[]>();

  ngOnInit(): void {
    this.expenses = this.expenseService.expensesList;
  }


}
