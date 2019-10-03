import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseCreateRoutingModule } from './expense-create-routing.module';
import { SharedModule } from '../../module/module.module';
import { ExpenseCreateComponent } from './expense-create.component';


@NgModule({
  declarations: [ExpenseCreateComponent],
  imports: [
    CommonModule,
    ExpenseCreateRoutingModule,
    SharedModule
  ],
  exports: [
    ExpenseCreateComponent
  ]
})
export class ExpenseCreateModule { }
