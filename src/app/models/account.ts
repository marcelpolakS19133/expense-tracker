import { Expense } from '../models/expense';

export interface Account {
    id: string,
    name: string,
    expenses: Expense[]
}