import { Expense } from './expense';

export interface Account {
    id: string;
    name: string;
    expenses: Expense[];
}
