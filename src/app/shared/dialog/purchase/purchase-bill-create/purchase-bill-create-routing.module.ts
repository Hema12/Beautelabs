import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseBillCreateComponent } from './purchase-bill-create.component';


const routes: Routes = [
  {
    path:'',
    component: PurchaseBillCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseBillCreateRoutingModule { }
