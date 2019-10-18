import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingActivityComponent } from './billing-activity.component';


const routes: Routes = [
  {
    path:'',
    component: BillingActivityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingActivityRoutingModule { }
