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

  editEntity = {
    id: 0,
    show: false
  }

  ngOnInit(): void {
    this.expenses = this.expenseService.expensesList;
  }

  remove(idExpense: string, ind: number, title: string){

    if (confirm("Are you sure to delete "+title+" expense?")) {
      this.expenseService.deleteExpense(idExpense, ind);
    }
    
  }

  update(idExpense: string, ind: number, title: string, category: string, price: string){
    console.log(`Editing expense with id: ${idExpense} [${ind} in array] with ${title} ${category} ${price}`);

    const tmpObj: Expense = {
      id: idExpense,
      category,
      title,
      price: Number.parseFloat(price)
    }
    
    this.expenseService.updateExpense(tmpObj, ind);

    this.toggleEdit(-1);

  }

  toggleEdit(ind: number){

    if(this.editEntity.show){
      if(this.editEntity.id == ind){
        this.editEntity.show = false;
      }else{
        this.editEntity.id = ind;
      }
    }else{
      this.editEntity.id = ind;
      this.editEntity.show = true;
    }


  }


}
