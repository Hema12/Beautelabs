import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankCashRegisterComponent } from './bank-cash-register.component';


const routes: Routes = [
  {
    path:'',
    component: BankCashRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankCashRegisterRoutingModule { }
