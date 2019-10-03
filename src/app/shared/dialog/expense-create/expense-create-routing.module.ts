import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseCreateComponent } from './expense-create.component';


const routes: Routes = [
  {
    path:'',
    component: ExpenseCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseCreateRoutingModule { }
