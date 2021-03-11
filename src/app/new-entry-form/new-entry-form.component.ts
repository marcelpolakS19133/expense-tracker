import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../expenses.service';
import { Expense } from '../models/expense';
import { Account } from '../models/account';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-new-entry-form',
  templateUrl: './new-entry-form.component.html',
  styleUrls: ['./new-entry-form.component.css']
})
export class NewEntryFormComponent implements OnInit {

  constructor(private expenseService: ExpensesService) { }

  add(title: string, price: string, deposit: boolean){
    var priceNum = Number(price);
    
    if(!deposit){
      priceNum=priceNum*-1;
    }
    const expense: Expense = {
      id: '',
      title: title,
      price: priceNum,
      category: 'hardcoded'
    }
    this.expenseService.addExpense(expense);
  }

  ngOnInit(): void {
  }

}
