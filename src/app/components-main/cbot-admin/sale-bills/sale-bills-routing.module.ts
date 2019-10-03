import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleBillsComponent } from './sale-bills.component';


const routes: Routes = [
  {
    path:'',
    component: SaleBillsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleBillsRoutingModule { }
