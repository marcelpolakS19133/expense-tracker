import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../expenses.service';
import { Expense } from '../models/expense';
import { Account } from '../models/account';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-entry-form',
  templateUrl: './new-entry-form.component.html',
  styleUrls: ['./new-entry-form.component.css']
})
export class NewEntryFormComponent implements OnInit {

  constructor(private expenseService: ExpensesService, private formBuilder: FormBuilder) { }

  expenseForm: FormGroup = this.formBuilder.group({
    price: '',
    title: '',
    deposit: false,
    category: ''
  });

  onSubmit(): void {
    var tmpExpense = this.expenseForm.value;

    tmpExpense['price'] = Number.parseFloat(tmpExpense['price']);
    
    if (!tmpExpense['deposit']){
      tmpExpense['price'] = tmpExpense['price']*-1;
    }

    this.expenseService.addExpense(tmpExpense);

  }

  ngOnInit(): void {
  }

}
