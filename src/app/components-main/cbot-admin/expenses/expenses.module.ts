import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { SharedModule } from 'src/app/shared/module/module.module';
import { ExpenseCreateModule } from 'src/app/shared/dialog/expense-create/expense-create.module';


@NgModule({
  declarations: [ExpensesComponent],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    SharedModule,
    ExpenseCreateModule
  ],
  exports: [
    ExpensesComponent
  ]
})
export class ExpensesModule { }
